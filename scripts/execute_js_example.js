// Execute complex JS via JXA
// Run with: osascript -l JavaScript scripts/execute_js_example.js

var chrome = Application('Google Chrome');
var tab = chrome.windows[0].activeTab();

var result = tab.execute({javascript: `
    (function() {
        // Your JS here — use backtick templates, no escaping issues
        var inputs = document.querySelectorAll('input');
        return Array.from(inputs).map(i => i.placeholder).join(', ');
    })()
`});
result;
