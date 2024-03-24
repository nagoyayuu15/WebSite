from bs4 import BeautifulSoup
from glob import glob
import json
from datetime import datetime

idx = {
	"all_tags":set(),
	"articles":[],
	"earliest":datetime.now(),
	"latest":datetime(1900,1,1)
}
article = {
	"tags":[],
	"file":"",
	"when":"",
}

for f in glob("./updatable/weblog/*.html"):
	with open(f,'r',encoding="utf-8") as fp:
		bsobj = BeautifulSoup(fp.read(),"html.parser")
		tagset = set(bsobj.select_one(".tags").contents[0].split(","))
		date = datetime.strptime(bsobj.select_one(".when").contents[0],"%Y/%m/%d") 
		idx["articles"].append(
			{
				"tags":list(tagset),
				"file":f,
				"when":bsobj.select_one(".when").contents[0],
			}
		)
		idx["all_tags"] |= tagset
		idx["earliest"] = min(idx["earliest"],date)
		idx["latest"] = max(idx["latest"],date)

idx["all_tags"] = list(idx["all_tags"])
idx["all_tags"].sort()
idx["articles"].sort(key=lambda e:e["when"])
idx["earliest"] = idx["earliest"].strftime("%Y/%m/%d")
idx["latest"] = idx["latest"].strftime("%Y/%m/%d")

with open("./weblog_index.json",'w',encoding="utf-8") as fp:
	json.dump(idx,fp)