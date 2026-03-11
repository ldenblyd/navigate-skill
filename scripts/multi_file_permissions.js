// Auto-accept Chrome's "Allow site to download multiple files?" permission bar
// Run with: osascript -l JavaScript scripts/multi_file_permissions.js

var se = Application('System Events');
var proc = se.processes['Google Chrome'];
// The permission bar is a group in the Chrome window — look for "Allow"/"Autoriser" button
var groups = proc.windows[0].groups;
for (var g = 0; g < groups.length; g++) {
    try {
        var btns = groups[g].buttons;
        for (var b = 0; b < btns.length; b++) {
            var name = btns[b].name();
            if (name === 'Allow' || name === 'Autoriser') {
                btns[b].click();
                break;
            }
        }
    } catch(e) {}
}
