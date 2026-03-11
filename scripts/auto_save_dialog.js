// Auto-click Save/Enregistrer on Chrome's download save dialog
// Run with: osascript -l JavaScript scripts/auto_save_dialog.js

var se = Application('System Events');
var saved = false;
for (var attempt = 0; attempt < 40; attempt++) {
    try {
        var proc = se.processes['Google Chrome'];
        var wins = proc.windows();
        for (var w = 0; w < wins.length; w++) {
            var sheets = wins[w].sheets();
            if (sheets.length > 0) {
                // IMPORTANT: sheets[0].buttons does NOT list the Save button!
                // Must use entireContents() to find it.
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
saved ? 'SAVED' : 'NO_DIALOG_FOUND';
