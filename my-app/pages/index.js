import Head from 'next/head'
import { useContext } from 'react'
import { PolybaseContext } from '@/context/PolybaseProvider'

export default function Home() {
    const {login} = useContext(PolybaseContext)
  return (
    <>
      <Head>
        <title>Zapix</title>
        <meta name="description" content="Web3 Social App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
<link rel="manifest" href="/site.webmanifest"></link>
      </Head>
      <main className=' bg-white dark:bg-gray-900 min-h-screen p-8 '>
          


<section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We Secure your Social Data</h1>
        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Here at Zapix we focus on securing your data, storing it on decentralised nodes through IPFS, encryption and decrytion of data for privacy.</p>
        <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button onClick={login} href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Get started
                <svg aria-hidden="true" class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
            {/* <a href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Learn more
            </a>   */}
        </div>
    </div>

</section>







<section class="bg-white dark:bg-gray-900">
    <div class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
        <img class="w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg" alt="dashboard image"/>
        <img class="w-full hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg" alt="dashboard image"/>
        <div class="mt-4 md:mt-0">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Let's create your memories and share with piers .</h2>
            <p class="mb-6 text-gray-500 md:text-lg dark:text-gray-400">Zapix helps you connect with friends and communities of people who share memories. Connecting with your friends and family as well as discovering new ones is easy with Zapix.</p>
            {/* <a href="#" class="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                Get started
                <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a> */}
        </div>
    </div>
    <div class="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
            <span class="font-semibold text-gray-400 uppercase">Powered With</span>
            <div class="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
                <a href="#" class="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                <svg width="62" height="46" viewBox="0 0 62 46" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M61.8399 20.7629V10.204H50.9056V5.68713L50.9467 0H40.3174V34.5451C40.3174 35.9335 40.5912 37.3082 41.1231 38.5906C41.655 39.873 42.4346 41.0379 43.4173 42.0187C44.3999 42.9994 45.5663 43.7768 46.8498 44.3062C48.1332 44.8356 49.5085 45.1067 50.8968 45.104L61.8399 45.0864V34.7006H53.6421C53.2792 34.701 52.9197 34.6298 52.5843 34.4911C52.2489 34.3523 51.9442 34.1488 51.6876 33.8922C51.4309 33.6356 51.2274 33.3308 51.0887 32.9955C50.95 32.6601 50.8788 32.3006 50.8792 31.9377V27.8315H50.9085C50.9085 25.485 50.9085 23.1386 50.9085 20.7541L61.8399 20.7629Z" fill="currentColor"></path><path d="M28.3854 10.204H36.6858V0H26.127V45.1246H36.6858V18.5713C36.6858 17.5327 36.2171 16.5496 35.4101 15.8958L28.3854 10.204Z" fill="currentColor"></path><path d="M10.5589 31.9377V0H0V34.5451C-2.62455e-06 35.9335 0.273789 37.3082 0.805706 38.5906C1.33762 39.873 2.11722 41.0379 3.09988 42.0187C4.08254 42.9994 5.24896 43.7768 6.5324 44.3062C7.81583 44.8356 9.19107 45.1067 10.5794 45.104L22.4728 45.0864V34.7006H13.3218C12.589 34.7006 11.8863 34.4095 11.3681 33.8914C10.85 33.3732 10.5589 32.6705 10.5589 31.9377Z" fill="currentColor"></path></svg>  
                </a>
                <a href="#" class="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                    <svg fill="none" height="44px" viewBox="0 0 74 111"><clipPath id="a"><path d="m.461121.525742h72.7021v110.155h-72.7021z"></path></clipPath><g clip-path="url(#a)"><path d="m72.3068 83.6744-13.8199-8.0117c-.078-.0162-.1582-.0162-.2361 0l-11.3099-6.5715 10.8964-6.3314h.2657l13.7905-8.0119c.2728-.136.4996-.3511.6521-.6182.1524-.267.2235-.5741.2042-.8822v-15.8735c-.0041-.3037-.0851-.6013-.2351-.864-.1499-.2628-.3638-.4819-.6212-.6363l-6.9985-3.9909 6.9689-4.0509.3839-.2701c.3003-.3376.4683-.7752.4724-1.2302v-15.8737c-.0041-.3037-.085-.60114-.235-.86389-.15-.26276-.3639-.48201-.6213-.63644l-13.8199-7.92163c-.2593-.13927-.5483-.212087-.8416-.212087-.2934 0-.5822.072817-.8416.212087l-55.04335 31.62706c-.25568.1463-.467575.3603-.613161.6192-.145585.2589-.219507.5529-.213758.8511v15.9335c.000323.3005.080083.5954.2307.854.150618.2586.366699.4714.625779.6163l6.96896 4.021-6.99852 4.1109c-.25568.1463-.467575.3603-.613161.6192-.145585.2589-.219507.553-.213758.8511v15.9336c.000323.3005.080083.5954.2307.854.150618.2586.366699.4714.625779.6163l13.81989 7.9218.3839.2401h.2656l27.2856 15.8139c.078-.016.1582-.016.2361 0l13.4656 7.771c.2123.106.4433.167.6793.18h.2656c.2472-.024.4875-.095.7087-.21l13.7905-7.922c.2591-.144.4752-.357.6258-.616.1506-.258.2302-.553.2305-.854v-15.9334c-.0256-.2591-.1112-.5082-.2498-.7272-.1386-.2191-.3262-.4017-.5475-.533zm-15.6212-5.0411h.2363l11.0145 6.3914-10.3945 6.0014-12.9634-7.5017h-.2658l-11.2213-6.5114 10.3354-6.0013zm-52.53324-14.4032 10.04004 5.7312v12.0027l-10.04004-5.8213zm52.53324-31.7772h-.2363l-27.2854 15.7836h-.2656l-11.1919 6.4813v-12.0027l12.8749-7.4416 7.1168-4.1109 6.6146-3.8109.5019-.2699 13.1999-7.6517 10.8669-6.2715.3248-.2101v12.0027zm-39.8059-4.8611 40.4261-23.37516 10.3943 6.00136-1.3287.7802-9.6858 5.5211h-.1476l-12.6683 7.3217-1.0335.6001-6.1718 3.5709-7.3824 4.2909h-.1772l-12.9634 7.5317-10.3945-6.0013zm-12.99318 9.4522 10.45348 6.0014v12.0026l-10.45348-6.0013zm7.88438 20.4346 3.4255 1.9503c.1762.0851.3665.136.5611.15h.2657c.2359-.0134.467-.0746.6793-.18l13.4655-7.8017h.2657l27.2854-15.8136h.2658l3.396-1.9804 6.1716 3.5108-10.926 6.3313h-.2361l-7.855 4.5311-5.9059 3.3908-13.4656 7.8317h-.2656l-12.9636 7.5017-3.1597-1.8004-7.23483-4.1409zm32.7781 42.0094-26.8426-15.5735v-13.8931l12.6388-7.3217h.2361l27.2856-15.8136h.2656l11.2804-6.5414v12.0027l-12.7273 7.0515h-.2363l-27.433 15.9636c-.2557.1463-.4676.3603-.6131.6192-.1456.2589-.2196.553-.2138.8511-.0018.3014.0735.5983.2184.8613.145.263.3546.4831.6085.639h.2952l13.8199 7.9819h.2363l1.2698.7201 11.369 6.6016v12.0023l-11.1328-6.0911zm25.2774.63-10.4241 6.001v-12.0023l10.4241-6.0014z" fill="currentColor"></path></g></svg>                     
                </a>
                <a href="#" class="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                <svg width="93" height="32" viewBox="0 0 93 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M36.0093 20.7445C38.6142 20.7445 40.4494 19.3437 40.4494 17.0508C40.4494 14.5475 38.387 13.8995 36.4493 13.2907C34.5965 12.7307 34.1236 12.3307 34.1236 11.5755C34.1236 10.8755 34.7189 10.3498 35.7325 10.3498C36.9741 10.3498 37.6381 10.9979 38.0749 11.9259L40.103 10.7523C39.2814 9.03301 37.7397 8.00018 35.7293 8.00018C33.6316 8.00018 31.7084 9.33062 31.7084 11.6411C31.7084 13.9699 33.5268 14.7612 35.3973 15.3004C37.2157 15.8252 38.0373 16.1756 38.0373 17.086C38.0373 17.7684 37.5301 18.3812 36.0789 18.3812C34.5589 18.3812 33.7012 17.646 33.2644 16.5076L31.2012 17.7156C31.8652 19.5365 33.5092 20.7445 36.0093 20.7445Z" fill="white"/>
<path d="M46.1315 11.501C44.8515 11.501 43.9291 11.9738 43.2995 12.7811V11.7466H41.041V24.0005H43.2963V19.4668C43.9259 20.2717 44.8523 20.7469 46.1283 20.7469C48.4708 20.7469 50.394 18.7332 50.394 16.1252C50.394 13.5171 48.474 11.501 46.1315 11.501ZM45.7123 18.5916C44.3307 18.5916 43.2995 17.5932 43.2995 16.1228C43.2995 14.6523 44.3307 13.6547 45.7123 13.6547C47.1108 13.6547 48.142 14.6523 48.142 16.1228C48.142 17.5932 47.1108 18.5916 45.7123 18.5916Z" fill="white"/>
<path d="M55.9734 11.5011C54.8022 11.5011 53.8934 11.9387 53.3685 12.7267V8.24658H51.1133V20.4997H53.3685V15.7732C53.3685 14.2531 54.1902 13.6019 55.2886 13.6019C56.3022 13.6019 57.019 14.2147 57.019 15.4052V20.4997H59.2807V15.1252C59.2807 12.8003 57.8262 11.5011 55.9734 11.5011Z" fill="white"/>
<path d="M62.2351 17.0508H68.8256C68.8827 16.7447 68.9122 16.4341 68.9136 16.1228C68.9136 13.5499 67.0776 11.501 64.4903 11.501C61.7454 11.501 59.875 13.5147 59.875 16.1228C59.875 18.7308 61.7278 20.7445 64.6647 20.7445C66.3448 20.7445 67.6544 20.0621 68.476 18.8716L66.6584 17.8212C66.2736 18.3284 65.5743 18.6964 64.6999 18.6964C63.5111 18.6964 62.5495 18.206 62.2351 17.0508ZM62.1999 15.3003C62.4623 14.1803 63.2839 13.5323 64.4903 13.5323C65.4343 13.5323 66.3784 14.0395 66.6584 15.3003H62.1999Z" fill="white"/>
<path d="M71.8705 13.2523V11.7467H69.6152V20.4997H71.8705V16.3156C71.8705 14.4755 73.3569 13.9523 74.5282 14.0923V11.5715C73.4265 11.5715 72.3225 12.0619 71.8705 13.2523Z" fill="white"/>
<path d="M79.293 20.7445C81.8627 20.7445 83.926 18.7308 83.926 16.1228C83.926 13.5147 81.8627 11.501 79.293 11.501C76.7234 11.501 74.6777 13.5147 74.6777 16.1228C74.6777 18.7308 76.7226 20.7445 79.293 20.7445ZM79.293 18.5388C77.9642 18.5388 76.933 17.5412 76.933 16.1228C76.933 14.7043 77.9642 13.7067 79.293 13.7067C80.6387 13.7067 81.6707 14.7051 81.6707 16.1228C81.6707 17.5404 80.6427 18.5388 79.293 18.5388Z" fill="white"/>
<path d="M89.4976 11.501C88.3264 11.501 87.4176 11.9386 86.892 12.7267V11.7466H84.6367V20.4997H86.892V15.7731C86.892 14.2531 87.7144 13.6019 88.812 13.6019C89.8265 13.6019 90.5433 14.2147 90.5433 15.4051V20.4997H92.8017V15.1251C92.8017 12.8003 91.3505 11.501 89.4976 11.501Z" fill="white"/>
<path d="M20.4293 0.461612V6.62176C20.4292 6.78152 20.3879 6.93854 20.3094 7.07769C20.2309 7.21684 20.1179 7.33342 19.9813 7.41618L19.9429 7.43859L18.5029 8.26821L10.1203 13.0891L9.10263 13.6739C9.08542 13.6815 9.06906 13.6909 9.05383 13.7019C8.99046 13.7444 8.93854 13.8019 8.90263 13.8692C8.86673 13.9365 8.84795 14.0117 8.84795 14.088C8.84795 14.1642 8.86673 14.2394 8.90263 14.3067C8.93854 14.374 8.99046 14.4315 9.05383 14.474L9.09223 14.4964L10.2403 15.162L14.1604 17.418L14.23 17.4588C14.2913 17.5013 14.3415 17.558 14.3762 17.6241C14.4108 17.6903 14.4289 17.7638 14.4289 17.8384C14.4289 17.9131 14.4108 17.9866 14.3762 18.0527C14.3415 18.1189 14.2913 18.1756 14.23 18.2181L14.162 18.2565L6.99937 22.383L6.95937 22.4062C6.8238 22.4805 6.67159 22.5193 6.51696 22.519C6.37853 22.5185 6.24192 22.4873 6.11695 22.4278L6.07695 22.407L6.01615 22.371L1.86245 19.9829L0.487213 19.1917C0.474413 19.1853 0.461612 19.1773 0.448012 19.1693C0.315187 19.0882 0.205085 18.9748 0.128004 18.8397C0.0442891 18.6997 5.5594e-05 18.5396 8.19823e-07 18.3765V11.9483C-0.000209087 11.7908 0.0398927 11.6358 0.116491 11.4982C0.193089 11.3605 0.303635 11.2447 0.437612 11.1619C0.440683 11.159 0.444192 11.1565 0.448012 11.1547C0.463133 11.1451 0.478905 11.1365 0.495213 11.1291L0.501613 11.1243L1.86165 10.3419L6.45136 7.70179L11.9827 4.52011L19.7045 0.0800027C19.7166 0.071479 19.7295 0.063986 19.7429 0.0576021C19.8106 0.0198008 19.8869 -2.91412e-05 19.9645 6.89731e-07C20.0255 -0.000104461 20.086 0.0118142 20.1424 0.035076C20.1989 0.0583379 20.2502 0.0924875 20.2934 0.135575C20.3366 0.178662 20.371 0.229844 20.3944 0.286197C20.4179 0.342551 20.43 0.402972 20.4301 0.464012L20.4293 0.461612Z" fill="#01ABFF"/>
<path d="M26.8805 13.6243V20.0525C26.8803 20.212 26.839 20.3688 26.7605 20.5077C26.682 20.6466 26.569 20.7629 26.4325 20.8453L26.3933 20.8677L25.018 21.6597L23.2804 22.6598L20.4307 24.299L14.8978 27.4807L7.17759 31.9208C7.16525 31.929 7.15243 31.9365 7.13919 31.9432C7.07112 31.9808 6.99455 32.0004 6.91678 32C6.85574 32.0001 6.79528 31.9882 6.73885 31.9649C6.68241 31.9417 6.63111 31.9075 6.58788 31.8644C6.54464 31.8213 6.51032 31.7702 6.48686 31.7138C6.4634 31.6574 6.45128 31.597 6.45117 31.536V25.3758C6.45103 25.2162 6.49222 25.0593 6.57073 24.9204C6.64924 24.7815 6.7624 24.6652 6.89918 24.583C6.91758 24.571 6.93758 24.5606 6.95598 24.551L8.38002 23.731L16.7602 18.9101L17.7643 18.3325L17.8291 18.2957L17.8355 18.2917C17.8969 18.249 17.9471 18.192 17.9818 18.1257C18.0165 18.0594 18.0346 17.9857 18.0347 17.9108C18.034 17.8348 18.015 17.76 17.9792 17.6928C17.9434 17.6257 17.8919 17.5682 17.8291 17.5252C17.8142 17.5154 17.7987 17.5065 17.7827 17.4988L16.6402 16.838L12.7201 14.5812L12.6449 14.5372C12.585 14.4946 12.5361 14.4382 12.5024 14.3729C12.4687 14.3076 12.4511 14.2351 12.4511 14.1616C12.4511 14.088 12.4687 14.0156 12.5024 13.9502C12.5361 13.8849 12.585 13.8285 12.6449 13.7859L12.7249 13.7411C12.7287 13.7385 12.7327 13.7364 12.7369 13.7347L19.8827 9.62264L19.9387 9.59064C20.0719 9.52103 20.22 9.48468 20.3703 9.48468C20.5206 9.48468 20.6687 9.52103 20.8019 9.59064L20.8627 9.62584L25.0276 12.0211L26.4029 12.8131C26.4162 12.8197 26.429 12.8272 26.4413 12.8355C26.5742 12.9161 26.6843 13.0293 26.7613 13.1643C26.8443 13.3048 26.8877 13.4652 26.8869 13.6283L26.8805 13.6243Z" fill="#0057FF"/>
</svg>
                     
</a> 
<a href="#" class="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
   <div className='font-bold text-4xl'>
    Polybase                                              
    </div>
</a> 
<a href="#" class="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
<div className='font-bold text-4xl'>
    Lighthouse                                             
    </div>                                           
</a>         
            </div>
        </div> 
</section>

<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
      <div class="max-w-screen-md mb-8 lg:mb-16">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Designed for Users like yours</h2>
          {/* <p class="text-gray-500 sm:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p> */}
      </div>
      <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div>
              <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                  <svg class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              </div>
              <h3 class="mb-2 text-xl font-bold dark:text-white">Marketing</h3>
              <p class="text-gray-500 dark:text-gray-400">Plan it, create it, launch it. Collaborate seamlessly with all  the organization and hit your marketing goals every month with our marketing plan.</p>
          </div>
          <div>
              <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                  <svg class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path></svg>
              </div>
              <h3 class="mb-2 text-xl font-bold dark:text-white">Legal</h3>
              <p class="text-gray-500 dark:text-gray-400">Protect your organization, devices and stay compliant with our structured workflows and custom permissions made for you.</p>
          </div>
          <div>
              <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                  <svg class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path></svg>                    
              </div>
              <h3 class="mb-2 text-xl font-bold dark:text-white">Business Automation</h3>
              <p class="text-gray-500 dark:text-gray-400">Auto-assign tasks, send Slack messages, and much more. Now power up with hundreds of new templates to help you get started.</p>
          </div>
          <div>
              <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                  <svg class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"></path></svg>
              </div>
              <h3 class="mb-2 text-xl font-bold dark:text-white">Finance</h3>
              <p class="text-gray-500 dark:text-gray-400">Audit-proof software built for critical financial operations like month-end close and quarterly budgeting.</p>
          </div>
          <div>
              <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                  <svg class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>
              </div>
              <h3 class="mb-2 text-xl font-bold dark:text-white">Enterprise Design</h3>
              <p class="text-gray-500 dark:text-gray-400">Craft beautiful, delightful experiences for both marketing and product with real cross-company collaboration.</p>
          </div>
          <div>
              <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                  <svg class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path></svg>
              </div>
              <h3 class="mb-2 text-xl font-bold dark:text-white">Operations</h3>
              <p class="text-gray-500 dark:text-gray-400">Keep your company’s lights on with customizable, iterative, and structured workflows built for all efficient teams and individual.</p>
          </div>
      </div>
  </div>
</section>

        
      </main>

    </>
  )
}
