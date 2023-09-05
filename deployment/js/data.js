import { split } from "./utility.js"



export const localValues = JSON.parse(localStorage.getItem('values'))
export const values = localValues || []

export const values_split = [split(values)]
export function splitValues() {
  values_split.push(split(values))
  if (values_split.length === 6) { values_split.shift() } //limit splits to 5
}

export const values_rank = [Object.fromEntries(values.map(value => [value, 0]))]
export function resetRank() {
  values_rank.push(Object.fromEntries(values.map(value => [value, 0])))
  if (values_rank.length === 2) { values_rank.shift() } //limit ranks to 1
}

export const savedRanking = JSON.parse(localStorage.getItem('saved_ranking'))
export const ranking = savedRanking || null