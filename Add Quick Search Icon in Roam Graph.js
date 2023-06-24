var uid = "icx5tLSn0"; // add the search element block-ref here. 
var icon = "search-template";
var id = "right-sidebar-top-" + icon + "-icon";
var check = document.querySelector("#right-sidebar-top-search-template-icon");
if (!check) {
    var span = document.createElement("span");
    span.id = id;
    span.classList.add("bp3-button", "bp3-minimal", "bp3-icon-" + icon, "bp3-small");

    var roamSidebar = document.querySelectorAll("#right-sidebar .flex-h-box")[0];
    //roamSidebar.appendChild(span);
    roamSidebar.insertBefore(span, roamSidebar.firstChild);
    span.addEventListener("mousedown", openSearchBlock);
}

async function openSearchBlock() {
    var text = window.getSelection().toString();
    if (!text) {
        window.roamAlphaAPI.ui.rightSidebar.addWindow({
            window: {
                type: 'block',
                'block-uid': uid
            }
        });
    } else {
        var searchText = "{{[[search]]: " + text + "}}"
        roamAlphaAPI.updateBlock({
            "block": {
                "uid": uid,
                "string": searchText
            }
        });
        window.roamAlphaAPI.ui.rightSidebar.addWindow({
            window: {
                type: 'block',
                'block-uid': uid
            }
        });
    }

    setTimeout(function() {
        var searchButton = document.querySelector(".rm-search-query-title-text button");
        if (searchButton) {
            searchButton.addEventListener("click", highlightMatchingWords);
        }
        var refreshButton = document.querySelector(".rm-search-query-title button.bp3-icon-refresh");

        if (refreshButton) {
            refreshButton.addEventListener("click", highlightMatchingWords);
        }

        highlightMatchingWords();
    }, 1500);

}

function highlightMatchingWords() {
    setTimeout(function() {

        var block = document.querySelectorAll(".rm-search-query-content .rm-block__input>span");
        var wordsArray = document.querySelector(".rm-search-query input").value.split(" ");

        for (var i = 0; i < block.length; i++) {
            var html = block[i].innerHTML;

            // Iterate through the wordsArray and replace words in the HTML string
            wordsArray.forEach(function(word) {
                var regex = new RegExp('(?<!<[^>]*?)' + escapeRegExp(word) + '(?!\\w)', 'gi');
                html = html.replace(regex, function(match) {
                    return '<span class="hh">' + match + '</span>';
                });
            });

            block[i].innerHTML = html;
        }

        // Helper function to escape special characters in a string
        function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        var elements = document.querySelectorAll("span.hh");

        for (var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = "#96f37f";
        }
    }, 1000);
}
