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

timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S%f")

for f in files:
    print(f)
    with open(f,"r+") as fd:
        lines = fd.read()
        lines = re.sub(r"\?cache_is_deprecated_at=[0-9]*\&",f"?cache_is_deprecated_at={timestamp}&",lines)
        fd.seek(0, os.SEEK_SET)
        fd.write(lines)