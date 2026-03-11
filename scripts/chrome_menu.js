// Chrome menu interaction via System Events
// Run with: osascript -l JavaScript scripts/chrome_menu.js

var se = Application('System Events');
var proc = se.processes['Google Chrome'];

// List all menu names
var menuNames = proc.menuBars[0].menus().map(m => m.name());
menuNames;

// Click a specific menu item (example: File > Print)
// proc.menuBars[0].menus.byName('File').menuItems.byName('Print').click();
