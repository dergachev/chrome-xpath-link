chrome.contextMenus.create({
    title: "Link to Element",
    "contexts": ["all"],
    onclick: function(info, tab) {
        chrome.tabs.sendRequest(tab.id, {name: "link-to-element_contextMenuClick"});  
    }
});
