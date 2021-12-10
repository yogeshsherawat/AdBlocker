var getAdCount = () => {return new Promise(function (resolve, reject) {
  chrome.storage.sync.get("adCount", function ({ adCount }) {
    resolve(adCount);
  });
});
}

var getUserSpecificList = () => {return new Promise(function (resolve, reject) {
  chrome.storage.sync.get("userSpecificList", function ({ userSpecificList }) {
    resolve(userSpecificList);
  });
});
}

var getCurrenTabUrl = () => {return new Promise(function (resolve, reject) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    resolve(tabs[0].url);
  });
});
}

function setAdCount(count) {
  return new Promise(function (resolve, reject) {
    chrome.storage.sync.set({ adCount: count }, function () {
      chrome.storage.sync.get("adCount", function ({ adCount }) {
        console.log(adCount);
        resolve(adCount);
      });
    });
  });
}

function setUserSpecifiList(item) {
  return new Promise(function (resolve, reject) {
    chrome.storage.sync.set({ userSpecificList: item }, function () {
      chrome.storage.sync.get(
        "userSpecificList",
        function ({ userSpecificList }) {
          console.log(userSpecificList);
          resolve(userSpecificList);
        }
      );
    });
  });
}

// method to do slicing like https://animepahe.ru/abc/akdj/akdljf to https://animepahe.ru

function getUrl(url) {
  return url;
}

function userSpecificListContainsUrl(list, item) {
  for (let i = 0; i < list.length; i++) {
    console.log(list[i]+"=?"+item+(list[i]==item));
    if (list[i] == item) return true;
  }
  return false;
}




/*
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.block==true){
		console.log("im blocking request");
	chrome.webRequest.onBeforeRequest.addListener(
		function(details){
			return {cancel:true};
		},
		{urls:defaultFilters},
		["blocking"]
	);
	}
})
*/


async function cancelCheck(details){

	let userSepcificList = await getUserSpecificList();
	console.log(userSepcificList);
	console.log("Initiator:"+details.initiator);
	if(details.initiator && userSpecificListContainsUrl(userSepcificList,details.initiator)){
		console.log("cancel:false");
		return false;
	}
	else{
	
	let adCount = await getAdCount();
	if (!adCount || adCount == NaN) {
		adCount =0;
	  }
	let updatedAdCount = await setAdCount(adCount+1);
	console.log(adCount+" is updated to "+updatedAdCount);
	console.log("cancel:true");
	return true;
}

}

chrome.webRequest.onBeforeRequest.addListener(
async function(details){
	let x = await cancelCheck(details);
	console.log(x);
	return {cancel:x};
}
,{ urls: defaultFilters },
  ["blocking"]
 );






// 3 arguments

// chrome.webRequest.onBeforeRequest.addListener(
//   async function (details) {
// 	  try {
// 		console.log(details);
// 		var url = getUrl(details.url);
// 		var userSpecificList = await getUserSpecificList();
// 		console.log("userSepcificList:",userSpecificList);
// 		if (userSpecificListContainsUrl(userSpecificList, url)) {
// 		  return { cancel: false };
// 		} else {
// 		  var adCount = await getAdCount();
// 		  console.log("initial adcount:",adCount);
// 		  if (!adCount || adCount == NaN) {
// 			let updatedAdCount = await setAdCount(0);
// 		  }
// 		  var newAdCount = adCount + 1;
// 		  console.log("newAdcount:",newAdCount);
// 		  let updatedAdCount = await setAdCount(newAdCount);
// 		  console.log("updatedAdcount:",updatedAdCount);
// 		  return { cancel: true };
// 		}
		  
// 	  } catch (error) {
// 		  console.log(error);
// 	  }
    
//   },
//   { urls: defaultFilters },
//   ["blocking"]
// );





// function whilteListFndetails(details) {

// 	console.log(details);
// 	chrome.tabs.query({active:true,currentWindow:true},function(tabs){
// 		let url = getUrl(tabs[0].url);
// 		chrome.storage.sync.get(["adCount","userSpecificList"],function(obj){
// 			console.log(obj.userSpecificList);
// 			console.log(obj.adCount);
// 			if(userSpecificListContainsUrl(obj.userSpecificList,url)){
// 				console.log("cancel : false");
// 				return {cancel:false};
// 			}
// 			else{
			

							
// 		if(!obj.adCount || obj.adCount==NaN){
// 			chrome.storage.sync.set({adCount:0},function(){
// 				return;
// 			})
// 		}

			
// 	var adCount = obj.adCount+1
// 	chrome.storage.sync.set({"adCount":adCount},function(){
// 		console.log(adCount);
// 	});

// 	console.log("cancel : true");
// 	return { cancel: true }

// 			}
// 		})
// 	})

// 	}





// chrome.webRequest.onBeforeRequest.addListener(
//     whiteListFn,
//     { urls: defaultFilters },
//     ["blocking"]
// )


chrome.storage.onChanged.addListener(function (changes, storageName) {
  chrome.browserAction.setBadgeText({
    text: changes.adCount.newValue.toString(),
  });
});
