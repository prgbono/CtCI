/* ¿Cuándo usar Two Pointers?
•	Cuando tienes un array ordenado.
•	Cuando necesitas optimizar la búsqueda de combinaciones (pares, tríos, etc.).
•	Problemas que involucran rangos, ventanas deslizantes o subsecuencias. */

// Problema: Dado un array y un número objetivo,
//encuentra si existen dos números cuya suma sea igual al objetivo.
const twoSum = (arr, target) => {
  const arraySorted = [...arr].sort((a, b) => a - b)
  let left = 0
  let right = arr.length - 1
  let sum = 0
  while (left < right) {
    sum = arraySorted[left] + arraySorted[right]
    if (sum === target) return [arraySorted[left], arraySorted[right]]
    else if (sum < target) left++
    else right--
  }
  return console.log('there is no pair')
}
// Este algoritmo tiene complejidad O(log n) debido al sort pero se podría convertir
// en O(n) usando un mapa hash así:
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

// Problema: Dado un array ordenado y un número objetivo,
//encuentra si existen dos números cuya suma sea igual al objetivo.
function twoSumSorted(arr, target) {
  let left = 0 // Puntero inicial
  let right = arr.length - 1 // Puntero final

  while (left < right) {
    const sum = arr[left] + arr[right]
    if (sum === target) {
      return [arr[left], arr[right]] // Pares encontrados
    } else if (sum < target) {
      left++ // Incrementar el puntero izquierdo
    } else {
      right-- // Decrementar el puntero derecho
    }
  }

  return null // No se encontró ningún par
}

console.log(twoSumSorted([1, 2, 3, 4, 6], 6)) // Output: [2, 4]

/*
Explicación del flujo:
•	Usa dos punteros: uno desde el principio y otro desde el final del array.
•	Si la suma es menor al objetivo, mueve el puntero izquierdo hacia la derecha (para aumentar la suma).
•	Si la suma es mayor al objetivo, mueve el puntero derecho hacia la izquierda (para disminuir la suma).

Complejidad:
	•	Tiempo: O(n) (recorre el array una sola vez).
	•	Espacio: O(1) (usa punteros, no memoria extra).
*/

// Detectar un palíndromo. Problema: Dado un string, verifica si es un palíndromo (se lee igual al derecho y al revés).
function isPalindrome(s) {
  let left = 0
  let right = s.length - 1

  while (left < right) {
    if (s[left] !== s[right]) {
      return false // No es palíndromo
    }
    left++ // Avanza el puntero izquierdo
    right-- // Retrocede el puntero derecho
  }

  return true // Es palíndromo
}

console.log(isPalindrome('racecar')) // Output: true
console.log(isPalindrome('hello')) // Output: false

/* Compara los caracteres desde ambos extremos.
	•	Si los caracteres no coinciden, no es un palíndromo.
	•	Avanza ambos punteros hacia el centro del string. */

//Ejemplo 3: Encontrar la subcadena más larga sin caracteres repetidos
function longestSubstring(s) {
  let left = 0 // Puntero izquierdo
  let right = 0 // Puntero derecho
  let maxLength = 0
  const seen = new Set() // Almacena caracteres únicos

  while (right < s.length) {
    if (!seen.has(s[right])) {
      seen.add(s[right]) // Agregar carácter único
      maxLength = Math.max(maxLength, right - left + 1)
      right++ // Mover el puntero derecho
    } else {
      seen.delete(s[left]) // Eliminar carácter repetido
      left++ // Mover el puntero izquierdo
    }
  }

  return maxLength
}

console.log(longestSubstring('abcabcbb')) // Output: 3 (subcadena "abc")
console.log(longestSubstring('bbbbb')) // Output: 1 (subcadena "b")

// Explicación del flujo:
// 	•	Usa los punteros izquierdo y derecho para crear una “ventana deslizante”.
// 	•	Si el carácter es único, amplía la ventana moviendo el puntero derecho.
// 	•	Si hay un carácter repetido, mueve el puntero izquierdo hasta eliminarlo.

// Complejidad:
// 	•	Tiempo: O(n), ya que cada carácter se procesa una sola vez.
// 	•	Espacio: O(n), debido al uso del conjunto para almacenar caracteres.

// Problema: Fusiona dos arrays ordenados en uno solo, también ordenado.
function mergeSortedArrays(arr1, arr2) {
  let i = 0 // Puntero para arr1
  let j = 0 // Puntero para arr2
  const merged = []

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      merged.push(arr1[i])
      i++
    } else {
      merged.push(arr2[j])
      j++
    }
  }

  // Añade los elementos restantes
  while (i < arr1.length) merged.push(arr1[i++])
  while (j < arr2.length) merged.push(arr2[j++])

  return merged
}

console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6])) // Output: [1, 2, 3, 4, 5, 6]

// Explicación del flujo:
// 	•	Compara elementos desde el inicio de ambos arrays.
// 	•	Avanza el puntero del array que tiene el menor elemento.
// 	•	Cuando uno de los arrays se vacía, agrega los elementos restantes del otro.

// Complejidad:
// 	•	Tiempo: O(n + m), donde n y m son las longitudes de los arrays.
// 	•	Espacio: O(n + m), para almacenar el array fusionado.
