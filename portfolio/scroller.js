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