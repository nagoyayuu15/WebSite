
async function get_all_files(url){
    return await fetch(url+"?"+now)
    .then(data=>data.text())
    .then(string=>(new DOMParser()).parseFromString(string, 'text/html'))
    .then(html=>Array.from(html.querySelectorAll(":not(a[href='..'])+a")))
    .then(arr=>arr.map(anc=>anc.innerHTML))
} 

async function set_into_innerHTML_of(element, url){
    await fetch(url).then(data=>data.text()).then(html=>{element.innerHTML=html})
}