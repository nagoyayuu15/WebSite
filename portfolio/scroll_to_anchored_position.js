function apply_scroller() {
    Array.from(document.querySelectorAll("a[href^='#']")).map(
        anchor=>{
            console.log(document.getElementById(anchor.href));
        }
    )
}