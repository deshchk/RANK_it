import { values_rank, ranking } from "./data.js"
import { id, query, unklassify } from "./utility.js"



export function generateRanking() {
  const values_sorted = Object.entries(values_rank.at(-1)).sort(([,a],[,b]) => b-a)

  const rankingHtml = values_sorted.map(value => {
    const [val, votes] = value, index = values_sorted.indexOf(value)
    return `
      <li class="
        group
        flex gap-x-4 justify-between items-center
        px-8 pt-2 pb-[9px]

        first:bg-amber-100
        [&:nth-of-type(2)]:bg-slate-50
        [&:nth-of-type(3)]:bg-slate-50
      ">
        <b class="
          font-bold
          ${votes === 0 ? 'text-neutral-400' : ''}
        ">${index+1}</b>
          <span class="
            group-first:font-semibold
            group-[:nth-of-type(2)]:font-medium
            group-[:nth-of-type(3)]:font-normal
            font-light

            truncate
            ${votes === 0 ? 'text-neutral-400' : ''}
          ">${val}</span>
        <i class="text-neutral-400 italic text-sm">${votes}</i>
      </li>
    `
  }).join('')

  id('ranking--list').innerHTML = rankingHtml

  id('ranking--date').innerHTML = `<i class="text-neutral-400">dated: </i>` + new Date().toLocaleDateString("pl-PL").replace(/\./g, '/')
  id('ranking--title').classList.add('done')

  if (!id('ranking--remove-btn')) {
    id('ranking').innerHTML += `
      <button id="ranking--remove-btn"
        class="
          outline-none border
          px-4 py-1 mr-auto
          text-xs text-neutral-500

          hover:border-red-500 hover:bg-red-50 hover:text-black
          focus:border-red-500 focus:bg-red-50 focus:text-black
          active:border-red-500 active:bg-red-50 active:text-black

          select-none
        "
      >
        remove this entry
      </button>
    `
  }
  
  localStorage.setItem('saved_ranking', JSON.stringify(id('ranking').innerHTML))
}



export function archiveRanking() {
  // BACKROOM EDITING
    id('backroom').innerHTML = JSON.parse(localStorage.getItem('saved_ranking'))
      query('#ranking--title', id('backroom')).remove()
        unklassify(query('#ranking--date', id('backroom')), 'hidden')
        query('#ranking--date', id('backroom')).classList.add('mb-1')
      query('#ranking--date', id('backroom')).removeAttribute('id')
      query('#ranking--list', id('backroom')).removeAttribute('id')
      query('#ranking--remove-btn', id('backroom')).dataset.remover = true
      query('#ranking--remove-btn', id('backroom')).removeAttribute('id')
  const ready = id('backroom').innerHTML

  id('backroom').innerHTML = ''

  const archive_array = JSON.parse(localStorage.getItem('ranking_archive')) || []
  archive_array.unshift(ready)
  localStorage.setItem('ranking_archive', JSON.stringify(archive_array))
}



export function removeRanking() {
  localStorage.removeItem('saved_ranking')
  renderRanking()
  id('ranking--remove-btn').remove()
}



export function renderRanking() {
  // show nothing or load the saved ranking from local storage
  if (!localStorage.getItem('saved_ranking')) {
    id('ranking--list').innerHTML = `
      <li class="italic text-neutral-300 self-center text-center">
        - finish voting to see your results -
      </li>
    `
    id('ranking--title').classList.remove('done')
  } else {
    id('ranking').innerHTML = ranking
  } 
}