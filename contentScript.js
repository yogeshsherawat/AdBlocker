console.log("running");


chrome.storage.local.get("cssFilterList",function({cssFilterList}){
    
    console.log(cssFilterList);
for(let i=0;i<20;i++){
    let filter = cssFilterList[i];
    var elements = document.querySelectorAll(filter);
    for(let j=0;j<elements.length;j++){
        elements[j].style.display = "none";
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    switch ( request.todo){
        case "zapper":
            console.log("zapper running");
            zapperFn();
            break;
        default:
            console.log("Zapper doing nothing")
    }
    
});

async function zapperFn(){
    

}


function documentMouseOver(){
    return new Promise(function(resolve,reject){
        document.addEventListener("mouseover",function(e){
            resolve(e);
        })
    })
}

function eventMouseOut(e){
    return new Promise(function(resolve,reject){
        e.addEventListener()
    })
}





 
    //====================================================
// getting all the divs and checking if their class is in filter list or not
//================================================================
// let allDivs = document.getElementsByTagName('div');
// console.log(cssFilterList);

// for(let i=0;i<allDivs.length;i++){
//     let div = allDivs[i];
//     console.log(div);
//     let classList  = div.classList;
//      for(let i=0;i<classList.length;i++)
//      {
//          if(cssFilterList.includes(classList[i]))
//          {div.style.display = "none";
//          break;}
//      }
// }

})

