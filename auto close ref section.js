function isDateFormat(text) {
  var regex = /^(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}(st|nd|rd|th)?, \d{4}$/;
  return regex.test(text);
}
var currPage = "";
function closeLinekdRef() { debugger;
var pageTitle = $(".rm-title-display span")[0].innerText;
if (isDateFormat(pageTitle) ){ debugger;
  if (pageTitle != currPage){
    currPage = pageTitle;
  } else { return; }
  var ele = $(".roam-article .rm-reference-container .flex-h-box>span.rm-caret-open")[0];
  var classValue = $(".roam-article .rm-reference-container .flex-h-box>span.rm-caret-open")[0].classList.value;
  if (classValue.indexOf("open") >= 0 ) {
    ele.click();
  }
}
}                           

setInterval(closeLinekdRef, 5000);
