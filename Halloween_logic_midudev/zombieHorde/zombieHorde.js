const zombies = '242'
const humans = '334'

function battleHorde(zombies, humans) {
  let humanStrength = 0
  let zombieStrengh = 0

  if (zombies.length === humans.length) {
    for (let i = 0; i < zombies.length; i++) {
      humanStrength += Number(humans[i])
      zombieStrengh += Number(zombies[i])
    }

    const diff = Math.abs(Number(humanStrength - zombieStrengh))
    const letter = humanStrength > zombieStrengh ? 'h' : 'z'
    return diff === 0 ? 'x' : `${diff}${letter}`
  } else return 'zombies and humans are not equal'
}

// Another solution:
// function battleHorde(zombies, humans) {
//   let humanStrength = []
//   let zombieStrengh = []
//   const singleBattle = (z, h) => {
//     if (h > z) humanStrength.push(parseInt(h - z))
//     else zombieStrengh.push(parseInt(z - h))
//   }

//   if (zombies.length === humans.length) {
//     for (let i = 0; i < zombies.length; i++) {
//       singleBattle(zombies[i], humans[i])
//     }

//     const totalHuman = humanStrength.reduce((acc, current) => acc + current, 0)
//     const totalZombie = zombieStrengh.reduce((acc, current) => acc + current, 0)

//     if (totalHuman === totalZombie) return 'x'
//     return totalZombie > totalHuman
//       ? Math.abs(parseInt(totalHuman - totalZombie)) + 'z'
//       : Math.abs(parseInt(totalZombie - totalHuman)) + 'h'
//   } else return 'zombies and humans are not equal'
// }

console.log(battleHorde('242', '334')) // Expected output-> "2h"
console.log(battleHorde([1], [])) // Expected 'zombies and humans are not equal'
console.log(battleHorde([], [])) // Expected x
console.log(battleHorde([1, 3, 2], [3, 2, 1])) // Expected x
console.log(battleHorde([2, 0], [])) // Expected 'zombies and humans are not equal'
console.log(battleHorde('8989898999', '7779998811')) // Expected 20z
console.log(battleHorde('57685849323', '98765438965')) // Expected 10h
