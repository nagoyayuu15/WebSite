async function load_elements() {
let identity = document.querySelector("div.anotation-content")
identity_done = fetch("./updatable/identity.html").then(data=>data.text()).then(html=>{
    identity.innerHTML = html
})

let hobby = document.querySelector(".feed_hobby .main")
hobby_done = fetch("./updatable/hobby.html").then(data=>data.text()).then(html=>{
    hobby.innerHTML = html
})

let comment = document.querySelector(".feed_comment .main")
comment_done = fetch("./updatable/comment.html").then(data=>data.text()).then(html=>{
    comment.innerHTML = html
})

let history = document.querySelector(".feed_carrier>ul")
let circle_svg=fetch("./circle.svg").then(data=>data.text())
let history_recodes = fetch("./updatable/history.json").then(data=>data.text()).then(json=>JSON.parse(json))
history_done = Promise.all([circle_svg,history_recodes]).then((res)=>{
    circle = res[0]
    obj = res[1]
    obj.map(
        recode => {
            li = document.createElement("li")
            li.classList.add(recode.type)
            
            img_wrapper = document.createElement("div")
            img_wrapper.classList.add("img_wrapper")
            img_wrapper.innerHTML = circle

            content = document.createElement("div")
            content.classList.add("recode")
            
            when = document.createElement("div")
            when.classList.add("when")
            when.innerHTML = recode.when ? recode.when : ""
            
            _event = document.createElement("div")
            _event.classList.add("event")
            _event.innerHTML = recode.event ? recode.event : ""
            
            supplement = document.createElement("div")
            supplement.classList.add("supplement")
            
            paragraph = document.createElement("p")
            paragraph.innerHTML = recode.supplement.join("")
            
            link = document.createElement("a")
            link.href = recode.link.href ? recode.link.href : ""
            link.innerHTML = recode.link.text ? recode.link.text : ""

            supplement.appendChild(paragraph)
            supplement.appendChild(link)

            content.appendChild(_event)
            content.appendChild(supplement)

            li.appendChild(img_wrapper)
            li.appendChild(when)
            li.appendChild(content)

            history.appendChild(li)
        }
    )
})

await Promise.all([identity_done,hobby_done,comment_done,history_done])
set_colors(".content>.feed_hobby>ul>li",55,48,35,6,5,5)
set_stroke_colors(".content>.feed_carrier>ul>li.important svg",55,38,68,6,5,1)
set_colors(".content>.feed h1",55,50,62,6,7,1)
}