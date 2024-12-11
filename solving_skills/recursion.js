// Given a file system structure representing directories and files,
// Return the total size of files in the structure.
const file_system = {
  home: {
    me: {
      'foo.txt': 416,
      'metrics.txt': 5892,
      src: {
        'site.html': 6051,
        'site.css': 5892,
        'data.csv': 332789
      }
    },
    you: {
      'dict.json': 4913364
    }
  },
  bin: {
    bash: 618416,
    cat: 23648,
    ls: 38704
  },
  var: {
    log: {
      dmesg: 1783894,
      'wifi.log': 924818,
      httpd: {
        'access.log': 17881,
        'access.log.0.gz': 4012
      }
    }
  }
}

// Helper function to determine if an item is a folder
const isFolder = (item) => {
  return typeof item === 'object' && item !== null
}

// Recursive function to calculate total file size
const total_size = (file_system) => {
  let total = 0

  // Iterate over each item in the file system
  for (let key in file_system) {
    const item = file_system[key]

    if (isFolder(item)) {
      // If the item is a folder, recursively calculate the size
      total += total_size(item)
    } else {
      // If it's a file, add its size to the total
      total += item
    }
  }

  return total
}

console.log(total_size(file_system)) //

function fibonacciDP(n, memo = {}) {
  if (n <= 1) return n
  if (memo[n]) return memo[n] // Si ya lo calculamos, lo devolvemos
  memo[n] = fibonacciDP(n - 1, memo) + fibonacciDP(n - 2, memo)
  return memo[n]
}

console.log(fibonacciDP(6)) // Resultado: 8
//Ventaja: Con memoización, la complejidad se reduce a O(n), ya que cada
//subproblema se resuelve solo una vez.
