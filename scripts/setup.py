#!/usr/bin/env python3
"""Chrome setup for automation — run at the START of any navigate session."""

import json, os

PREFS = os.path.expanduser('~/Library/Application Support/Google/Chrome/Default/Preferences')
with open(PREFS) as f: prefs = json.load(f)

p = prefs.setdefault('profile', {}).setdefault('default_content_setting_values', {})
dl = prefs.setdefault('download', {})

orig_popups = p.get('popups', 2)
orig_prompt = dl.get('prompt_for_download', False)
cs = prefs.setdefault('content_settings', {}).setdefault('exceptions', {})
orig_popup_exceptions = cs.get('popups', {}).copy()

needs_restart = False

# Enable popups globally (needed for downloads/auth)
if orig_popups != 1:
    p['popups'] = 1
    needs_restart = True

# IMPORTANT: Clear site-specific popup exceptions — they override the global setting
if cs.get('popups'):
    cs['popups'] = {}
    needs_restart = True

# Enable download prompt — REQUIRED for blob/JS downloads to work
# Without this, blob-created downloads are silently dropped by Chrome
if not orig_prompt:
    dl['prompt_for_download'] = True
    needs_restart = True

if needs_restart:
    with open(PREFS, 'w') as f: json.dump(prefs, f)
    os.system('osascript -e \'tell application "Google Chrome" to quit\'')
    import time; time.sleep(2)
    os.system('open -a "Google Chrome"')
    time.sleep(3)
    print('Chrome configured: popups=ALLOW, download_prompt=ON')
else:
    print('Chrome already configured, no restart needed')
