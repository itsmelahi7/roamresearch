var selection = [
  "selectedText",
  "blockUid",
  "selection_start",
  "selection_end",
];

var searchBlockUid = "2j7W7OO92"; //add you own search block uid. 
var popupOverlay;

// #e9e9e9 background color;

popupOverlay = document.querySelector("#text-selection-popup-overlay");
if (!popupOverlay) {
  createPopupOverlay();
}
function createPopupOverlay(params) {
  console.log("elahi: createPopupOverlay function is called ");

  popupOverlay = document.createElement("div");
  popupOverlay.id = "text-selection-popup-overlay";
  document.body.appendChild(popupOverlay);
  popupOverlay.style.margin = "4px;";
  popupOverlay.style.display = "none";
  popupOverlay.style.border = "1px solid #e9e9e9";
  popupOverlay.style.borderRadius = "5px";
  popupOverlay.style.position = "absolute";
  popupOverlay.style.backgroundColor = "#f2f2f2";
}






var itemArray = [
  "header-one",
  "header-two",
  "header-three",
  "bold",
  "highlight",
  "search",
];
for (var i = 0; i < itemArray.length; i++) {
  var icon = itemArray[i];
  var div = document.createElement("div");
  div.id = icon + "-icon-popup-overlay";
  div.innerHTML =
    '<span class="bp3-popover-wrapper"><span aria-haspopup="true" class="bp3-popover-target"><span class="bp3-button bp3-minimal bp3-icon-' +
    icon +
    ' bp3-small" tabindex="0"></span></span></span><div class="rm-topbar__spacer-sm"></div>';
    if(icon.includes("header-three")){
      div.innerText = "H3";
    }
  popupOverlay.append(div);
  div.addEventListener("mousedown", function (event) {
    var cl = this.id;
    popupClickAction(cl);
    setTimeout(function () {
      closePopupOverlay();
    }, 500);
  });
}

document.addEventListener("mouseup", (event) => {
  selection[0] = window.getSelection().toString().trim();
  if (selection[0] !== "") { debugger;
    selection[1] = window.getSelection().anchorNode.children[0].id.substr(-9);
    selection[2] = document.querySelectorAll("textarea")[0].selectionStart;
    selection[3] = document.querySelectorAll("textarea")[0].selectionStart;
    
    popupOverlay.style.top = `${event.clientY - 40}px`;
    popupOverlay.style.left = `${event.clientX - 10}px`;
    showPopupOverlay();
  }
});

document.addEventListener("mousedown", (event) => {
  if (!popupOverlay.contains(event.target)) {
    popupOverlay.style.display = "none";
  }
});

function showPopupOverlay() {
  console.log("elahi: showPopupOverlay function is called ");
  popupOverlay.style.display = "flex";
}

function closePopupOverlay() {
  console.log("elahi: closePopupOverlay function is called ");
  popupOverlay.style.display = "none";
}

function popupClickAction(cl) { debugger;
  console.log("elahi: popupClickAction function is called ");
  if (cl.includes("header-one")) {
    updateBlockHeading(1);
  } else if (cl.includes("header-two")) {
    updateBlockHeading(2);
  } else if (cl.includes("header-three")) {
    updateBlockHeading(3);
  } else if (cl.includes("bold")) {
    updateTextBold();
  } else if (cl.includes("highlight")) {
    updateTextHighlight();
  } else if (cl.includes("search")) {
    openSearchBlock();
  }
}

function updateBlockHeading(h) {
  console.log("elahi: updateBlockHeading function is called ");
  window.roamAlphaAPI.updateBlock({
    block: {
      uid: selection[1],
      heading: h,
    },
  });
}

function updateTextBold() {
  console.log("elahi: updateTextBold function is called ");
  var blockText = document.querySelector("textarea").innerHTML;
var b1 = blockText.substring(0,selection[2]);
var b2 = blockText.substring((selection[2] + selection[0].length),);
var updatedText = b1 + "**" + selection[0] + "**" + b2;
window.roamAlphaAPI.updateBlock({
  block: {
    uid: selection[1],
    string: updatedText
  },
});

}
function updateTextHighlight() {
  console.log("elahi: updateTextHighlight function is called ");
  var blockText = document.querySelector("textarea").innerHTML;
var b1 = blockText.substring(0,selection[2]);
var b2 = blockText.substring((selection[2] + selection[0].length),);
var updatedText = b1 + "^^" + selection[0] + "^^" + b2;
window.roamAlphaAPI.updateBlock({
  block: {
    uid: selection[1],
    string: updatedText
  },
});
}


function openSearchBlock() {
  debugger;
  var uid = searchBlockUid; //search block uid;
  var selectedText = selection[0];
  if (selectedText) {
    // update the search block text
    var text = "{{[[search]]: " + selectedText + "}}";
    roamAlphaAPI.updateBlock({
      block: {
        uid: uid,
        string: text
      },
    });
  }
  // open the search block in sidebar
  window.roamAlphaAPI.ui.rightSidebar.addWindow({
    window: {
      type: "block",
      "block-uid": uid,
    },
  });

  setTimeout(function () {
    //document.querySelector(".rm-search-query-title-text button").addEventListener("click", exactTextMatchSearch);
    closePopupOverlay();
  }, 500);
}
