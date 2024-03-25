# 更新作業

updatable内の変更後 `web/uptodate.sh` を実行して更新。
cache対策、index更新を施す。

# 改名履歴

- hobby -> favorite
- carrier -> history
- index.html -> identity/html (後にindex.htmlは新たに作成)

# 動的読み込みの関係

(css,scriptの読み込みは記載を省略する)

~/portfolio/

- index.html
- updatable/to_be_copied.html
- identity.html
    - ### base_elements
    - header.html
    - header_floating_part.html
    - footer.html
        - updatable/contact.html
        - mark.svg
    - ### special elements for identity.html
    - circle.svg
    - face.jpg
    - updatable/
        - hobby.html
        - comment.html
        - identity.html
        - history.json
- skills.html
    - ### base_elements
    - header.html
    - header_floating_part.html
    - footer.html
        - updatable/contact.html
        - mark.svg
    - ### special elements for skills.html
    - ~/icon.svg
    - ts-logo-256.svg
    - github-mark-white.svg
    - GitHub_Logo_White.png
    - updatable/
        - abilities/*.html
        - products/*.html
- weblog.html
    - ### base_elements
    - header.html
    - header_floating_part.html
    - footer.html
        - updatable/contact.html
        - mark.svg
    - ### special elements for weblog.html
    - updatable/
        - boolshelf.json
        - weblog/*.html

# updatable要素の各種テンプレート

## hobby.html

ネストは2段階まで

```html
<ul>
    <li>
        カテゴリ1
        <ul>
            <li>内容1-1</li>
        </ul>
        <ul>
            <li>内容1-2</li>
        </ul>
    </li>
    <li>
        カテゴリ2
        <ul>
            <li>内容2-1</li>
        </ul>
        <ul>
            <li>内容2-2</li>
        </ul>
    </li>
</ul>
```

## comment.html

そのままpタグに埋め込まれる

## history.json

レコード一つのテンプレートは以下の通り

```json
    {
        "type":"",//trivial/important
        "when":"",//YYYY/MM
        "event":"",//string
        "supplement":[],//string[] 見やすくするために配列にしてあるが、結局空文字で結合される。改行する際は<br>を挿入する
        "link":{
            "href":null,//url/null リンク先のURL
            "text":null//string/null 表示されるテキスト
        }
    }
```

## identity.html

divタグに埋め込まれる。

## bookshelf.json

レコード一つのテンプレートは以下の通り

```json
{
    "title":"",//本のタイトル
    "id":"",
    "img":"",//url カバー画像のリンク先
    "when":"",//YYYY/MM読了日
    "supplement":[],//string[] 補足説明の文章
    "link":""//url パネルをクリックしたときのリンク先
}
```

## contact.html

divタグに埋め込まれる。
要見出し(pタグ)

## products/\*.html, abilities/\*.html

```html
<div class="button">
    ボタンのデザイン<!-- img styleなど -->
</div>
<div class="section">
    <h1>タイトル</h1>
    <p>
        本文
    </p>
    <a class="github" href="GitHubのリンク"><img src="./GitHub_Logo_White.png" alt="GitHub"><img src="./github-mark-white.svg"></a>
    <a href="それ以外のリンク">link</a>
</div>
```

## weblog/\*.html

```html
<div class="title">ブログのタイトル</div>
<div class="tags">tag1,tag2,tag3</div>
<div class="when">YYYY/MM/DD</div>
<div class="main">
    本文
</div>
```
