function addEventListenerForToolBar(classname, color){
    let have_the_same_class = Array.from(document.getElementsByClassName(classname))
    let icon_img = document.querySelector('.header img')
    have_the_same_class.map(target => {
        target.addEventListener('mouseover', () => {
            have_the_same_class.filter(filtered => {
                return filtered.classList.contains('dropdown')
            }).map(shown => {
                shown.classList.replace('hidden','shown')
            })            
            have_the_same_class.map(target => {
                target.classList.add(color)
            })
            icon_img.classList.add(color)
        })
        target.addEventListener('mouseleave', () => {
            have_the_same_class.filter(filtered => {
                return filtered.classList.contains('dropdown')
            }).map(hidden => {
                hidden.classList.replace('shown','hidden')
            })
            have_the_same_class.map(target => {
                target.classList.remove(color)
            })
            icon_img.classList.remove(color)
        })
    });
}
