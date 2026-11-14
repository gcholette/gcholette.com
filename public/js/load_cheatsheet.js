async function load(s) {
    const c = await fetch(s)
    let d = await c.text()

    d = parseCode(d)

    document.getElementById('content').innerHTML = d
    hljs.highlightAll();
    document.getElementById('content').innerHTML += `\n<a href="/g/articles.html"><< Back to cheatsheets</a>`
}

function parseCode(s) {
    return parseNASM(s)
}

function parseNASM(s) {
    const regex= /---------------------------------~<\]  NASM  \[>[\s\S]*?--------------------------------------------------------------------------------/sg
    const matches = s.matchAll(regex)

    let finalDocument = s

    for (const match of matches) {
        finalContents = `<pre><code class="x86asm">${match[0]}</code></pre>`//nasmFormatter(match[0])
        finalDocument = finalDocument.replace(match[0], finalContents)
    }

    return finalDocument

}

function nasmFormatter(s) {
    let finalCodeAsHtml = s

    const instructions = ['mov', 'xor', 'add']
    for (const i of instructions) {
        finalCodeAsHtml = finalCodeAsHtml.replaceAll(new RegExp(`${i}\\b`, "g"), `<span class="instruction">${i}</span>`)
    }

    const registers = ['rax', 'rbx', 'al']
    for (const i of registers) {
        finalCodeAsHtml = finalCodeAsHtml.replaceAll(new RegExp(`${i}\\b`, "g"), `<span class="register">${i}</span>`)
    }

    return finalCodeAsHtml
}
