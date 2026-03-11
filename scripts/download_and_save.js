// Combined: trigger a download and immediately handle the save dialog
// Run with: osascript -l JavaScript scripts/download_and_save.js

var chrome = Application('Google Chrome');
var tab = chrome.windows[0].activeTab();

// 1. Trigger the download (adapt selector to your case)
tab.execute({javascript: `document.querySelector('a[download], button:has-text("Download")').click()`});

// 2. Immediately handle the save dialog
var se = Application('System Events');
var saved = false;
for (var attempt = 0; attempt < 40; attempt++) {
    try {
        var proc = se.processes['Google Chrome'];
        var wins = proc.windows();
        for (var w = 0; w < wins.length; w++) {
            var sheets = wins[w].sheets();
            if (sheets.length > 0) {
                var all = sheets[0].entireContents();
                for (var i = all.length - 1; i >= 0; i--) {
                    try {
                        if (all[i].role() === 'AXButton') {
                            var nm = all[i].name();
                            if (nm === 'Save' || nm === 'Enregistrer') {
                                all[i].click();
                                saved = true;
                                break;
                            }
                        }
                    } catch(e2) {}
                }
                if (saved) break;
            }
        }
        if (saved) break;
    } catch(e) {}
    delay(0.5);
}
saved ? 'DOWNLOAD_SAVED' : 'NO_DIALOG_AFTER_20s';
