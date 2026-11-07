async function load(s) {
    const c = await fetch(s)
    const d = await c.text()
    document.getElementById('content').innerText = d
}