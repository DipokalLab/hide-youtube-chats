
class HideBox {
    constructor() {
        this.isMove = false
        this.isResize = false
        this.targetResize = ''

        this.position = { x: 0, y: 0 }
        this.clickPosition = { x: 0, y: 0 }
        this.size = { w: 100, h: 100 }
        this.originSize = { w: 100, h: 100, x: 0, y: 0 }

        this.createBox()
        this.box.addEventListener("mousedown", this.enableMove.bind(this))
        document.addEventListener("mouseup", this.disableMove.bind(this))
        document.addEventListener("mousemove", this.move.bind(this))
        document.addEventListener("mousemove", this.resize.bind(this))
        document.addEventListener("mouseup", this.disableResize.bind(this))

    }

    createBox() {
        this.root = document.createElement("div")
        this.root.style.position = 'absolute'
        this.root.style.top = '0px'
        this.root.style.left = '0px'
        this.root.style.width = '100px'
        this.root.style.height = '100px'
        this.root.style.zIndex = '10000000000'

        this.box = document.createElement("div")
        this.box.style.backgroundColor = '#161617'
        this.box.style.position = 'absolute'
        this.box.style.top = '0px'
        this.box.style.left = '0px'
        this.box.style.width = '100%'
        this.box.style.height = '100%'
        this.box.style.zIndex = '10000000000'
        this.box.style.cursor = 'grab'

        const resizeStyleConfig = [
            { w: '100%', h: '1rem', x: '0px', y: '-1rem', ref: 'top', cursorStyle: 'ns-resize' },
            { w: '100%', h: '1rem', x: '0px', y: '100%', ref: 'bottom', cursorStyle: 'ns-resize' },
            { w: '1rem', h: '100%', x: '-1rem', y: '0px', ref: 'left', cursorStyle: 'ew-resize' },
            { w: '1rem', h: '100%', x: '100%', y: '0px', ref: 'right', cursorStyle: 'ew-resize' },
            { w: '1rem', h: '1rem', x: '-1rem', y: '-1rem', ref: 'top-left', cursorStyle: 'nwse-resize' },
            { w: '1rem', h: '1rem', x: '100%', y: '-1rem', ref: 'top-right', cursorStyle: 'nesw-resize' },
            { w: '1rem', h: '1rem', x: '-1rem', y: '100%', ref: 'bottom-left', cursorStyle: 'nesw-resize' },
            { w: '1rem', h: '1rem', x: '100%', y: '100%', ref: 'bottom-right', cursorStyle: 'nwse-resize' }
        ]
    
        this.root.appendChild(this.box)
        for (let index = 0; index < resizeStyleConfig.length; index++) {
            const element = resizeStyleConfig[index];
            const resize = this.createResize(element)
            this.root.appendChild(resize)
        }   
    }

    createResize({ w, h, x, y, ref, cursorStyle }) {
        let resize = document.createElement("div")
        resize.style.position = 'absolute'
        resize.style.top = y
        resize.style.left = x
        resize.style.width = w
        resize.style.height = h
        resize.style.backgroundColor = '#161617'
        resize.style.cursor = cursorStyle
        resize.setAttribute("ref", ref)

        resize.addEventListener("mousedown", this.enableResize.bind(this))

        return resize
    }

    updatePosition({ x, y }) {
        this.root.style.top = x - this.clickPosition.y + 'px'
        this.root.style.left = y - this.clickPosition.x + 'px'
    }

    updateSize({ w, h, x, y }) {
        this.root.style.width = `${w}px`
        this.root.style.height =  `${h}px`
        this.root.style.top =  `${y}px`
        this.root.style.left =  `${x}px`

    }

    resize(e) {
        if (this.isResize == false) {
            return 0
        }
        this.disableMove()

        let h = e.clientY - this.clickPosition.y
        let w = e.clientX - this.clickPosition.x

        const resizeFunctionList = {
            top: () => {this.resizePosition({ w: 0, h: -h, x: 0, y: h })},
            bottom: () => {this.resizePosition({ w: 0, h: h, x: 0, y: 0 })},
            left: () => {this.resizePosition({ w: -w, h: 0, x: w, y: 0 })},
            right: () => {this.resizePosition({ w: w, h: 0, x: 0, y: 0 })},
            topleft:  () => {this.resizePosition({ w: -w, h: -h, x: w, y: h })},
            topright: () => {this.resizePosition({ w: w, h: -h, x: 0, y: h })},
            bottomleft: () => {this.resizePosition({ w: -w, h: h, x: w, y: 0 })},
            bottomright: () => {this.resizePosition({ w: w, h: h, x: 0, y: 0 })}
        }

        resizeFunctionList[this.targetResize.replace('-', '')]()
    }

    resizePosition({ h, w, x, y }) {
        this.updateSize({ 
            w: this.originSize.w + w, 
            h: this.originSize.h + h,
            x: this.originSize.x + x,
            y: this.originSize.y + y
        })
    }

    enableResize(e) {
        this.clickPosition.x = e.clientX
        this.clickPosition.y = e.clientY
        this.originSize.w = Number(this.root.style.width.split('px')[0])
        this.originSize.h = Number(this.root.style.height.split('px')[0])
        this.originSize.x = Number(this.root.style.left.split('px')[0])
        this.originSize.y = Number(this.root.style.top.split('px')[0])

        this.targetResize = e.target.getAttribute('ref')
        this.isResize = true
    }

    disableResize() {
        this.isResize = false
    }

    move(e) {
        if (this.isMove == false) {
            return 0
        }

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
        return this.root
    }
}


window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const box = new HideBox()
        document.querySelector("html").insertAdjacentElement("beforeend", box.render())

    }, 1000);

});

