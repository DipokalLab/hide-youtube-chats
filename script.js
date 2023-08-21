
class HideBox {
    constructor() {
        this.isMove = false
        this.position = { x: 0, y: 0 }
        this.clickPosition = { x: 0, y: 0 }
        this.createBox()
        this.box.addEventListener("mousedown", this.enableMove.bind(this))
        document.addEventListener("mouseup", this.disableMove.bind(this))
        document.addEventListener("mousemove", this.move.bind(this))

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

    updatePosition({ x, y }) {
        this.box.style.top = x - this.clickPosition.y + 'px'
        this.box.style.left = y - this.clickPosition.x + 'px'
    }

    move(e) {
        if (this.isMove == false) {
            return 0
        }

        console.log(e)

        this.updatePosition({ x:  e.clientY, y: e.clientX })
    }

    enableMove(e) {
        this.clickPosition.x = e.layerX
        this.clickPosition.y = e.layerY
        this.isMove = true
    }

    disableMove() {
        this.isMove = false
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

