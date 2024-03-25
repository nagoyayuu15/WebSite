
function define_span(){
    let earliest_date = earliest()
    earliest_date.setDate(1)
    earliest_date.setMonth(0)
    let latest_date = latest()
    latest_date.setDate(1)
    latest_date.setMonth(11)
    let current = earliest_date
    while(current<=latest_date){
        span[current] = true
        current.setMonth(current.getMonth()+1)
    }
}

function load_spans(){
    load_spans_for_all()
    load_spans_for(12)
    load_spans_for(6)
    load_spans_for(1)
    apply_scale_button()
}

function load_spans_for_all(){
    let span_container = document.querySelector(".span>ul")

    let li = document.createElement("li")

    let earliest_date = earliest()
    let latest_date = latest()

    li.className = "button toggle all selected"
    li.innerHTML = `<div class="span_range">${earliest_date.getFullYear()}-${latest_date.getFullYear()}</div><div class="number_of_articles">0</div>`
    li.querySelector(".number_of_articles").innerHTML = weblog_index_obj.articles.length

    bind_button_with_span(li,(bool)=>change_all_span(bool))
    li.addEventListener("mouseover",update_articles)
    li.addEventListener("click",update_articles)

    span_container.appendChild(li)
}
function load_spans_for(month){
    let span_container = document.querySelector(".span>ul")

    let earliest_date = earliest()
    earliest_date.setDate(1)
    earliest_date.setMonth(0)
    let latest_date = latest()
    latest_date.setDate(1)
    latest_date.setMonth(11)
    var current = earliest_date
    while(current<=latest_date){
        let next = structuredClone(current)
        next.setMonth(current.getMonth()+month)
        let li = document.createElement("li")
        li.className = "button toggle m" + month
        if (month == 1){
            li.innerHTML = `<div class="span_range">${current.getFullYear()}/${current.getMonth()+1}</div><div class="number_of_articles">0</div>`
        }else{
            li.innerHTML = `<div class="span_range">${current.getFullYear()}/${current.getMonth()+1}-${current.getMonth()+month}</div><div class="number_of_articles">0</div>`
        }

        (async()=>{
            var count = 0
            for (let article of weblog_index_obj.articles) {
                setTimeout(1)
                let date = date_parser(article.when)
                count += current <= date && date < next
                li.querySelector(".number_of_articles").innerHTML = count
            }
        })();

        let binded_span = structuredClone(current)
        bind_button_with_span(li,(bool)=>change_span(binded_span,month,bool))
        li.addEventListener("mouseover",update_articles)
        li.addEventListener("click",update_articles)
        current = next

        span_container.appendChild(li)

    }
}

function bind_button_with_span(button, changer){
    async function change(){
        await new Promise(resolve => setTimeout(resolve, 10))
        if (button.classList.contains("selected")){
            changer(true)
        } else {
            changer(false)
        }
    }
    button.addEventListener("mousedown",change)
    button.addEventListener("mouseover",change)
}

function change_all_span(bool){
    for (let key in span) {span[key] = bool}
}

function change_span(from, month, bool){
    let to = structuredClone(from)
    to.setMonth(to.getMonth()+month)
    for (let key in span) {
        key = new Date(key)
        if (from <= key && key < to){
            span[key] = bool
        }
    }
}

function apply_scale_button(){
    let scale_buttons = document.querySelectorAll(".feed.time.controler .scale .button")
    let span_buttons = document.querySelectorAll(".feed.time.controler .span .button")

    function hide_except(cls){
        change_all_span(false)
        Array.from(span_buttons).map(
            button=>{
                if(button.classList.contains(cls)){
                    button.style.display = ""
                    if (cls=="all") {
                        button.classList.add("selected")
                        change_all_span(true)
                    }
                }else{
                    button.style.display = "none"
                    button.classList.remove("selected")
                }
            }
        )
    }
    
    // m1 m6 m12 all ...
    Array.from(scale_buttons)
    .map(
        button=>{
            let cls = button.className.split(" ")
            .filter(val=>{
                return !["button","selected"].includes(val)
            })[0]
            button.addEventListener("click",()=>hide_except(cls))
            button.addEventListener("click",update_articles)
        }
    )

    hide_except("all")
}