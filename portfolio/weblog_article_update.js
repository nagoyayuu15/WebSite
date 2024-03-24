let last_state = "uninitialized"
let last_update = 0
let update_in_progress = false

async function update_articles(){
    if (update_in_progress) {
        last_update = new Date()
        return
    } else {
        update_in_progress = true
        last_update = new Date()
        while(new Date() - last_update < 100){
            await new Promise(resolve=>setTimeout(resolve, 80))
            console.log("waiting for another operation")
        }
        console.log("checking if differences exist")
        let valid_tags = get_valid_tags()
        let current_state = JSON.stringify(span)+valid_tags.join("")
        console.log("some differences: ", current_state!=last_state)
        if (current_state!=last_state){
            console.log("fetching sources")
            let article_fetch_promises = []
            for (let article_idx in weblog_index_obj.articles){
                let article = weblog_index_obj.articles[article_idx]
                if (is_inspan(article.when)){
                    console.log("timespan matched")
                    var valid_tag_included = false
                    for (let tag_idx in article.tags){
                        if (valid_tags.includes(article.tags[tag_idx])){
                            console.log("tag matched")
                            valid_tag_included = true
                            break;
                        }
                    }

                    if (valid_tag_included){
                        let article_ident = article.file.match(/\/(?<ident>[^\/]*)\.html$/).groups["ident"]//file name
                        article_fetch_promises.push(
                            fetch(article.file+url_param_updated_at).then(data=>data.text()).then(string=>new DOMParser().parseFromString(
                                string+"<div class=\"id\">"+article_ident+"</div>",
                            "text/html"))
                        )
                    }
                }
            }
            let article_container = document.querySelector(".feed.feed_weblog_articles .articles")
            let side_titles_container = document.querySelector(".float_weblog_titles>ul")
            side_titles_container.innerHTML = ""
            article_container.innerHTML = ""

            if (article_fetch_promises.length === 0) {
                let article = document.createElement("li")
                article.className = "article dummy"

                let p = document.createElement("div")
                p.innerHTML = "タグを選択して記事を表示"
                
                article.appendChild(p)

                article_container.appendChild(article)
            }else{
                await Promise.all(article_fetch_promises).then(articles=>{
                    articles.map(
                        article_proto=>{
                            let ident = article_proto.getElementsByClassName("id")[0].innerHTML

                            let article = document.createElement("li")
                            article.className = "article"
                            article.id = ident

                            let h1 = document.createElement("h1")
                            h1.innerHTML = article_proto.getElementsByClassName("title")[0].innerHTML
                            
                            let li = document.createElement("li")
                            li.innerHTML = article_proto.getElementsByClassName("title")[0].innerHTML
                            li.addEventListener("click",()=>{scroll_to_url_hash(hash="#"+ident)})
                            side_titles_container.appendChild(li)

                            let ul = document.createElement("ul")
                            ul.className = "tags"
                            article_proto.getElementsByClassName("tags")[0].innerText.split(",").map(
                                tag=>{
                                    let li = document.createElement("li")
                                    li.className = "tag hash"
                                    li.innerText = tag
                                    li.addEventListener("click",()=>activate_tag_exclusively(tag))
                                    ul.appendChild(li)
                                }
                            )

                            article.appendChild(h1)
                            article.appendChild(ul)
                            article.appendChild(article_proto.getElementsByClassName("when")[0])
                            article.appendChild(article_proto.getElementsByClassName("main")[0])

                            article_container.appendChild(article)
                        }
                    )
                }).then(()=>{
                    set_colors(".article h1",260, 30, 40, 30, 0, 0)
                    
                    set_background_colors(".article .tags li",250, 30, 90, 10, 0, 0)
                    set_colors(".article .tags li",280, 60, 50, 10, 0, 0)

                    set_colors_with_another_selector(".float_weblog_titles>ul>li",".float_weblog_titles>ul>li:hover",260, 100, 40, 30, 0, 0)
                })

                let dummy_article = document.createElement("div")
                dummy_article.className = "dummy article"
                article_container.appendChild(dummy_article)
            }
        }
        last_state = current_state
        update_in_progress = false
        return
    }
}

function get_valid_tags(){
    return Array.from(document.querySelectorAll(".feed.controler.tags .tag.hash.selected")).map(elem=>elem.innerText)
}

function activate_tag_exclusively(activate){
    Array.from(document.querySelectorAll(".feed.controler.tags>ul>li")).map(
        tag=>{
            if(tag.innerText==activate){
                tag.classList.add("selected")
            }else{
                tag.classList.remove("selected")
            }
        }
    )
    update_articles()
}