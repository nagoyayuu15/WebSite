import glob
import sys
import os
import datetime
import re

try:
    os.chdir(sys.argv[1])
except IndexError:
    raise RuntimeError("Give an argument(directory-path).")

files = glob.glob("./**/*.html",recursive=True)
files.append("./portfolio/define_updated_time.js")

CSS_VERSION = "4.3"
FRAGMENT_VERSION = "4"
SCRIPT_VERSION = "7"

# timestamp = datetime.datetime.now(datetime.timezone.utc).strftime("%Y%m%d%H%M%S%f")
expired_at = (
    datetime.datetime.now(datetime.timezone.utc)
).strftime("%a, %d %b %Y %H:%M:%S GMT")

for f in files:
    print(f)
    with open(f,"r") as fd:
        lines = fd.read()
        # lines = re.sub(r"\?cache_is_deprecated_at=[0-9]*\&",f"?cache_is_deprecated_at={timestamp}&",lines)
        lines = re.sub(
            r'<meta http-equiv="Last-Modified" content="(.*)">',
            f'<meta http-equiv="Last-Modified" content="{expired_at}">',
        lines)

        lines = re.sub(
            r'\?updatedAt="(.*)"&',
            f'?updatedAt="{expired_at}"&',
        lines)

        lines = re.sub(
            r'\?css_version=(.*)&',
            f'?css_version={CSS_VERSION}&',
        lines)

        lines = re.sub(
            r'\?fragment_version=(.*)&',
            f'?fragment_version={FRAGMENT_VERSION}&',
        lines)

        lines = re.sub(
            r'\?script_version=(.*)&',
            f'?script_version={SCRIPT_VERSION}&',
        lines)
    
    with open(f,"w") as fd:
        fd.write(lines)