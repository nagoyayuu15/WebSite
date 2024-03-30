function apply_toggle() {
    let targets = Array.from(document.querySelectorAll(".toggle"))
    targets.map(elem=>{
        elem.addEventListener("mousedown",()=>{
            elem.classList.toggle("selected")
        })
        elem.addEventListener("mouseover",(ev)=>{
            if(ev.buttons==1){
                elem.classList.toggle("selected")
            }
        })
    })
}

function apply_singleton(query) {
    let targets = Array.from(document.querySelectorAll(query))
    targets.forEach(elem=>{
        elem.addEventListener("click",()=>{
            targets.forEach(ot_elem=>ot_elem.classList.remove("selected"))
            elem.classList.add("selected")
        })
    })
}

function apply_all_button(for_all_button, query_for_targets) {
    let targets = Array.from(document.querySelectorAll(query_for_targets))
    let all_button = document.querySelector(for_all_button)
    
    all_button.addEventListener("mousedown",()=>{
        if (all_button.classList.contains("selected")){
            all_button.classList.remove("selected")
            targets.map(elem=>elem.classList.remove("selected"))
        } else {
            all_button.classList.add("selected")
            targets.map(elem=>elem.classList.add("selected"))
        }
    })

    all_button.addEventListener("mouseover",(ev)=>{
        if(ev.buttons==1){
            if (all_button.classList.contains("selected")){
                all_button.classList.remove("selected")
                targets.map(elem=>elem.classList.remove("selected"))
            } else {
                all_button.classList.add("selected")
                targets.map(elem=>elem.classList.add("selected"))
            }
        }
    })
}