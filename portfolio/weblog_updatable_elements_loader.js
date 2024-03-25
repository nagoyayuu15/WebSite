let weblog_index_obj;

async function load_elements(){
    let weblog_loaded = fetch("./weblog_index.json" + url_param_updated_at).then(data=>data.text()).then(text=>JSON.parse(text))
    .then(obj=>weblog_index_obj = obj)
    .then(async ()=>{
        load_tags()
        define_span()
        load_spans()
        await update_articles()
        return
    })
    await Promise.all([weblog_loaded,load_books()])
    return
}

function load_tags(){
    let all = document.querySelector(".feed.controler.tags .tag.all")
    all.addEventListener("click", update_articles)
    all.addEventListener("mouseover", update_articles)
    all.addEventListener("mouseout", update_articles)
    all.addEventListener("mousemove", update_articles)
    all.querySelector(".number_of_articles").innerHTML = weblog_index_obj.articles.length

    let tags_container = document.querySelector(".feed.controler.tags>ul")
    for(let elem of weblog_index_obj.all_tags){
        let li = document.createElement("li")
        li.classList.add("tag")
        li.classList.add("hash")
        li.classList.add("toggle")
        li.innerHTML = `<div class="tag_name">${elem}</div><div class="number_of_articles">0</div>`;

        li.addEventListener("mouseover",update_articles)
        li.addEventListener("click",update_articles)
        li.addEventListener("mousemove",update_articles)
        li.addEventListener("mouseout",update_articles)
        tags_container.appendChild(li)
    }
}

let update_article_number_indicator_for_tags_in_progress;
let update_article_number_indicator_for_tags_task_stack;
async function update_article_number_indicator_for_tags(){

    let time_stamp = new Date()
    update_article_number_indicator_for_tags_task_stack = time_stamp
    
    if(update_article_number_indicator_for_tags_in_progress!=null){
        await update_article_number_indicator_for_tags_in_progress
    }

    if (time_stamp != update_article_number_indicator_for_tags_task_stack){
        console.log("cancel:update_article_number_indicator_for_tags")
        return
    }

    const number_of_articles_in_span = document.querySelector(".feed.controler.tags .tag.all .number_of_articles")
    
    const update_promises = []

    let count = 0
    for (let div of document.querySelectorAll(".feed.controler.time .span li.selected .number_of_articles")){
        count += Number(div.innerHTML)
    }
    
    //only to animate
    update_promises.push(
        (async(count) => {
            const step=5
            for (let i=0;i<=step;i++) {
                number_of_articles_in_span.innerHTML = Math.round(count*(i/step))
                await new Promise(resolve=>setTimeout(resolve,20))
            }
        })(count)
    )

    const tags = document.querySelectorAll(".feed.controler.tags .tag.hash")
    for (let tag of tags){
        const closure = async ()=>{
            let count = 0
            for (let article of weblog_index_obj.articles) {
                count += article.tags.includes(tag.querySelector(".tag_name").innerHTML) && is_inspan(article.when)
                tag.querySelector(".number_of_articles").innerHTML = count
                await new Promise(resolve=>setTimeout(resolve,0))//allow blocking
            }
            return 
        }

        update_promises.push(closure())
    }

    update_article_number_indicator_for_tags_in_progress = Promise.all(update_promises)
    await update_article_number_indicator_for_tags_in_progress
    return
}

async function load_books(){
    let books = await fetch("./updatable/bookshelf.json"+url_param_updated_at).then(data=>data.text()).then(text=>JSON.parse(text))
    books.sort((book_a,book_b)=>{
        let a_when = new Number(structuredClone(book_a.when).replace("/",""))
        let b_when = new Number(structuredClone(book_b.when).replace("/",""))
        return a_when - b_when
    })
    let bookshelf = document.querySelector(".feed.feed_bookshelf")

    books.map(book=>{
        let a = document.createElement("a")
        a.classList.add("book")
        a.href=book.link
        a.id = book.id
        
        let h1=document.createElement("h1")
        h1.innerHTML=book.title
        let img=document.createElement("img")
        img.classList.add("binding")
        img.src=book.img
        let when=document.createElement("div")
        when.classList.add("when")
        when.innerHTML=book.when+"読了"
        let supplement=document.createElement("p")
        supplement.classList.add("supplement")
        supplement.innerHTML=book.supplement.join("")

        a.appendChild(h1)
        a.appendChild(img)
        a.appendChild(when)
        a.appendChild(supplement)

        bookshelf.appendChild(a)
    })
}
