import React, { useState, useEffect } from "react";
import {abi} from "../contract/abi"
import { Button } from "flowbite-react";

import { ethers } from "ethers";
import { Spinner } from "flowbite-react";
const CID = require("cids");

const contractAddress = "0x3bDA6449167558FC2E163dD3fAf40505F25A7b71";
const contractABI = abi;
let dealClient;
let cid;

const storageDeal = () => {
    const [commP, setCommP] = useState(
        ""
      );
      const [carLink, setCarLink] = useState(
        ""
      );
      const [errorMessageSubmit, setErrorMessageSubmit] = useState("");
      const [pieceSize, setPieceSize] = useState("");
      const [carSize, setCarSize] = useState("");
      const [txSubmitted, setTxSubmitted] = useState("");
      const [dealID, setDealID] = useState("");
      const [proposingDeal, setProposingDeal] = useState(false);
      const [network, setNetwork] = useState("");

      const handleChangeCommP = (event) => {
        setCommP(event.target.value);
      };
    
      const handleChangeCarLink = (event) => {
        // validate input data here
        setCarLink(event.target.value);
      };
    
      const handleChangePieceSize = (event) => {
        setPieceSize(event.target.value);
      };
    
      const handleChangeCarSize = (event) => {
        setCarSize(event.target.value);
      };


      const handleSubmit = async (event) => {
        // This will be handling deal proposal submission sometime in the future.
        event.preventDefault();
        // do something with the carLink value, like send it to a backend API
        console.log(commP);
        console.log(carLink);
        console.log(pieceSize);
        console.log(carSize);
    
        try {
          setErrorMessageSubmit(
            ""
          );
          cid = new CID(commP);
          const { ethereum } = window;
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = await provider.getSigner();
            dealClient = new ethers.Contract(
              contractAddress,
              contractABI,
              signer
            );
            const extraParamsV1 = [
              carLink,
              carSize,
              false, // taskArgs.skipIpniAnnounce,
              false, // taskArgs.removeUnsealedCopy
            ];
            const DealRequestStruct = [
              cid.bytes, //cidHex
              pieceSize, //taskArgs.pieceSize,
              false, //taskArgs.verifiedDeal,
              commP, //taskArgs.label,
              520000, // startEpoch
              1555200, // endEpoch
              0, // taskArgs.storagePricePerEpoch,
              0, // taskArgs.providerCollateral,
              0, // taskArgs.clientCollateral,
              1, //taskArgs.extraParamsVersion,
              extraParamsV1,
            ];
            // console.log(await provider.getBalance("0x42c930a33280a7218bc924732d67dd84d6247af4"));
            console.log(dealClient.interface);
            const transaction = await dealClient.makeDealProposal(
              DealRequestStruct
            );
            console.log("Proposing deal...");
            setProposingDeal(true);
            const receipt = await transaction.wait();
            console.log(receipt);
            setProposingDeal(false);
            setTxSubmitted("Transaction submitted! " + receipt.hash);
    
            dealClient.on("DealProposalCreate", (id, size, verified, price)=>{
              console.log(id, size, verified, price);
            })
    
            console.log("Deal proposed! CID: " + cid);
          } else {
            console.log("Ethereum object doesn't exist!");
          }
        } catch (error) {
          console.log(error);
          setErrorMessageSubmit(
            "Something went wrong. " + error.name + " " + error.message
          );
          return;
        }
      };
    
      const checkWalletIsConnected = async () => {
        const { ethereum } = window;
        if (!ethereum) {
          console.log("Make sure you have metamask!");
          return;
        } else {
          console.log("We have the ethereum object", ethereum);
        }
        const provider = new ethers.BrowserProvider(ethereum);
        const network = await provider.getNetwork();
        setNetwork(network.chainId);
        console.log(network.chainId);
    
        ethereum.request({ method: "eth_accounts" }).then((accounts) => {
          if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an account:", account);
          } else {
            console.log("No account found");
          }
        });
      };
    
      const connectWalletHandler = () => {
        const { ethereum } = window;
        if (!ethereum) {
          alert("Get MetaMask!");
          return;
        }
        ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            console.log("Connected", accounts[0]);
          })
          .catch((err) => console.log(err));
      };
    
      const connectWalletButton = () => {
        return (
          <div style={{ display: "flex" }}> <div class="child-1-cw"> 
          <Button
            onClick={connectWalletHandler}
            className="cta-button connect-wallet-button"
          >
            Connect Wallet
          </Button>
          { 1 && <div style={{ color: "green" }}> Connected </div>}
          { network && <div style={{ color: "green" }}> Network: Hyperspace </div>}
          </div></div>
        );
      };
    
      const dealIDButton = () => {
        return (
          <Button
            onClick={dealIDHandler}
          >
            Get deal ID
          </Button>
        );
      };
    
      const dealIDHandler = async () => {
        setDealID("Waiting for acceptance by SP...");
        cid = new CID(commP);
        var refresh = setInterval(async () => {
            console.log(cid.bytes);
            if (cid === undefined) {
              setDealID("Error: CID not found");
              clearInterval(refresh);
            }
            console.log("Checking for deal ID...");
            const dealID = await dealClient.pieceDeals(cid.bytes);
            console.log(dealID);
            if (dealID !== undefined && dealID !== "0") {
              // If your deal has already been submitted, you can get the deal ID by going to https://hyperspace.filfox.info/en/deal/<dealID>
              // The link will show up in the frontend: once a deal has been submitted, its deal ID stays constant. It will always have the same deal ID.
              setDealID("https://hyperspace.filfox.info/en/deal/" + dealID);
              clearInterval(refresh);
            }
          }, 5000
        );
      };
    
      useEffect(() => {
        // checkWalletIsConnected();
      }, []);


  return (
    <div className="p-8 bg-white dark:bg-gray-900">
            {/* <div id="container"> 
      <div style={{ display: "flex" }}> <div class="child-1-cw"> 
        {connectWalletButton()}
      </div></div>

      <form class="child-1"  onSubmit={handleSubmit}>

        <div class='child-1-hg'>

        <label>
          Link to CAR file
        </label>


        <div>
          <div class="tooltip"
            data-tooltip-id="carfile-tooltip"
            data-tooltip-delay-hide={50}
            data-tooltip-html=" Find a URL to your car file by going to data.fvm.dev and uploading your file (site in development). <br /> You can also go to tech-greedy/generate-car and upload the resulting car file to web3.storage."
          >
            <AiOutlineQuestionCircle />
          </div>
          <Tooltip id="carfile-tooltip" />
        </div>


        </div>


          <input class="input-elem"
            type="text"
            value={carLink}
            onChange={handleChangeCarLink}
          />
        
        <br />
        <br />

        <div class='child-1-hg'>

        <label> commP </label>

            <div
              class="tooltip"
              data-tooltip-id="commp-tooltip"
              data-tooltip-delay-hide={50}
              data-tooltip-html="This is also known as the Piece CID. <br /> You can go to data.fvm.dev and get this by uploading your file (site in development). <br />This also can be accessed as the output of tech-greedy/generate-car."
            >
              <AiOutlineQuestionCircle />
            </div>
            <Tooltip id="commp-tooltip" />

        </div>

          <input class="input-elem"
            type="text"
            value={commP}
            onChange={handleChangeCommP}
          />


        <br />
        <br />

        <div class='child-1-hg'>

        <label>
          Piece Size:
        </label>

        <div
          class="tooltip"
          data-tooltip-id="piecesize-tooltip"
          data-tooltip-delay-hide={50}
          data-tooltip-html="This is the number of bytes of your Piece (you can read more about Filecoin Pieces in the spec). <br /> You can go to data.fvm.dev and get this by uploading your file (site in development).<br /> This also can be accessed as the output of tech-greedy/generate-car."
        >
          <AiOutlineQuestionCircle />
        </div>
        <Tooltip id="piecesize-tooltip" />


        </div>

          <input class="input-elem"
            type="text"
            value={pieceSize}
            onChange={handleChangePieceSize}
          />
        <br />
        <br />

        <div class='child-1-hg'>

        <label>
          Car Size:
        </label>

        <div
          class="tooltip"
          data-tooltip-id="carsize-tooltip"
          data-tooltip-delay-hide={50}
          data-tooltip-html="This is the size of the CAR file in bytes. <br /> You can go to data.fvm.dev and get this by uploading your file (site in development). <br /> This can be accessed as the output of tech-greedy/generate-car."
        >
          <AiOutlineQuestionCircle />
        </div>
        <Tooltip id="carsize-tooltip" />


        </div>

          <input class="input-elem" type="text" value={carSize} onChange={handleChangeCarSize} />
        <br />
        <br />
        <button
          type="submit"
          style={{ display: "block", width: "50%", margin: "auto" }}
        >
          Submit
        </button>

        <div style={{ color: "red" }}> {errorMessageSubmit} </div>
        { proposingDeal && <Spinner>
          <span className="visually-hidden">Loading...</span>
        </Spinner>}
        <div style={{ color: "green" }}> {txSubmitted} </div>
      </form>

      <br />
      <br />
      <div class="child-1-hg"> 
        <div style={{ display: "flex", width: "50%", margin: "auto" }}> 
          {dealIDButton()}
        </div>
      </div>
      {dealID && <div style={{ color: "green", margin:"auto" }}> Deal: {dealID}  </div>}

    </div> */}

<div className="lg:w-1/2 sm:w-full mx-auto my-8">
    {connectWalletButton()}

    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Enter Piece ID</label>
<input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type='text' value={commP}
            onChange={handleChangeCommP}/>

<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Enter CAR Link</label>
<input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type='text'value={carLink}
            onChange={handleChangeCarLink}/>

<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Enter CAR size</label>
<input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type='text'value={carSize} onChange={handleChangeCarSize} />

<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Enter Piece size</label>
<input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type='text' value={pieceSize}
            onChange={handleChangePieceSize}
          />
<Button className="m-4" onClick={handleSubmit}>
    Submit
</Button>

        
<div style={{ color: "red" }}> {errorMessageSubmit} </div>
        { proposingDeal && <Spinner>
          <span className="visually-hidden">Loading...</span>
        </Spinner>}
        <div style={{ color: "green" }}> {txSubmitted} </div>
    

      <br />
      <br />
      <div class="child-1-hg"> 
        <div style={{ display: "flex", width: "50%", margin: "auto" }}> 
          {dealIDButton()}
        </div>
      </div>
      {dealID && <div style={{ color: "green", margin:"auto" }}> Deal: {dealID}  </div>}
</div>


    </div>
  )
}

export default storageDeal




