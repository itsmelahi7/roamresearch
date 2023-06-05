// icon names, blockUid, ids
//get icon names from here https://blueprintjs.com/docs/#icons
let icons = [
  { icon: "star-empty", blockUid: "vMASsLFDx" }, 
  { icon: "search-template", blockUid: "0qpAyT1gx" }, 
  { icon: "form", blockUid: "D3ZP7p-QN"}, //task-list
  { icon: "globe", blockUid: "aSP9WMy8l"},
  { icon: "random", blockUid: "cQKMeRtwM"},
  { icon: "group-objects", blockUid: "omSdnbkka"} 
];


for (var i=0; i< icons.length; i++) { debugger;
  var id = "right-sidebar-top-11" + icons[i].icon + "-icon";
  var check = document.getElementById(id);
  if(!check){
    var span = document.createElement("span");
    span.id = id;
    span.classList.add( "bp3-button", "bp3-minimal", "bp3-icon-" + icons[i].icon, "bp3-small", icons[i].blockUid ); 
    
    var roamSidebar= document.querySelectorAll("#right-sidebar .flex-h-box")[0]; debugger;
    //roamSidebar.appendChild(span);
    roamSidebar.insertBefore(span,roamSidebar.firstChild);
    span.addEventListener("click", function (event) { debugger;
        var blockUid = event.target.className.split(" ")[4];
        window.roamAlphaAPI.ui.rightSidebar.addWindow({
        window: {
            type: 'block',
            'block-uid':blockUid
        }
        }); 
    })
  }
}
