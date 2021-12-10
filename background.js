
const defaultFilters = [
  "https://animepahe.ru/",
  "*://*.doubleclick.net/*",
  "*://partner.googleadservices.com/*",
  "*://*.googlesyndication.com/*",
  "*://*.google-analytics.com/*",
  "*://creative.ak.fbcdn.net/*",
  "*://*.adbrite.com/*",
  "*://*.exponential.com/*",
  "*://*.quantserve.com/*",
  "*://*.scorecardresearch.com/*",
  "*://*.zedo.com/*",
  "*://*.drippledossers.casa/*",
  "*://*.zantbowsing.cam/*",
  "*://*.adskeeper.com/*",
];

function convertUrlIntoStandard(url){
  if(!url)
  return url;
  let x = "";
  let count = 3;
  for(let i=0;i<url.length;i++){
    if(url[i]=='/')
    count--;
    if(count==0)
    break;
    x+=url[i];
  }
  return x;
}


function updateAdcount(){
  chrome.storage.sync.get('adCount',function({adCount}){
    console.log(adCount)
    chrome.storage.sync.set({'adCount':adCount+1},function(){
      console.log(adCount);
      return;
    })
  })
}


function blockRequestForCurrnetInitiator(initiator){
  console.log(initiator);
if(whiteListArray.includes(initiator))
return false;
else
return true;
}

function updateWhiteListArray(whiteListArray){
  chrome.storage.sync.set({"whiteListArray":whiteListArray},function(){
    console.log("Succesfully Updated Whitelist:",whiteListArray);
  })
}


// initialzing background.js
function init(){
  
  this.whiteListArray = ["https://animepahe.com","https://www.quora.com"];
  chrome.storage.sync.set({"whiteListArray":this.whiteListArray},function(){
    console.log("WhiteList array initialized and set into storage",whiteListArray);
  })



}


// blocking function: whther to block or not depending on whitelist and filter list
function blockingFn(details){
  
  let initiator = convertUrlIntoStandard(details.initiator);//details.initiator;
  let blockRequest = blockRequestForCurrnetInitiator(initiator);
  if(blockRequest){
    updateAdcount();
    console.log("gonna block")
    return {cancel:true}
  }
  else{
    console.log("not gonna block");
    return {cancel:false}
  }
}

init();


// Blocking request if url matches given filters
chrome.webRequest.onBeforeRequest.addListener(
  blockingFn ,
  { urls: defaultFilters },
  ["blocking"]
)



// changing badge text 
chrome.storage.onChanged.addListener(function (changes, storageName) {
  chrome.browserAction.setBadgeText({
    text: changes.adCount.newValue.toString(),
  });
});




//==============================================
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
  switch(request.todo){
  case "addToWhiteList":{
    let url = convertUrlIntoStandard(request.url);
    whiteListArray.push(url);
    updateWhiteListArray(whiteListArray);
    break;}
  case "removeFromWhiteList":{
    let url = convertUrlIntoStandard(request.url);
    whiteListArray = whiteListArray.filter(ele=>ele!=url);
    updateWhiteListArray(whiteListArray);
    break;}
  default:
    console.log("I'm doing nothing");
    break;
}
  
})
//========================================================

  