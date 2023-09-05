import { render } from "../app.js"
import { values } from "./data.js"

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

export function dragEnter() {
  this.dataset.over = true
}

export function dragLeave() {
  this.dataset.over = false
}