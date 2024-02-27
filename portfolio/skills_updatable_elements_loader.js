async function load_elements(){
    src_for_abilities = get_all_files("./updatable/abilities/")
    src_for_products = get_all_files("./updatable/products/")

    src_for_abilities.then(arr=>{
        console.log(arr)       
    })
    src_for_products.then(arr=>{
        console.log(arr)       
    })

    set_background_colors_with_another_selector(".button",".button:hover",180,30,85,25,0,0)
}