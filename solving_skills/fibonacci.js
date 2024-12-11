function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}
console.log(fibonacci(6)) // Resultado: 8

//Problema: Este enfoque recalcula valores para el mismo n múltiples veces,
//lo que lo hace ineficiente (complejidad exponencial).

// Con Dynamic programming que consiste en resolver los subproblemas y conservar
//el resultado de los mismos y usando memoización
function fibonacciDP(n, memo = {}) {
  if (n <= 1) return n
  if (memo[n]) return memo[n] // Si ya lo calculamos, lo devolvemos
  memo[n] = fibonacciDP(n - 1, memo) + fibonacciDP(n - 2, memo)
  return memo[n]
}

console.log(fibonacciDP(6)) // Resultado: 8
//Ventaja: Con memoización, la complejidad se reduce a O(n), ya que cada
//subproblema se resuelve solo una vez.
