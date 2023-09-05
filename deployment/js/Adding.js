import { render, resetVoting } from "../app.js"
import { values, splitValues } from "./data.js"
import { id } from "./utility.js"
// ------------------------------------------------------------------------------
import { dragStart, dragOver, dragDrop, dragEnter, dragLeave } from "./ddrop.js"
import { voting } from "./Voting.js"



export function add() {
  const input = id('adding--input').value

  if (
    input &&
      input.match(/\S{2,}/g) &&
      !input.match(/\d{2,}/g) &&
      !values.includes(input)
    ) {
    values.push(input.replace(/\s+/g, ' ').trim())
    localStorage.setItem('values', JSON.stringify(values))
    splitValues()
    render()
    resetVoting()
    voting('reset')
  } else { clear() }
  
  document.activeElement.blur()
}



export function addEventListeners(item) {
  item.addEventListener('dragstart', dragStart)
  item.addEventListener('dragover', dragOver)
  item.addEventListener('drop', dragDrop)
  item.addEventListener('dragenter', dragEnter)
  item.addEventListener('dragleave', dragLeave)
}



export function remove(targetID) {
  values.splice(targetID.split('-')[1], 1)
  localStorage.setItem('values', JSON.stringify(values))
  splitValues()
  render()
  resetVoting()
  voting('reset')
}



export function clear() {
  id('adding--input').value = ''
}



export function renderAdding() {
  // render nothing or values' list if there are some in the array/local storage
  if(values.length === 0) {
    id('adding--list').innerHTML = `
      <li class="italic text-neutral-300 self-center">- nothing yet -</li>
    `
  } else {
    const listHtml = values.map(value => {
      const index = values.indexOf(value)

      return `
        <li id="${index}"
          draggable="true"
          data-over="false"
          class="
            relative
            flex gap-x-3 justify-between items-center
            pl-10 pr-6 pt-2 pb-[9px]

            before:content-['⋅'] before:absolute before:left-5 before:text-neutral-300

            data-[over=true]:outline-dashed outline-neutral-400 outline-1
            data-[over=true]:text-neutral-300

            hover:bg-neutral-100
            active:bg-neutral-100
            focus-within:bg-neutral-100

            cursor-move select-none
          "
        >
          ${value}
          <button id="remove-${index}"
            class="
              outline-none
              text-neutral-400

              hover:text-red-500
              focus:text-red-500
              active:text-red-500

              pl-2 pr-[7px]
            "
          >⨉</button>
        </li>
      `
    }).join('')

    id('adding--list').innerHTML = listHtml

    // add event listeners to each value for drag and drop
    values.forEach(value => {
      const index = values.indexOf(value)
      addEventListeners(id(index))
    })
  }
}