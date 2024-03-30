async function load_elements(){
    let product_sections = document.querySelector(".products.instance .field")
    let ability_sections = document.querySelector(".abilities.instance .field")
    let product_buttons = document.querySelector(".products.hash .buttons")
    let ability_buttons = document.querySelector(".abilities.hash .buttons")

    let dummy_section = document.createElement("div")
    dummy_section.classList.add("section")
    dummy_section.classList.add("dummy")

    let src_for_abilities=get_all_files("./updatable/abilities/")
    let src_for_products=get_all_files("./updatable/products/")

    let abilities_loaded = src_for_abilities.then(arr=>
        Promise.all(arr.map(async (elem)=>{
            var container = document.createElement("div")
            string = await fetch("./updatable/abilities/"+elem+url_param_updated_at).then(data=>data.text())
            container.innerHTML=string
            button=container.querySelector(".button")
            button.setAttribute("jumpto",elem.split('.')[0])
            section=container.querySelector(".section")
            section.id = elem.split('.')[0]
            ability_buttons.appendChild(button)
            ability_sections.appendChild(section)
        })
    ))
    let products_loaded = src_for_products.then(arr=>
        Promise.all(arr.map(async (elem)=>{
            container = document.createElement("div")
            string = await fetch("./updatable/products/"+elem+url_param_updated_at).then(data=>data.text())
            container.innerHTML=string
            button=container.querySelector(".button")
            button.setAttribute("jumpto",elem.split('.')[0])
            section=container.querySelector(".section")
            section.id = elem.split('.')[0]
            product_buttons.appendChild(button)
            product_sections.appendChild(section)
        })
    ))

    await Promise.all([abilities_loaded,products_loaded])
    apply_scroller()
    product_sections.appendChild(dummy_section.cloneNode())
    ability_sections.appendChild(dummy_section.cloneNode())
    // set_background_colors_with_another_selector(".button",".button:hover",180,30,85,25,0,0)
    // set_colors(".section h1",180,30,30,25,0,0)
    return
}