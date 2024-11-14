function findTheKiller(whisper, suspects) {
  const removeDuplicateSuspects = [...new Set(suspects)]
  const normalisedWhisper = whisper.toLowerCase()

  const isExactMatch = normalisedWhisper.endsWith('$')

  const matchesPattern = (suspect) => {
    const normalisedSuspect = suspect.toLowerCase()
    const whisperToCompare = isExactMatch
      ? normalisedWhisper.slice(0, -1)
      : normalisedWhisper

    if (isExactMatch && whisperToCompare.length !== normalisedSuspect.length)
      return false

    return [...whisperToCompare].every((char, index) => {
      return char === normalisedSuspect[index] || char === '~'
    })
  }

  const matchingSuspects = removeDuplicateSuspects.filter(matchesPattern)
  // console.log(matchingSuspects)
  // return matchingSuspects

  return matchingSuspects.join(',')
}

const whisper = 'd~~~~~a'
const suspects = [
  'Dracula',
  'Freddy Krueger',
  'Jason Voorhees',
  'Michael Myers'
]
console.log(findTheKiller(whisper, suspects)) // -> Expected 'Dracula'

// const whisper2 = '~r~dd~'
// const suspects2 = ['Freddy', 'Freddier', 'Fredderic']
// console.log(findTheKiller(whisper2, suspects2)) // -> Expected 'Freddy,Freddier,Fredderic'

// const whisper3 = '~r~dd$'
// const suspects3 = ['Freddy', 'Freddier', 'Fredderic']
// console.log(findTheKiller(whisper3, suspects3)) // -> Expected ''

// const whisper4 = 'mi~~def'
// const suspects4 = ['Midudev', 'Midu', 'Madeval']
// console.log(findTheKiller(whisper4, suspects4)) // -> Expected ''
