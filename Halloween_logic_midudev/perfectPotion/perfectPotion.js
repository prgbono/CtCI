const potions = [4, 5, 6, 2]
const goal = 8

function createMagicPotion(potions, target) {
  const seen = new Map()

  for (let currentIndex = 0; currentIndex < potions.length; currentIndex++) {
    const currentPotion = potions[currentIndex]
    const complement = target - currentPotion

    if (seen.has(complement)) return [seen.get(complement), currentIndex]
    if (!seen.has(currentPotion)) seen.set(currentPotion, currentIndex)
  }

  // Not needed, a function by default returns undefined
  // return undefined
}

console.log(createMagicPotion(potions, goal)) // expected
console.log(createMagicPotion([1, -2, 3, -4, 5], -1)) // expected [0,1]
console.log(createMagicPotion([], 10)) // expected undefined
console.log(createMagicPotion([10, 20, 30, 40], 50)) // expected [1,2]
console.log(createMagicPotion([3, 3, 0], 3)) // expected [0,2]

/* 
Another solution using seen as an object ({}) instead of a Map()
function createMagicPotion(potions, target) {
  const seen = {}

  for (let currentIndex = 0; currentIndex < potions.length; currentIndex++) {
    const complement = target - potions[currentIndex]

    if (seen[complement] !== undefined) {
      return [seen[complement], currentIndex]
    }

    seen[potions[currentIndex]] = currentIndex
  }

}
*/
