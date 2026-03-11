// Click an element on the page
// Run with: osascript -l JavaScript scripts/click_element.js

var chrome = Application('Google Chrome');
var tab = chrome.windows[0].activeTab();

tab.execute({javascript: `
    document.querySelector('button.submit').click();
`});
