chrome-xpath-link
=================

Did you ever want to deep link to a paragraph of an HTML page? If that section or paragrah has an HTML id attribute set,  browsers will scroll to it if you append it to the URL hash (http://en.wikipedia.org/wiki/Markdown#Syntax_examples)

This extension allows you to easily copy a direct link to any element (with or without id attribute) simply by right clicking on it, and selecting "Get link to XPath" from the context menu.

Generally the paths will be of the following form:
http://en.wikipedia.org/wiki/Markdown#xpath:/html/body/div-3/div-3/div-4/p-4

Upon visiting a URL that directly links to the element, this extension will highlight and scroll down to the element.

Installation
------------
To use the plugin, simply download this CRX package file: 
  https://github.com/dergachev/chrome-xpath-link/blob/master/chrome-xpath-link.crx?raw=true
Note that it may be out of date relative to the source.

Inspiration
-----------
XPath code shamelessly copied from the Firebug Lite chrome extension: http://getfirebug.com/firebuglite#Debug
My Chrome extension development was greatly aided by this tool: https://github.com/Rob--W/Chrome-Extension-Reloader
