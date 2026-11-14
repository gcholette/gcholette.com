async function load(s) {
    const c = await fetch(s)
    let d = await c.text()

    d = parseCode(d)

    document.getElementById('content').innerHTML = d
    document.getElementById('content').innerHTML += `\n<a href="/g/articles.html"><< Back to cheatsheets</a>`

    hljs.highlightAll();
}

function parseCode(s) {
    const regex= /-+\~<][\s\S]*?--------------------------------------------------------------------------------/sg
    const matches = s.matchAll(regex)

    let finalDocument = s

    for (const match of matches) {
        const splits = match[0].split("\n")
        const top = splits[0]
        const bottom = splits[splits.length-1]
        const code = splits.slice(1, -1).join("\n")
        let lang = undefined

        if (top.toLowerCase().includes('nasm')) lang = 'x86asm'
        if (top.toLowerCase().includes('python')) lang = 'python'
        if (top.toLowerCase().includes(' c ')) lang = 'c'
        if (top.toLowerCase().includes(' c++ ')) lang = 'cpp'

        finalContents = `${top}<pre><code class="language-${lang}">${code}</code></pre>${bottom}`//nasmFormatter(match[0])
        finalDocument = finalDocument.replace(match[0], finalContents)
    }

    return finalDocument

}
