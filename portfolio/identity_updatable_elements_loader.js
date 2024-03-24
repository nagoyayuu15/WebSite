async function load_elements() {

let identity = document.querySelector("div.anotation-content")
let identity_done = fetch("./updatable/identity.html" + url_param_updated_at).then(data=>data.text()).then(html=>{
    identity.innerHTML = html
})

let hobby = document.querySelector(".feed_hobby .main")
let hobby_done = fetch("./updatable/hobby.html" + url_param_updated_at).then(data=>data.text()).then(html=>{
    hobby.innerHTML = html
})

let comment = document.querySelector(".feed_comment .main")
let comment_done = fetch("./updatable/comment.html" + url_param_updated_at).then(data=>data.text()).then(html=>{
    comment.innerHTML = html
})

let history = document.querySelector(".feed_carrier>ul")
let circle_svg=fetch("./circle.svg").then(data=>data.text())
let history_recodes = fetch("./updatable/history.json" + url_param_updated_at).then(data=>data.text()).then(json=>JSON.parse(json))
let history_done = Promise.all([circle_svg,history_recodes]).then((res)=>{
    let circle = res[0]
    let obj = res[1]
    obj.map(
        recode => {
            let li = document.createElement("li")
            li.classList.add(recode.type)
            
            let img_wrapper = document.createElement("div")
            img_wrapper.classList.add("img_wrapper")
            img_wrapper.innerHTML = circle

            let content = document.createElement("div")
            content.classList.add("recode")
            
            let when = document.createElement("div")
            when.classList.add("when")
            when.innerHTML = recode.when ? recode.when : ""
            
            let _event = document.createElement("div")
            _event.classList.add("event")
            _event.innerHTML = recode.event ? recode.event : ""
            
            let supplement = document.createElement("div")
            supplement.classList.add("supplement")
            
            let paragraph = document.createElement("p")
            paragraph.innerHTML = recode.supplement.join("")
            
            let link = document.createElement("a")
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
return
}