var contextMenuElementXPath;

chrome.extension.onRequest.addListener ( function(request, sender, sendResponse) {
  if (request.name == "link-to-element_contextMenuClick") {
    var xpathLink = window.location.href.replace(/#.*$/,'') + "#" + encodeXPath(contextMenuElementXPath);
    //prompt("Link to XPath. (copy)",contextMenuElementXPath, "C","D");
    //prompt("Press Ctrl-C or Cmd-C to copy the following link:\n" + xpathLink, xpathLink);
    window.location = xpathLink;
  }
});

var onContextMenu = function(event)
{
    contextMenuElementXPath = getElementXPath(event.target);
    //console.log(contextMenuElementXPath);
};
window.addEventListener("contextmenu", onContextMenu);


/*
 * Gets XPATH string representation for given DOM element, stolen from firebug_lite.
 * example: /html/body/div[2]/div[3]/div[4]/div/div[2]/div/div/div/div/div/div[2]/p
 *
 * To keep paths short, the path generated tries to find a parent element with a unique
 * id, eg: //[@id="dom-element-with-id"]/div[2]/p
 */
var getElementXPath = function(element) {
    var paths = [];

    for (; element && element.nodeType == 1; element = element.parentNode)
    {
        var index = 0;
        var nodeName = element.nodeName;

        if (element.id) {
          var tagName = element.nodeName.toLowerCase();
          paths.splice(0, 0, '*[@id="' + element.id + '"]');
          return "//" + paths.join("/");
        }

        for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling)
        {
            if (sibling.nodeType != 1) continue;

            if (sibling.nodeName == nodeName)
                ++index;
        }

        var tagName = element.nodeName.toLowerCase();
        var pathIndex = (index ? "[" + (index+1) + "]" : "");
        paths.splice(0, 0, tagName + pathIndex);
    }

    return paths.length ? "/" + paths.join("/") : null;
};


/*
 * Checks if the URL matches the following pattern:
 *   http://www.nytimes.com/#xpath:/html/body/div[2]
 * If so, extracts xPath string, evaluates it to find the right DOM elements,
 * and highlights and scrolls to them.
 */
function jumpToXPathInUrl() {

  if(location.hash) { 
    var xpath = decodeXPath(location.hash.replace(/^#/, ''));
    var elem = jQuery.xpath(xpath);

    if (elem.length == 0) {
      // console.log("empty");
      return;
    } 
    //hack required since a path like /html/body/div[2]/p might match multiple elements
    elem = jQuery(elem.get(0));

    // console.log(xpath);

    //deal with text nodes
    if(elem.get(0).nodeType == 3 ) { 
      elem.wrap("<span id='xpath-highlight-wrapper'/>")
        elem = elem.parent('span#xpath-highlight-wrapper');
    }
    //remove the xpath-highlight class from the page
    jQuery('.xpath-highlight').removeClass('xpath-highlight');
    //add it to the currently selected element
    $(elem).addClass('xpath-highlight');

    jQuery('<style>')
      .text(".xpath-highlight{background-color: rgba(255,255,128,.5) !important; border: 1px dashed black; }")
      .appendTo(jQuery('body'));
    jQuery.scrollTo( elem, 800);
  } 

};

window.onhashchange = function() {
  jumpToXPathInUrl();
}

function encodeXPath(xpath) { 
  // replace div[4]/a[3] with div-4/a-3
  xpath = xpath.replace(/\[(\d+)\]/g, "-$1");
  //replace //*[@id="dom-id"]/a[3] with #dom-id/a[3]
  xpath = xpath.replace(/^\/\/\*\[@id="([a-zA-Z0-9_-]+)"\]/, "$1");

  //console.log("Xpath encoded: " + xpath);
  //xpath = encodeURIComponent(xpath);
  return xpath;
}

function decodeXPath(xpath) { 
  //xpath = decodeURIComponent(xpath);
  
  //replace beginning 'element-id/div-3' with '//*[@id="element-id"]/div-3
  xpath = xpath.replace(/^([a-zA-Z0-9_-]+)/, '//*[@id="$1"]');
  
  // replace div-4/a-3 with div[4]/a[3]
  xpath = xpath.replace(/-(\d+)(\/|$)/g, '[$1]$2');
  // console.log("Xpath decoded: " + xpath);
  return xpath;
}
jumpToXPathInUrl(jQuery);
