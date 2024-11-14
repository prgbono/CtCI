function findSafestPath(dream) {
  const numRows = dream.length
  const numCols = dream[0].length
  console.log({ numRows, numCols })

  const dangerLevel = []
  dangerLevel[0] = dream[0][0]
  console.log('Level 0: ', { dangerLevel })

  // Este bucle recorre la primera fila
  for (let col = 1; col < numCols; col++) {
    dangerLevel[col] = dangerLevel[col - 1] + dream[0][col]
  }

  console.log('Level 1: ', { dangerLevel })

  for (let row = 1; row < numRows; row++) {
    dangerLevel[0] += dream[row][0]
    console.log('Level 2: ', { dangerLevel })

    for (let col = 1; col < numCols; col++) {
      dangerLevel[col] =
        Math.min(dangerLevel[col], dangerLevel[col - 1]) + dream[row][col]
    }
  }

  console.log('Level 3: ', { dangerLevel })

  return dangerLevel[numCols - 1]
}

/* 
Esta función realiza un cálculo de camino mínimo en una cuadrícula 2D usando programación dinámica:
	•	Inicializa los peligros acumulados de la primera fila.
	•	Luego, para cada celda en el resto de la cuadrícula, decide el camino de menor peligro acumulado.
	•	Finalmente, devuelve el peligro mínimo acumulado para llegar a la esquina inferior derecha.

Esta técnica es común en problemas de caminos mínimos en cuadrículas o grafos, y optimiza el cálculo evitando recalcular caminos previos.
*/

/* Explicación:
Paso 1: Inicializar Variables
const numRows = dream.length
const numCols = dream[0].length

Paso 2: Inicializar el Nivel de Peligro de la Primera Fila
const dangerLevel = []
dangerLevel[0] = dream[0][0]
Aquí creamos un array llamado dangerLevel, que irá almacenando el peligro acumulado para cada posición de la cuadrícula a medida que avanzamos. 
dangerLevel[0] empieza con el valor de dream[0][0], el primer elemento en la esquina superior izquierda de la cuadrícula.

En nuestro ejemplo:
	•	dangerLevel[0] sería 1, ya que dream[0][0] es 1.

Paso 3: Peligro Acumulado para la Primera Fila
for (let col = 1; col < numCols; col++) {
  dangerLevel[col] = dangerLevel[col - 1] + dream[0][col]
}

Este bucle calcula el peligro acumulado para avanzar por la primera fila. 
La única forma de avanzar en esta fila es de izquierda a derecha, por lo que en cada paso sumamos el valor de la celda actual (dream[0][col]) al 
nivel de peligro acumulado desde la columna anterior (dangerLevel[col - 1]).
	•	Ejemplo:
	•	dangerLevel[0] ya es 1.
	•	dangerLevel[1] será 1 + 3 = 4 (celdas [0][0] a [0][1]).
	•	dangerLevel[2] será 4 + 1 = 5 (celdas [0][0] a [0][2]).

Después de este paso, dangerLevel para la primera fila será [1, 4, 5].

Paso 4: Calcular el Peligro para el Resto de la Matriz
for (let row = 1; row < numRows; row++) {
  dangerLevel[0] += dream[row][0]
  console.log('Level 2: ', { dangerLevel })

  for (let col = 1; col < numCols; col++) {
    dangerLevel[col] =
      Math.min(dangerLevel[col], dangerLevel[col - 1]) + dream[row][col]
  }
}

Esta parte tiene dos bucles anidados:
	1.	dangerLevel[0] += dream[row][0]:
	•	Para cada nueva fila (row), el primer elemento de esa fila (dangerLevel[0]) se actualiza sumando el valor de la celda directamente debajo de 
  él (dream[row][0]). Esto establece el peligro acumulado para la primera columna de cada fila.
	•	Ejemplo (segunda fila):
	•	dangerLevel[0] era 1, ahora será 1 + 1 = 2.
	•	Para la tercera fila:
	•	dangerLevel[0] será 2 + 4 = 6.
	2.	for (let col = 1; col < numCols; col++):
	•	Luego, para cada columna en la fila actual (row), se decide la ruta más segura para llegar a dangerLevel[col]. Puede venir desde arriba 
  (dangerLevel[col]) o desde la izquierda (dangerLevel[col - 1]). Se elige la ruta con el peligro acumulado menor usando Math.min.
	•	Después de elegir la ruta más segura, se suma el nivel de peligro de la celda actual (dream[row][col]).

	•	Ejemplo:
	•	Para la segunda fila (row = 1):
	•	dangerLevel[1] = Math.min(4, 2) + 5 = 7
	•	dangerLevel[2] = Math.min(5, 7) + 1 = 6
	•	Para la tercera fila (row = 2):
	•	dangerLevel[1] = Math.min(7, 6) + 2 = 8
	•	dangerLevel[2] = Math.min(6, 8) + 1 = 7

Después de este paso, dangerLevel contendrá los niveles de peligro acumulado más bajos para alcanzar cada celda en la última fila de la cuadrícula.

Paso 5: Retornar el Nivel de Peligro Mínimo al Final
return dangerLevel[numCols - 1]

Finalmente, la función retorna dangerLevel[numCols - 1], que es el peligro acumulado más bajo para llegar a la última celda de la última fila (esquina inferior derecha de la cuadrícula).

En nuestro ejemplo:
	•	El valor final de dangerLevel[2] es 7, que representa el camino más seguro (de menor peligro) para llegar desde la esquina superior izquierda hasta la esquina inferior derecha de dream.
Resumen

Esta función realiza un cálculo de camino mínimo en una cuadrícula 2D usando programación dinámica:
	•	Inicializa los peligros acumulados de la primera fila.
	•	Luego, para cada celda en el resto de la cuadrícula, decide el camino de menor peligro acumulado.
	•	Finalmente, devuelve el peligro mínimo acumulado para llegar a la esquina inferior derecha.

Esta técnica es común en problemas de caminos mínimos en cuadrículas o grafos, y optimiza el cálculo evitando recalcular caminos previos.

  */

const dream = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1]
]

console.log(findSafestPath(dream)) // Expected 7
// findSafestPath([
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// ]) // Expected 21
// findSafestPath([
//   [1, 2],
//   [3, 4],
//   [6, 5],
//   [7, 8]
// ]) //Expected: 20
// findSafestPath([
//   [1, 2, 3],
//   [3, 2, 1],
//   [4, 4, 4]
// ]) //Expected: 10
// findSafestPath([
//   [1, 1, 1],
//   [1, 1, 1],
//   [1, 1, 1]
// ]) // Expected: 5

// RECURSIVAMENTE:
// function findSafestPath(dream) {
//   const numRows = dream.length
//   const numCols = dream[0].length

//   // Función recursiva interna con memoización implícita
//   function dfs(row, col, memo = {}) {
//     // Caso base: Si llegamos a la última celda, devolver su nivel de peligro
//     if (row === numRows - 1 && col === numCols - 1) {
//       return dream[row][col]
//     }

//     // Clave única para las coordenadas actuales
//     const key = `${row},${col}`

//     // Si el resultado ya está memoizado, devolverlo
//     if (memo[key] !== undefined) {
//       return memo[key]
//     }

//     // Inicializar los valores de peligro para moverse derecha y abajo
//     let right = Infinity
//     let down = Infinity

//     // Movimiento hacia la derecha si no estamos en la última columna
//     if (col < numCols - 1) {
//       right = dfs(row, col + 1, memo)
//     }

//     // Movimiento hacia abajo si no estamos en la última fila
//     if (row < numRows - 1) {
//       down = dfs(row + 1, col, memo)
//     }

//     // Calcular el peligro acumulado mínimo desde la celda actual
//     const safestPath = dream[row][col] + Math.min(right, down)

//     // Guardar el resultado en memo y devolverlo
//     memo[key] = safestPath
//     return safestPath
//   }

//   // Llamada inicial a la función recursiva interna comenzando desde (0,0)
//   return dfs(0, 0)
// }

/*
Explicación de la solución recursiva

	1.	Función Principal findSafestPath(dream):
	•	La función findSafestPath toma solo un parámetro dream, la matriz de niveles de peligro, y la usa para definir el tamaño de la cuadrícula (numRows y numCols).
	•	Luego, llama a la función recursiva interna dfs para resolver el problema.
	2.	Función Recursiva Interna dfs(row, col, memo):
	•	dfs es una función anidada que maneja el recorrido de la cuadrícula y la memoización.
	•	Acepta las coordenadas row y col de la celda actual y usa un objeto memo para almacenar los resultados de subproblemas ya calculados.
	3.	Caso Base:
	•	Si dfs llega a la última celda (esquina inferior derecha), simplemente retorna el nivel de peligro de esa celda.
	4.	Memoización:
	•	memo se usa para almacenar el nivel de peligro mínimo acumulado desde cada celda.
	•	La clave es una cadena de texto key que representa las coordenadas row,col. Si esta clave ya tiene un valor, la función devuelve ese valor para evitar cálculos redundantes.
	5.	Movimientos Posibles:
	•	dfs intenta moverse hacia la derecha y abajo (si no está en los bordes de la cuadrícula).
	•	Si el movimiento no es posible (por ejemplo, si estamos en la última columna), la variable correspondiente (right o down) se mantiene como Infinity.
	6.	Cálculo del Peligro Acumulado:
	•	safestPath se calcula sumando el nivel de peligro de la celda actual con el menor valor entre right y down, que representan los caminos más seguros hacia la derecha o abajo.
	7.	Llamada Inicial:
	•	La función findSafestPath llama a dfs(0, 0) para comenzar desde la esquina superior izquierda.
*/
