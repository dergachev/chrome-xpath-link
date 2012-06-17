chrome.contextMenus.create({
    title: "Get link to XPath",
    "contexts": ["all"],
    onclick: function(info, tab) {
        chrome.tabs.sendRequest(tab.id, {name: "xpath-link_contextMenuClick"});  
    }
});
