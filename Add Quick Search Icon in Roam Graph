var uid = "FTM8L_62b"; // add the search element block-ref here. 
var icon = "search-template";
var id = "right-sidebar-top-"+icon+"-icon";
var check = document.querySelector("#right-sidebar-top-search-template-icon");
if (!check){
    var span = document.createElement("span");
    span.id = id;
    span.classList.add( "bp3-button", "bp3-minimal", "bp3-icon-" + icon, "bp3-small"); 
    
    var roamSidebar= document.querySelectorAll("#right-sidebar .flex-h-box")[0]; 
    //roamSidebar.appendChild(span);
    roamSidebar.insertBefore(span,roamSidebar.firstChild);
    span.addEventListener("mousedown", openSearchBlock);
}
  
function openSearchBlock() {
var text = window.getSelection().toString();
if(!text) {
  window.roamAlphaAPI.ui.rightSidebar.addWindow({
        window: {
            type: 'block',
            'block-uid': uid
        }
    }); return;
}
var searchText = "{{[[search]]: " + text +"}}"

roamAlphaAPI.updateBlock({"block": 
              {"uid": uid,
              "string": searchText}
    });
window.roamAlphaAPI.ui.rightSidebar.addWindow({
        window: {
            type: 'block',
            'block-uid': uid
        }
    });  
}
