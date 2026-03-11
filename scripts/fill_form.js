// Fill a form input and dispatch input event
// Run with: osascript -l JavaScript scripts/fill_form.js

var chrome = Application('Google Chrome');
var tab = chrome.windows[0].activeTab();

tab.execute({javascript: `
    var input = document.querySelector('input[name="email"]');
    input.value = 'test@example.com';
    input.dispatchEvent(new Event('input', {bubbles: true}));
`});
