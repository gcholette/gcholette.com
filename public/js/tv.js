const getWindowWidth = () => {
    if (window.innerWidth > 1000) {
        return window.innerWidth / 3
    } else {
        return window.innerWidth / 2
    }
}

const getWindowHeight = () => {
    if (window.innerWidth > 1000) {
        return window.innerHeight / 2
    } else {
        return window.innerHeight
    }
}

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

let lastFrameTime = performance.now()

function tvLoop(currentFrameTime) {
    if (tv.sizeDirty) {
        canvas.width = tv.width
        canvas.height = tv.height
        tv.sizeDirty = false
    }

    if ((currentFrameTime - lastFrameTime) > (1000 / 18)) {
        lastFrameTime = currentFrameTime
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const buffer32 = new Uint32Array(imageData.data.buffer);

        for (let i = 0; i < buffer32.length; i++) {
            const rand = Math.random()
            if (rand < 0.02) buffer32[i] = 0x55550055
            else if (rand < 0.9) buffer32[i] = 0xff000000
            else buffer32[i] = 0x55555555;
        }

        ctx.putImageData(imageData, 0, 0);
        requestAnimationFrame(tvLoop);
    } else {
        requestAnimationFrame(tvLoop);
    }
}

tvLoop()
