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

# timestamp = datetime.datetime.now(datetime.timezone.utc).strftime("%Y%m%d%H%M%S%f")
expired_at = (
    datetime.datetime.now(datetime.timezone.utc)
).strftime("%a, %d %b %Y %H:%M:%S GMT")

for f in files:
    print(f)
    with open(f,"r+") as fd:
        lines = fd.read()
        # lines = re.sub(r"\?cache_is_deprecated_at=[0-9]*\&",f"?cache_is_deprecated_at={timestamp}&",lines)
        lines = re.sub(
            r'<meta http-equiv="Last-Modified" content="(.*)">',
            f'<meta http-equiv="Last-Modified" content="{expired_at}">',
        lines)
        lines = re.sub(
            r'\?updatedAt="(.*)"&',
            f'\?updatedAt="{expired_at}"&',
        lines)
        fd.seek(0, os.SEEK_SET)
        fd.write(lines)