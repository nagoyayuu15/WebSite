let weblog_index_obj;

async function load_elements(){
    let weblog_loaded = fetch("./updatable/weblog/index.json").then(data=>data.text()).then(text=>JSON.parse(text))
    .then(obj=>weblog_index_obj = obj)
    .then(async ()=>{
        load_tags()
        define_span()
        load_spans()
    })
    await Promise.all([weblog_loaded,load_books()])
    return
}

function load_tags(){
    let all = document.querySelector(".feed.controler.tags .tag.all")
    all.addEventListener("click", update_articles)
    all.addEventListener("mouseover", update_articles)
    let tags_container = document.querySelector(".feed.controler.tags>ul")
    weblog_index_obj.all_tags.sort()
    weblog_index_obj.all_tags.forEach(elem => {
        let li = document.createElement("li")
        li.classList.add("tag")
        li.classList.add("hash")
        li.classList.add("toggle")
        li.innerHTML = elem
        li.addEventListener("click", update_articles)
        li.addEventListener("mouseover", update_articles)
        tags_container.appendChild(li)
    });
}

async function load_books(){
    let books = await fetch("./updatable/bookshelf.json").then(data=>data.text()).then(text=>JSON.parse(text))
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
