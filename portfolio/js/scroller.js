
function is_scrollable(element){
    style=window.getComputedStyle(element)
    return (
        style.getPropertyValue('overflow').split(' ').includes('scroll')||
        style.getPropertyValue('overflowX')=='scroll'||
        style.getPropertyValue('overflowY')=='scroll'
    )
}

function scroll_to(query) {
    try{
        let target = document.querySelector(query)
        var parent = target.parentElement
        while(
            parent.tagName != 'BODY' && !is_scrollable(parent)
        ){
            parent = parent.parentElement
        }
        let clientRectOfparent;
        if (parent.tagName == 'BODY'){
            parent=window
            clientRectOfparent = {
                left:0,
                top:0
            }
        }
        else{
            clientRectOfparent = parent.getBoundingClientRect()
        }
        let clientRectOftarget = target.getBoundingClientRect()
        parent.scrollBy(clientRectOftarget.left-clientRectOfparent.left,clientRectOftarget.top-clientRectOfparent.top)
    }
    catch(error){
        if (error instanceof TypeError){}
        else{throw error}
    }
}

function scroll_to_url_hash(hash=null) {
    try{
        hash = hash ? hash : window.location.hash
        hash.slice(1).split('#').map(
            anchor=>{
                if (anchor=='') {return}
                scroll_to('#'+anchor)
            }
        )
    }
    catch(error){
        if (error instanceof TypeError){}
        else{throw error}
    }
}

function apply_scroller() {
    Array.from(document.querySelectorAll(".button")).map(
        button => {
            button.addEventListener("click",()=>{
                scroll_to("#"+button.getAttribute("jumpto"))
            })
        }
    )
}
