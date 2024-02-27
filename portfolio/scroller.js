
function scroll_to(query) {
    let target = document.querySelector(query)
    if (!target) {return;}
    let parent = target.parentElement
    clientRectOfparent = parent.getBoundingClientRect()
    clientRectOftarget = target.getBoundingClientRect()
    parent.scrollBy(clientRectOftarget.left-clientRectOfparent.left,clientRectOftarget.top-clientRectOfparent.top)
}

function scroll_to_url_hash() {
    if(!window.location.hash){return;}
    let target = document.querySelector(window.location.hash)
    if (!target){return;}
    clientRectOftarget = target.getBoundingClientRect()
    window.scrollTo(clientRectOftarget.left,clientRectOftarget.top)
}

function apply_scroller() {
    Array.from(document.querySelectorAll(".button")).map(
        button => {
            let target = document.getElementById(button.getAttribute("jumpto"))
            if (!target) {return;}
            let parent = target.parentElement

            button.addEventListener("click",()=>{
                clientRectOfparent = parent.getBoundingClientRect()
                clientRectOftarget = target.getBoundingClientRect()
                parent.scrollBy(clientRectOfparent.left,clientRectOftarget.top-clientRectOfparent.top)
            })
        }
    )
}
