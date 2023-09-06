import { render } from "../app.js"
import { values } from "./data.js"
import { id } from "./utility.js"

let draggedAt
let dropAt

export function dragStart() {
  draggedAt = this.id
}

export function dragOver(e) {
  e.preventDefault()
}

export function dragDrop() {
  dropAt = this.id

  values.splice(dropAt, 0, values.splice(draggedAt, 1)[0])
  localStorage.setItem('values', JSON.stringify(values))
  render()
}

let counter = 0
export function dragEnter() {
  counter++
  const listItems = id('adding--list').querySelectorAll('li')
  listItems.forEach(item => {
    item.dataset.over = false
  })
  this.dataset.over = true
}

export function dragLeave() {
  counter--
  if (counter === 0) {
    this.dataset.over = false
  }
}