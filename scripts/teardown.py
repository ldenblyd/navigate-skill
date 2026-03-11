#!/usr/bin/env python3
"""Chrome teardown — run at the END of a navigate session to restore original settings."""

import json, os

PREFS = os.path.expanduser('~/Library/Application Support/Google/Chrome/Default/Preferences')

# These should be set by setup.py — defaults here for standalone use
orig_popups = 2
orig_popup_exceptions = {}
orig_prompt = False

restore = {}
if orig_popups != 1: restore['popups'] = orig_popups
if orig_popup_exceptions: restore['popup_exceptions'] = orig_popup_exceptions
if not orig_prompt: restore['prompt_for_download'] = False

if restore:
    with open(PREFS) as f: prefs = json.load(f)
    if 'popups' in restore:
        prefs['profile']['default_content_setting_values']['popups'] = restore['popups']
    if 'popup_exceptions' in restore:
        prefs['content_settings']['exceptions']['popups'] = restore['popup_exceptions']
    if 'prompt_for_download' in restore:
        prefs['download']['prompt_for_download'] = restore['prompt_for_download']
    with open(PREFS, 'w') as f: json.dump(prefs, f)
    print('Chrome settings RESTORED')
