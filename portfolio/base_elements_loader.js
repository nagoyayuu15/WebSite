async function load_base_elements() {
header = document.querySelector("div.header")
header_loaded = fetch("./header.html?"+now)
    .then(data=>data.text())
    .then(html=>{header.innerHTML = html})

header_floating_part = document.querySelector("div.header_floating_part")
header_floating_part_loaded = fetch("./header_floating_part.html?"+now)
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
footer_elements_completed = fetch("./footer.html?"+now)
    .then(data=>data.text())
    .then(html=>{footer.innerHTML = html})
    .then(()=>{
        contact = document.querySelector(".footer div.contact")
        return fetch("./updatable/contact.html?"+now)
            .then(data=>data.text())
            .then(html=>{contact.innerHTML = html})
    })

await Promise.all([header_elements_completed,footer_elements_completed])

set_colors_with_another_selector(
    "#header_title div",
    "#header_title.red div",
    0,30,50,20,0,0
)
set_background_colors_with_another_selector(
    ".header_floating_part ul.title li .side_bar",
    ".header_floating_part ul.title li:hover .side_bar",
    0,33,60,20,0,0
)
set_background_colors_with_another_selector(
    ".header_floating_part ul.identity li .side_bar",
    ".header_floating_part ul.identity li:hover .side_bar",
    60,43,60,12,0,0
)
set_background_colors_with_another_selector(
    ".header_floating_part ul.skills li .side_bar",
    ".header_floating_part ul.skills li:hover .side_bar",
    180,33,60,25,0,0
)
set_background_colors_with_another_selector(
    ".header_floating_part ul.weblog li .side_bar",
    ".header_floating_part ul.weblog li:hover .side_bar",
    270,33,60,12,0,0
)
}