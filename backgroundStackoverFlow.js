
  function getUrl(url) {
    return url;
  }
  
  function userSpecificListContainsUrl(list, item) {
    for (let i = 0; i < list.length; i++) {
      console.log(list[i]);
      if (list[i] == item) return true;
    }
    return false;
  }
  
  function check(url){

  }

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


  function whiteOrBlackListFn(details){
   var promises = [];
    console.log(details);
        let url = getUrl(details.initiator);
        chrome.storage.sync.get(["adCount","userSpecificList"],function(obj){
            console.log(obj.userSpecificList);
            console.log(obj.adCount);
            if(userSpecificListContainsUrl(obj.userSpecificList,url)){
                console.log("cancel : false");
                var p = new Promise(function(resolve,reject){
                    resolve({cancel:false});
                })
                promises.push(p);
            }
            else{
            

                            
        if(!obj.adCount || obj.adCount==NaN){
            chrome.storage.sync.set({adCount:0},function(){
                return;
            })
        }

            
    var adCount = obj.adCount+1
    chrome.storage.sync.set({"adCount":adCount},function(){
        console.log(adCount);
    });

    console.log("cancel : true");
    var p = new Promise(function(resolve,reject){
        resolve({cancel:false});
    })
    promises.push(p);

            }
        })
        return Promise.all(promises).then(value=>value);

    }
  // 3 arguments
  chrome.webRequest.onBeforeRequest.addListener(
      whiteOrBlackListFn ,
      { urls: defaultFilters },
      ["blocking"]
  )
  
  
  chrome.storage.onChanged.addListener(function (changes, storageName) {
    chrome.browserAction.setBadgeText({
      text: changes.adCount.newValue.toString(),
    });
  });
  