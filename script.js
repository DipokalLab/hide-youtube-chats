
class HideBox {
    constructor() {
        this.createBox()
    }

    createBox() {
        this.box = document.createElement("div")
        this.box.style.backgroundColor = '#ffffff'
        this.box.style.position = 'absolute'
        this.box.style.top = '0px'
        this.box.style.left = '0px'
        this.box.style.width = '100px'
        this.box.style.height = '100px'
        this.box.style.zIndex = '10000000000'
    }


    render() {
        return this.box
    }
}

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const box = new HideBox()
        document.querySelector("html").insertAdjacentElement("beforeend", box.render())
    }, 1000);

});

