import { navigateTo, render, resetVoting } from "../app.js"
import { values_split, values_rank } from "./data.js"
import { id } from "./utility.js"
// --------------------------------------------
import { generateRanking, archiveRanking } from "./Ranking.js"
import { renderArchive } from "./Archive.js"



export function vote(side) {
  values_rank.at(-1)[id(`${side}-vote-btn`).innerText]++
  render()
}



export function voting(status) {

  if (status === 'start') {
      id('left-vote-btn').disabled = false
      id('right-vote-btn').disabled = false

  }
  else if (status === 'end') {
      id('left-vote-btn').disabled = true
      id('right-vote-btn').disabled = true

      if (localStorage.getItem('saved_ranking')) {
        archiveRanking()
        renderArchive(0)
      }
      generateRanking()
        navigateTo('#ranking')
      resetVoting()

      id('left-vote-btn').textContent = 'voting'
      id('right-vote-btn').textContent = 'finished'
      id('start-voting').disabled = true
  }
  else if (status = 'reset') {
      id('left-vote-btn').disabled = true
      id('right-vote-btn').disabled = true
  }
}



export function renderVoting(round) {
  // load values on the voting pairs
  id('left-vote-btn').textContent = values_split.at(-1).l[round]
  id('right-vote-btn').textContent = values_split.at(-1).r[round]
}