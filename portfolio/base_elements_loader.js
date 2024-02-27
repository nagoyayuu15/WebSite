function load_base_elements() {header = document.querySelector("div.header")
header_loaded = fetch("./header.html")
    .then(data=>data.text())
    .then(html=>{header.innerHTML = html})

header_floating_part = document.querySelector("div.header_floating_part")
header_floating_part_loaded = fetch("./header_floating_part.html")
    .then(data=>data.text())
    .then(html=>{header_floating_part.innerHTML = html})

header_elements_completed = Promise.all([header_loaded,header_floating_part_loaded]).then(
    () => {
        addEventListenerForToolBar('title', 'red')
        addEventListenerForToolBar('identity','yellow')
        addEventListenerForToolBar('skills', 'bluegreen')
        addEventListenerForToolBar('weblog', 'purple')
    }
)

footer = document.querySelector("div.footer")
footer_elements_completed = fetch("./footer.html")
    .then(data=>data.text())
    .then(html=>{footer.innerHTML = html})
    .then(()=>{
        contact = document.querySelector(".footer div.contact")
        fetch("./updatable/contact.html")
            .then(data=>data.text())
            .then(html=>{contact.innerHTML = html})
    })
}