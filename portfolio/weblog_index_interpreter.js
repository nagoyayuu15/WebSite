let span={};

function earliest(){
    let earliest = weblog_index_obj.earliest.split("/")
    return new Date(new Number(earliest[0]),new Number(earliest[1])-1,new Number(earliest[2]))
}
function latest(){
    let latest = weblog_index_obj.latest.split("/")
    return new Date(new Number(latest[0]),new Number(latest[1])-1,new Number(latest[2]))
}
function date_parser(date_string){
    let digits = date_string.split("/")
    return new Date(new Number(digits[0]),new Number(digits[1])-1,new Number(digits[2]))
}
function is_inspan(date_string){
    for (let key in span) {
        let mod_key = new Date(key)
        key = new Date(key)
        mod_key.setMonth(mod_key.getMonth()+1)
        let date = date_parser(date_string)
        if (span[key] && key<= date && date <mod_key){return true;}
    }
    return false;
}