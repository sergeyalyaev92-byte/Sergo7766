from pathlib import Path

app = Path('app.js')
text = app.read_text(encoding='utf-8')
old_defaults = "const DEFAULTS = Object.freeze({style:'Outlined',fill:0,weight:400,grade:0,optical:24,iconColor:'#171717',background:'none',backgroundColor:'#E8E8E8',scale:60});"
new_defaults = "const DEFAULTS = Object.freeze({style:'Outlined',fill:0,weight:400,grade:0,optical:24,iconColor:'#FFFFFF',background:'rounded',backgroundColor:'#AE955F',scale:60});"
old_key = "const STORAGE_KEY = 'material-icon-settings';"
new_key = "const STORAGE_KEY = 'material-icon-settings-v2';"
if old_defaults not in text:
    raise SystemExit('Expected DEFAULTS line not found; refusing to patch stale code')
if old_key not in text:
    raise SystemExit('Expected STORAGE_KEY line not found; refusing to patch stale code')
text = text.replace(old_defaults, new_defaults, 1).replace(old_key, new_key, 1)
app.write_text(text, encoding='utf-8')

index = Path('index.html')
html = index.read_text(encoding='utf-8')
if 'v=20260912-2' not in html:
    raise SystemExit('Expected cache version not found; refusing to patch stale index')
html = html.replace('v=20260912-2', 'v=20260912-3')
index.write_text(html, encoding='utf-8')

print('Patched default icon preset and cache version')
