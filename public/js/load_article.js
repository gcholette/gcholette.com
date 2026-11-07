async function load(s) {
    const c = await fetch(s)
    let d = await c.text()
    const tags = [...d.matchAll(/\[~.*~\]/g,)]

    console.info(`load("${s}")`)

    const showImages = !!window.shouldLoadImagesInArticles

    tags.forEach(t => {
        const x = t[0]
        const link = x.match(/\/.*\.(jpg|png)/g)[0]
        const pictureLink = `/g/picture.html?pic=${link}`

        if (showImages) {
            d = d.replace(x, `
<center>
<img src="${link}" />
</center>
`)
        } else {
            d = d.replace(x, `<a class="pic-link" href="${pictureLink}">${x}</a>`)
        }
    })

    document.getElementById('content').innerHTML = d
    document.getElementById('content').innerHTML += `\n<a href="/g/articles.html"><< Back to articles</a>`
}