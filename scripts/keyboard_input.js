// Keyboard input via System Events
// Run with: osascript -l JavaScript scripts/keyboard_input.js

var se = Application('System Events');
se.keystroke('hello');           // Type text
se.keyCode(36);                  // Enter
se.keyCode(51);                  // Delete
se.keystroke('a', {using: 'command down'});  // Cmd+A
