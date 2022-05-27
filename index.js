const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const XField = document.getElementById("X")
const YField = document.getElementById("Y")
const widthField = document.getElementById("width")
const heightField = document.getElementById("height")
const addBtn = document.getElementById("add")
const clearBtn = document.getElementById("clear")
canvas.width = 600
canvas.height = 600

let currObj = null
let isMoving = false
let squares = []

window.onload = () => {
    if (localStorage.getItem('savedCanvas')) {
        squares = JSON.parse(localStorage.getItem('savedCanvas'))
    }
}


canvas.addEventListener('mousedown', e => {
    for (const square of squares) {
        if (e.offsetX > square.x && e.offsetX < square.width + square.x && e.offsetY > square.y && e.offsetY < square.height + square.y) {
            currObj = square
            isMoving = true
        }
    }
})

document.addEventListener('mouseup', () => {
    currObj = null
    isMoving = false
})

canvas.addEventListener('mousemove', e => {
    if (isMoving === true) {
        moveItem(e.movementX, e.movementY)
    }
})


function moveItem (dx, dy) {    
    currObj.x = currObj.x + dx
    currObj.y = currObj.y + dy
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (const square of squares) {
        ctx.fillStyle = 'rgb(54, 134, 180)';
        ctx.fillRect(square.x, square.y, square.width, square.height);
    }
    requestAnimationFrame(animate)
}

animate()

addBtn.addEventListener('click', (e) => {
    e.preventDefault()
    squares.push({
        x: Number(XField.value),
        y: Number(YField.value),
        width: Number(widthField.value),
        height: Number(heightField.value)
    })
})

clearBtn.addEventListener('click', (e) => {
    e.preventDefault()
    squares = []
})

window.onbeforeunload = () => {
    localStorage.setItem('savedCanvas', JSON.stringify(squares))
}