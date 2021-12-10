// callback into promise for getting adcount
var getAdCount = new Promise(function (resolve, reject) {
  chrome.storage.sync.get("adCount", function ({ adCount }) {
    resolve(adCount);
  });
});


// callback into promise for getting white list
var getUserSpecificList = new Promise(function (resolve, reject) {
  chrome.storage.sync.get("userSpecificList", function ({ userSpecificList }) {
    resolve(userSpecificList);
  });
});


// callback into promise for setting white List
function setUserSpecifiList(item) {
  return new Promise(function (resolve, reject) {
    chrome.storage.sync.set({ userSpecificList: item }, function () {
      chrome.storage.sync.get(
        "userSpecificList",
        function ({ userSpecificList }) {
          console.log(userSpecificList);
        }
      );
    });
  });
}


function getCurrenTab(){
  return new Promise(function(resolve,reject){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
      resolve(tabs[0]);
    })
  })
}

// converting callback into promise of getting current url
function getCurrentUrl() {
  return new Promise(function (resolve, reject) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      resolve(tabs[0].url);
    });
  });
}


// =========slicing url 
function getUrl(url) {
  // method to do slicing like https://animepahe.ru/abc/akdj/akdljf to https://animepahe.ru
  return url;
}


//====================intializing function ======================
(async function () {
  document.getElementById("adCount").textContent = await getAdCount;
  let response =await fetch("final-css-filter.txt");
    let text = await response.text()
    this.cssFilterList = text.replaceAll("##","").replaceAll("\r","").split("\n");
    chrome.storage.local.set({"cssFilterList":this.cssFilterList},function(){
        console.log("CSS Filter List:\n",cssFilterList);
    })
})();                         


//=====================

//  sending message from popup.js and updating storage and array in background.js

document.getElementById("offBtn").addEventListener("click", async function () {
  try {
        let url =await getCurrentUrl();
        chrome.runtime.sendMessage({todo:"addToWhiteList",url});
  } catch (error) {
    console.log(error);
  }
});

//=========================

document.getElementById("onBtn").addEventListener("click", async function () {
    try {
        let url =await getCurrentUrl();
        chrome.runtime.sendMessage({todo:"removeFromWhiteList",url});
  } catch (error) {
    console.log(error);
  }
});



//======================



document.getElementById("zapperBtn").addEventListener('click',async function(){
  // sendMessage to contentScript to run once
  let tab = await getCurrenTab();
  chrome.tabs.sendMessage(tab.id, {todo:"zapper"});
})






// extra code



// on off btn combined just like power butotn in Ublock
// //==============================
// var onOffBtn = document.getElementById("onOffBtn");
// onOffBtn.addEventListener('click',async function(){
//     if(onOffBtn.style.color=='blue'){
//         onOffBtn.style.color = "gray";
//         let url =await getCurrentUrl();
//         chrome.runtime.sendMessage({todo:"addToWhiteList",url});
         
//     }
//     else{
//         onOffBtn.style.color = "blue";
//         let url =await getCurrentUrl();
//         chrome.runtime.sendMessage({todo:"removeFromWhiteList",url});
        

//     }
// })
