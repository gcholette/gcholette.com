async function load(s) {
    const c = await fetch(s)
    let d = await c.text()

    const tags = [...d.matchAll(/\[~.*~\]/g, )]

    console.log(tags)

    tags.forEach(t => {
        const x = t[0]
        const link = x.match(/\/.*\.(jpg|png)/g)[0]
        const pictureLink = `/g/picture.html?pic=${link}`
        d = d.replace(x, `<a href="${pictureLink}">${x}</a>`)
    })

    document.getElementById('content').innerHTML = d
}