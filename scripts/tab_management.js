// Tab management — create new tabs and switch between them
// Run with: osascript -l JavaScript scripts/tab_management.js

var chrome = Application('Google Chrome');
var win = chrome.windows[0];

// New tab
win.make({new: 'tab', withProperties: {URL: 'https://example.com'}});

// Switch to a tab matching a URL pattern
var tabs = win.tabs();
for (var i = 0; i < tabs.length; i++) {
    if (tabs[i].url().indexOf('target') > -1) {
        win.activeTabIndex = i + 1;
        break;
    }
}
