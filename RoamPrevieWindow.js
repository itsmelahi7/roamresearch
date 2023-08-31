
var graphName = window.roamAlphaAPI.graph.name;
function createOverlay() {
    var overlay = document.createElement("div");
    overlay.id = "roam-preview-window-overlay";


    overlay.style.position = 'fixed';
    overlay.style.top = '10vh';
    overlay.style.left = '10vw';
    overlay.style.width = '80%';
    overlay.style.height = '80%';
    overlay.style.borderRadius =  '20px';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.display = 'none';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';

    var overlayContent = document.createElement("div");
    overlayContent.id = "roam-preview-window-overlay-content";
    overlayContent.style.width = '100%';
    overlayContent.style.height = '100%';

    var rmIframe = document.createElement("iframe");
    rmIframe.id = "roam-preview-window-overlay-iframe"; 
    rmIframe.src = "https://roamresearch.com/?server-port=3333#/app/" + graphName;  
    rmIframe.style.width = '100%';
    rmIframe.style.height = '100%';
    rmIframe.style.border = '2px solid #d4cccc';



    var button = document.createElement("button");
    button.textContent = "close Overlay";
    button.style.position = "absolute";
    button.style.bottom = "10px";
    button.style.right = "10px";

    // Add a click event listener to the button
    button.addEventListener("click", function() {
       closeOverlay();
    });

    overlayContent.appendChild(button);
    overlayContent.appendChild(rmIframe);
    overlay.appendChild(overlayContent);
    document.body.appendChild(overlay);

}

function abc(){

  var rmLinks = document.querySelectorAll("span.rm-page-ref, a.rm-alias--page, span.rm-block-ref");

  rmLinks.forEach(function(link) {
      // Add the event listener for "mouseenter" (hover)
      link.addEventListener("mouseenter", function(event) { 
          if (event.metaKey) {
              var pageUid = "";
              if(this.className.indexOf("rm-page-ref--tag") > 0 ) {
                  pageUid = this.getAttribute("data-link-uid");
  
              } else if(this.className.indexOf("rm-page-ref--link") >0 ) {
                  pageUid = this.parentElement.getAttribute("data-link-uid");
              } else if(this.className.indexOf("rm-alias--page") > 0 ) {
                pageUid = this.getAttribute("data-link-uid");
            } else if (this.className.indexOf("rm-block-ref") >= 0 ){
              pageUid = this.getAttribute("data-uid");
            }
              var ifr = document.getElementById("roam-preview-window-overlay-iframe")
              ifr.src = "https://roamresearch.com/?server-port=3333#/app/"+graphName+"/page/" + pageUid;
              openOverlay();
          }
      });
  });
}

setInterval(abc, 2000);

function openOverlay(params) { 
  document.querySelector(".roam-body").style.filter= 'blur(4px)';
    document.getElementById("roam-preview-window-overlay").style.display = "block";
}

function closeOverlay(params) {
  document.querySelector(".roam-body").style.removeProperty("filter");
    document.getElementById("roam-preview-window-overlay").style.display = "none";
}

createOverlay();
