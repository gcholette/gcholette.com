function loadPicture() {
    let pic = ""
    for (const [key, value] of mySearchParams.entries()) {
        if (key === "pic") {
            pic = value
        }
    }
}