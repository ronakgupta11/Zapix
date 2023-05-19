import React,{useState,createContext,useCallback,useEffect} from "react";
import { LitNodeClient } from '@lit-protocol/lit-node-client';
import { ethers } from 'ethers';
import {
    getLoginUrl,
    isSignInRedirect,
    handleSignInRedirect,
  } from '@/utils/auth';
  import {
    fetchPKPs,
    mintPKP,
    pollRequestUntilTerminalState,
  } from '@/utils/relay';
  import { useRouter } from 'next/router';
  const REDIRECT_URI = "https://fvm-dataverse-hack.vercel.app/"
export const AuthContext = createContext()

export const AuthProvider=({children})=>{
    const router = useRouter();


    const [googleIdToken, setGoogleIdToken] = useState();
    const [pkps, setPKPs] = useState([]);
    const [litNodeClient, setLitNodeClient] = useState(null);
    const [currentPKP, setCurrentPKP] = useState();
    const [sessionSigs, setSessionSigs] = useState(null);
    const[loginInProcess,setLoginInProcess] = useState(false);



    useEffect(() => {
        /**
         * Initialize LitNodeClient
         */
        async function initLitNodeClient() {
          try {
            // Set up LitNodeClient
            const litNodeClient = new LitNodeClient({
              litNetwork: 'serrano',
              debug: false,
            });
    
            // Connect to Lit nodes
            await litNodeClient.connect();
    
            // Set LitNodeClient
            console.log(litNodeClient)
            setLitNodeClient(litNodeClient);
          } catch (err) {
            // setError(err);
            console.log(err)
            // setView(Views.ERROR);
          }
        }
    
        if (!litNodeClient) {
           initLitNodeClient();
        }
      }, [litNodeClient]);

      const handleRedirect = useCallback(async () => {
        // setView(Views.HANDLE_REDIRECT);
        try {
          setLoginInProcess(true)
          // Get Google ID token from redirect callback
          const googleIdToken = handleSignInRedirect(REDIRECT_URI);
          setGoogleIdToken(googleIdToken);
    
          // Fetch PKPs associated with Google account
        //   setView(Views.FETCHING);
          const pkps = await fetchGooglePKPs(googleIdToken);
          if (pkps.length > 0) {
            await createSession(pkps[0])
            setPKPs(pkps);
          }
          else{
            await mint()
          }
        //   setView(Views.FETCHED);

        } catch (err) {
          console.log(err)
  
        //   setView(Views.ERROR);
        }
    
        // Clear url params once we have the Google ID token
        // Be sure to use the redirect uri route
        router.replace('/', undefined, { shallow: true });
         setTimeout(()=>setLoginInProcess(false),3000)
        
      }, [router]);

      const isAuthenticated = ()=>{
        return !!sessionSigs
      }
    
    
    
      useEffect(() => {
        // Check if app has been redirected from Lit login server
        if (isSignInRedirect(REDIRECT_URI)) {
          handleRedirect();
        }
      }, [handleRedirect]);



      /**
 * Redirect user to the Google authorization page
 */
function signInWithGoogle() {
    // Get login url
    const loginUrl = getLoginUrl(REDIRECT_URI);
    // Redirect to login url
    window.location.assign(loginUrl);
  }
  
  /**
   * Fetch PKPs associated with the given Google account through the relay server
   *
   * @param {string} idToken - Google ID token
   *
   * @returns PKPs associated with Google account
   */
  async function fetchGooglePKPs(idToken) {
    // Fetch PKPs associated with Google OAuth
    const body = JSON.stringify({
      idToken: idToken,
    });
    const fetchRes = await fetchPKPs(body);
    const { pkps } = fetchRes;
    if (!pkps) {
      throw new Error('Unable to fetch PKPs through relay server');
    }
    return pkps;
  }
  
  /**
   * Mint a PKP for the given Google account through the relay server
   *
   * @param {string} idToken - Google ID token
   *
   * @returns newly minted PKP
   */
  async function mintGooglePKP(idToken) {
    // Mint a new PKP via relay server
    const body = JSON.stringify({
      idToken: idToken,
    });
    const mintRes = await mintPKP(body);
    const { requestId } = mintRes;
    if (!requestId) {
      throw new Error('Unable to mint PKP through relay server');
    }
  
    // Poll for status of minting PKP
    const pollRes = await pollRequestUntilTerminalState(requestId);
    if (
      !pollRes ||
      !pollRes.pkpTokenId ||
      !pollRes.pkpEthAddress ||
      !pollRes.pkpPublicKey
    ) {
      throw new Error('Missing poll response or new PKP from relay server');
    }
    const newPKP = {
      tokenId: pollRes.pkpTokenId,
      ethAddress: pollRes.pkpEthAddress,
      publicKey: pollRes.pkpPublicKey,
    };
    return newPKP;
  }



     /**
   * Generate session sigs for current PKP
   *
   * @param {Object} PKP - PKP object
   */
     async function createSession(pkp) {
        // setView(Views.CREATING_SESSION);
    
        try {
          // Connect to LitNodeClient if not already connected
          // 
            const litNodeClient = new LitNodeClient({
              litNetwork: 'serrano',
              debug: false,
            });
    
            // Connect to Lit nodes
            if (!litNodeClient.ready) {
            await litNodeClient.connect();}
            // await litNodeClient.connect();
          // }
    
          const authNeededCallback = async authCallbackParams => {
            let chainId = 1;
            try {
              const chainInfo = ALL_LIT_CHAINS[authCallbackParams.chain];
              chainId = chainInfo.chainId;
            } catch {
              // Do nothing
            }
    
            let response = await litNodeClient.signSessionKey({
              authMethods: [
                {
                  authMethodType: 6,
                  accessToken: googleIdToken,
                },
              ],
              pkpPublicKey: pkp.publicKey,
              expiration: authCallbackParams.expiration,
              resources: authCallbackParams.resources,
              chainId,
            });
    
            return response.authSig;
          };
    
          // Generate session sigs with the given session params
          const sessionSigs = await litNodeClient.getSessionSigs({
            chain: 'ethereum',
            resources: [`litAction://*`],
            authNeededCallback,
          });

          setCurrentPKP(pkp);
          setSessionSigs(sessionSigs);

        } catch (err) {
          // setError(err);
          console.log(err)
        //   setView(Views.ERROR);
        }
      }


       /**
   * Sign a message with current PKP
   */
  async function signMessage(message) {
    try {
      const toSign = ethers.utils.arrayify(ethers.utils.hashMessage(message));
      const litActionCode = `
        const go = async () => {
          // this requests a signature share from the Lit Node
          // the signature share will be automatically returned in the response from the node
          // and combined into a full signature by the LitJsSdk for you to use on the client
          // all the params (toSign, publicKey, sigName) are passed in from the LitJsSdk.executeJs() function
          const sigShare = await LitActions.signEcdsa({ toSign, publicKey, sigName });
        };
        go();
      `;
      // Sign message
      const results = await litNodeClient.executeJs({
        code: litActionCode,
        sessionSigs,
        jsParams: {
          toSign: toSign,
          publicKey: currentPKP.publicKey,
          sigName: 'sig1',
        },
      });
      // Get signature
      const result = results.signatures['sig1'];
      const signature = ethers.utils.joinSignature({
        r: '0x' + result.r,
        s: '0x' + result.s,
        v: result.recid,
      });
      
      // setSignature(signature);
      return(signature)


    } catch (err) {
      console.log(err);
    //   setView(Views.ERROR);
    }
  }


  /**
   * Mint a new PKP for the authorized Google account
   */
  async function mint() {
    // setView(Views.MINTING);

    try {
      // Mint new PKP
      const newPKP = await mintGooglePKP(googleIdToken);

      // Add new PKP to list of PKPs
      const morePKPs = pkps.push(newPKP);
      setPKPs(morePKPs);

    //   setView(Views.MINTED);
    //   setView(Views.CREATING_SESSION);

      // Get session sigs for new PKP
      await createSession(newPKP);
    } catch (err) {
      // setError(err);
      console.log(err)
    //   setView(Views.ERROR);
    }
  }



    

    return (
        <AuthContext.Provider
        value={{

            // googleIdToken,
            currentPKP,
            // sessionSigs,
            loginInProcess,
            signMessage,
            isAuthenticated,

            login: async()=>{
                try{
                  setLoginInProcess(true)
                    signInWithGoogle()
                    // await initLitNodeClient()
                    setLoginInProcess(false)
                    

                }catch(e){
                  setLoginInProcess(false)
                    console.log(e)
                }

            },
            logout:async()=>{
                try{
                    router.push("/")
                    setSessionSigs(null)
                    setCurrentPKP(null)
                    setPKPs([])
                    setGoogleIdToken(null)
                }catch(e){
                    console.log(e)
                }
            }
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}
