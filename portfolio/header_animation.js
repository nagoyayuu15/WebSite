function addEventListenerForToolBar(classname, color){
    let have_the_same_class = Array.from(document.getElementsByClassName(classname))
    let header_title = document.querySelector('#header_title')
    have_the_same_class.map(target => {
        target.addEventListener('mouseover', () => {
            have_the_same_class.filter(filtered => {
                return filtered.classList.contains('dropdown')
            }).map(shown => {
                shown.classList.replace('hidden','shown')
            })            
            have_the_same_class.map(target => {
                target.classList.replace('norm',color)
            })
            header_title.classList.replace('norm',color)
        })
        target.addEventListener('mouseleave', () => {
            have_the_same_class.filter(filtered => {
                return filtered.classList.contains('dropdown')
            }).map(hidden => {
                hidden.classList.replace('shown','hidden')
            })
            have_the_same_class.map(target => {
                target.classList.replace(color,'norm')
            })
            header_title.classList.replace(color,'norm')
        })
    });
}
