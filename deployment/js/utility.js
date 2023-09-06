export const id = DOMid => document.getElementById(DOMid)
export const query = (selector, el) => el.querySelector(selector)
export const klassify = (el, klass) => el.classList.add(klass)
export const unklassify = (el, klass) => el.classList.remove(klass)
export const percentOf = (at, of) => Math.floor((at*100)/of)
export const shuffle = arr => {
  let amount = arr.length, random

  while (amount > 0) {
    random = Math.floor(Math.random() * amount)
    amount--
    [arr[amount], arr[random]] = [arr[random], arr[amount]]
  }
  return arr
}
// pair all elements of an array with each other and put a slash '/' between them
export const pair = arr => arr.flatMap((val, i) => arr.slice(i+1).map(rest => val + '/' + rest))
// split a string into two parts and return just one
export const slash = (el, part) => el.replace(/(\D*)(?:\/)(\S+\D*)/g, `$${part}`)


// split an array into parallel and randomly paired arrays
export const split = arr => {
  let pairs = shuffle(pair(arr))
  let left = []
  let right = []

  pairs.forEach(pair => {
    const r = Math.floor(Math.random() * 2)

    if (r === 1) {
      left.push(slash(pair, 1))
      right.push(slash(pair, 2))
    } else {
      left.push(slash(pair, 2))
      right.push(slash(pair, 1))
    }
  })

  console.log(left, right)

  return { l: left, r: right }
}

// APP SPECIFIC
export const getArchivePage = () => Number(id('archive--page').innerText)