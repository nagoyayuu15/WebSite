Array.from(document.querySelectorAll('.img_wrapper:has(>img[src$=".svg"])')).map(target => {
    fetch(target.children[0].src).then(src=>src.text()).then(html => {
        target.innerHTML = html
    })
})