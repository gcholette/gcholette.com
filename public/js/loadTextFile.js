/**
 * Loads a ASCII (soon to be maybe ANSI?) .txt to parse and render it's content
 * to the page. 
 */

const CODE_SECTION_REGEX = /-+\~<][\s\S]*?--------------------------------------------------------------------------------/sg

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * @param {string} top 
 */
function inferHeaderLanguage(top) {
    const topLower = top.toLowerCase()
    if (topLower.includes('nasm')) return 'x86asm'
    if (topLower.includes('python repl')) return 'python-repl'
    if (topLower.includes('python')) return 'python'
    if (topLower.includes(' c ')) return 'c'
    if (topLower.includes(' c++ ')) return 'cpp'
    if (topLower.includes('gdb')) return 'bash'
    if (topLower.includes('bash')) return 'bash'
    if (topLower.includes('ghidra disassembly')) return 'c'
    if (topLower.includes('javascript')) return 'javascript'
    if (topLower.includes('typescript')) return 'typescript'

    return undefined
}

/**
 * @param {string} s 
 */
async function registerLanguages(s, hljs) {
    const matches = s.matchAll(CODE_SECTION_REGEX)
    const langs = []
    for (const match of matches) {
        const splits = match[0].split("\n")
        const top = splits[0]
        langs.push(inferHeaderLanguage(top))
    }

    const uniqueLangs = [...new Set(langs)].filter(x => x)
    for (const lang of uniqueLangs) {
        const def = await import(`/public/lib/highlight/es/languages/${lang}.min.js`)
        hljs.registerLanguage(lang, def.default);

    }
}

/**
 * @param {string} s 
 */
function parseCode(s) {
    const matches = s.matchAll(CODE_SECTION_REGEX)
    let finalDocument = s

    for (const match of matches) {
        const splits = match[0].split("\n")
        const top = splits[0]
        const bottom = splits[splits.length - 1]
        const code = splits.slice(1, -1).join("\n")
        const lang = inferHeaderLanguage(top)

        finalContents = `${top}<pre><code class="language-${lang}">${escapeHtml(code)}</code></pre>${bottom}`//nasmFormatter(match[0])
        console.log(code)
        finalDocument = finalDocument.replace(match[0], finalContents)
    }

    return finalDocument
}

/**
 * @param {string} s 
 */
function parseImageTags(s) {
    let d = s
    const tags = [...d.matchAll(/\[~.*~\]/g,)]

    tags.forEach(t => {
        const x = t[0]
        const link = x.match(/\/.*\.(jpg|png)/g)[0]
        const pictureLink = `/g/picture.html?pic=${link}`
        d = d.replace(x, `<a class="pic-link" href="${escapeHtml(pictureLink)}">${x}</a>`)
    })

    return d
}

/**
 * @param {string} s 
 */
async function load(s) {
    const fileRequest = await fetch(s)
    const originalText = await fileRequest.text()
    const mutatedText = parseImageTags(parseCode(originalText))

    // todo: safely interpolate code tags as innertext rather than innerhtml
    document.getElementById('content').innerHTML = mutatedText
    document.getElementById('content').innerHTML += `\n<a href="/g/articles.html"><< Back to cheatsheets</a>`

    document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="/public/lib/highlight/styles/base16/circus.css">`)

    const { default: hljs } = await import('/public/lib/highlight/es/core.js')
    await registerLanguages(originalText, hljs)
    hljs.highlightAll()
}
