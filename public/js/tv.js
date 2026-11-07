const getWindowWidth = () => window.innerWidth / 2
const getWindowHeight = () => window.innerHeight / 2

let tick = 0
const tv = {
    width: getWindowWidth(),
    height: getWindowHeight(),
    sizeDirty: true
}

function onChangeWindowSize() {
    const height = getWindowHeight()
    const width = getWindowWidth()
    tv.height = height
    tv.width = width
    tv.sizeDirty = true
}

const canvas = document.createElement("canvas");
document.body.append(canvas)
canvas.classList = "tv-snow"

window.addEventListener("resize", onChangeWindowSize);
const ctx = canvas.getContext('2d', { alpha: false });

function tvLoop() {
    if (tv.sizeDirty) {
        canvas.width = tv.width
        canvas.height = tv.height
        tv.sizeDirty = false
    }

    if (tick > 5) {
        tick = 0
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const buffer32 = new Uint32Array(imageData.data.buffer);

        for (let i = 0; i < buffer32.length; i++) {
            const rand = Math.random()
            if (rand < 0.10) buffer32[i] = 0xffff00ff
            else if (rand < 0.7) buffer32[i] = 0xff000000
            else buffer32[i] = 0xffffffff;
        }

        ctx.putImageData(imageData, 0, 0);
        requestAnimationFrame(tvLoop);
    } else {
        tick += 1
        requestAnimationFrame(tvLoop);
    }
}

tvLoop()
