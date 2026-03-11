// Read page content efficiently — get overview of interactive elements + text
// Run with: osascript -l JavaScript scripts/read_page_content.js

var chrome = Application('Google Chrome');
var tab = chrome.windows[0].activeTab();

tab.execute({javascript: `
    (function() {
        var r = 'URL: ' + location.href + '\\nTITLE: ' + document.title + '\\n';
        document.querySelectorAll('input,button,a,select,textarea').forEach(function(el, i) {
            var desc = el.tagName + ' ' + (el.type||'') + ' ' + (el.name||'') + ' ' + (el.placeholder||'') + ' ' + el.textContent.trim().substring(0,40);
            r += i + ': ' + desc.trim() + '\\n';
        });
        r += '\\nTEXT:\\n' + document.body.innerText.substring(0, 2000);
        return r;
    })()
`});
