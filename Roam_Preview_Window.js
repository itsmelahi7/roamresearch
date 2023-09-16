var graphName = window.roamAlphaAPI.graph.name;
var elementClass = "preview-window";
var overlayDiv = document.createElement("div");
overlayDiv.id = "preview-window-overlay";
overlayDiv.innerHTML =
  '<div aria-live="polite" class="bp3-overlay bp3-overlay-open bp3-overlay-scroll-container"><div tabindex="0" class="bp3-overlay-enter-done"></div><div class="bp3-overlay-backdrop rm-modal-backdrop rm-modal-backdrop--' +
  elementClass +
  ' bp3-overlay-enter-done"></div><div class="bp3-dialog-container bp3-overlay-content bp3-overlay-enter-done"><div class="bp3-dialog rm-modal-dialog rm-modal-dialog--' +
  elementClass +
  '" role="dialog"></div></div><div tabindex="0" class="bp3-overlay-enter-done"></div></div>';

overlayDiv.style.display = "none";
document.body.append(overlayDiv);

var ele = document.querySelector(
  " #preview-window-overlay .bp3-dialog-container .rm-modal-dialog--preview-window"
);
ele.style.width = "80vw";
ele.style.height = "80vh";
var containerDiv = document.createElement("div");
containerDiv.id = "container-preview-window";
containerDiv.style.width = "100%";
containerDiv.style.height = "100%";
ele.appendChild(containerDiv);

var rmIframe = document.createElement("iframe");
rmIframe.src = "https://roamresearch.com/#/app/" + graphName;
rmIframe.style.width = "100%";
rmIframe.style.height = "100%";
rmIframe.style.borderRadius = "5px";
rmIframe.style.border = "none";
containerDiv.appendChild(rmIframe);



function openPreviewWindow() {
  document.querySelector("#preview-window-overlay").style.display = "block";
}

function closePreviewWindow() {
  document.querySelector("#preview-window-overlay").style.display = "none";
}
var overlayPreviewWindow = document.querySelector(".bp3-overlay-backdrop.rm-modal-backdrop.rm-modal-backdrop--preview-window");
overlayPreviewWindow.addEventListener("click", (event) => { 
  closePreviewWindow();
  
});

function abc() {
  var rmLinks = document.querySelectorAll(
    "span.rm-page-ref, a.rm-alias--page, span.rm-block-ref"
  );

  rmLinks.forEach(function (link) {
    // Add the event listener for "mouseenter" (hover)
    link.addEventListener("mouseenter", function (event) {
      if (event.metaKey) {
        setPageUid(event.target);
      }
    });
  });
}

function setPageUid(link) {
  var pageUid = "";
  switch (true) {
    case link.classList.contains("rm-page-ref--tag"):
      pageUid = link.getAttribute("data-link-uid");
      break;
    case link.classList.contains("rm-page-ref--link") ||
      link.classList.contains("rm-page-ref--namespace"):
      pageUid = link.parentElement.getAttribute("data-link-uid");
      break;
    case link.classList.contains("rm-alias--page"):
      pageUid = link.getAttribute("data-link-uid");
      break;
    case link.classList.contains("rm-block-ref"):
      pageUid = link.getAttribute("data-uid");
      break;
    default:
      // Handle other cases if needed
      break;
  }
  rmIframe.src =
    "https://roamresearch.com/#/app/" + graphName + "/page/" + pageUid;
  setTimeout(function () {
    openPreviewWindow();
  }, 500);
}
setInterval(abc, 2000);
