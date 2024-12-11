// El objetivo es contar cuántas formas hay de llegar desde la esquina superior
// izquierda hasta la esquina inferior derecha de una cuadrícula,
//moviéndose solo hacia la derecha o hacia abajo.

function uniquePaths(m, n) {
  const dp = Array(m)
    .fill(0)
    .map(() => Array(n).fill(0))

  for (let i = 0; i < m; i++) dp[i][0] = 1 // Solo una forma de llegar a la primera columna
  for (let j = 0; j < n; j++) dp[0][j] = 1 // Solo una forma de llegar a la primera fila

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1] // Desde arriba o desde la izquierda
    }
  }

  return dp[m - 1][n - 1]
}

console.log(uniquePaths(3, 7)) // Resultado: 28
