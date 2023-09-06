import { getArchivePage, id } from "./utility.js"



export function renderArchive(index) {
  const archive = JSON.parse(localStorage.getItem('ranking_archive')) || false
  const page = index+1
  if (archive[index]) {
    id('past-ranking').innerHTML = `
      <div class="flex flex-col gap-6">
        ${archive[index]}
      </div>
    `

    id('archive--page').innerText = page
    if (archive.length > 2) {
      id('archive--next-btn').disabled = false
    }

		if (page <= 1) {
			id('archive--prev-btn').disabled = true
		}
    if (page >= archive.length) {
			id('archive--next-btn').disabled = true
		}

    if (page === 2) {
			id('archive--prev-btn').disabled = false
		}
    if (page < archive.length) {
			id('archive--next-btn').disabled = false
		}
		
  } else {
    id('past-ranking').innerHTML = `
      <div class="flex flex-col gap-4">
        <span class="italic text-neutral-300 text-center">- nothing in here yet -</span>
      </div>
    `

    id('archive--page').innerText = '-'
  }
}


export function removeArchive() {
  const index = Number(id('archive--page').innerText)-1
  const archive = JSON.parse(localStorage.getItem('ranking_archive'))
  const update = archive.toSpliced(index, 1)
  localStorage.setItem('ranking_archive', JSON.stringify(update))

  id('archive--page').innerText = (archive.length > 1) ?
    getArchivePage() - 1 : 
    1
    
  renderArchive(
    (getArchivePage() - 1 < 0) ?
      getArchivePage() :
      getArchivePage() - 1
  )

  if (update.length === 0) {
    id('past-ranking').dataset.loaded = false
  }
}