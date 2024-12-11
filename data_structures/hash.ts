// Contar la frecuencia de palabras en un párrafo.
const wordFrequency = (str) => {
  const freq = {}
  for (let word of str.split(' ')) {
    freq[word] = (freq[word] || 0) + 1
  }
  return freq
}
console.log(wordFrequency('hello world hello'))
// Complejidad - Acceso por clave: O(1)

//
const charFrequency = (str) => {
  const map = new Map()
  for (let char of str) {
    map.set(char, (map.get(char) || 0) + 1)
  }
  return map
}
console.log(charFrequency('hello'))
// Map(4) { 'h' => 1, 'e' => 1, 'l' => 2, 'o' => 1 }
// Complejidad - Acceso por clave: O(1)

// Este algoritmo tiene complejidad O(log n) debido al sort pero se
// podría convertir en O(n) usando un mapa hash así:
const twoSum = (arr, target) => {
  const hash = new Map()
  let currentPotion
  let complement
  for (let i = 0; i < arr.length; i++) {
    complement = target - arr[i]
    if (hash.has(complement)) return [hash.get(complement), i]
    if (!hash.has(currentPotion)) hash.set(arr[i], i)
  }
  return console.log('there is no pair')
}
