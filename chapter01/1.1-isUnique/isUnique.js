// No external structure
const uniqueChars = (str) => {
  for (i = 0; i < str.length; i++) {
    for (j = i + 1; j <= str.length; j++) {
      if (str[i] === str[j]) return false
    }
  }
  return true
}

// Using an external structure obj
const uniqueCharsWithObj = (str) => {
  let obj = {}
  for (let i = 0; i < str.length; i++) {
    if (obj[str[i]]) return false
    else obj[str[i]] = 1
  }
  return true
}

/* TESTS */
console.log(uniqueCharsWithObj('abcd'), 'true')
console.log(uniqueCharsWithObj('abccd'), 'false')
console.log(uniqueCharsWithObj('bhjjb'), 'false')
console.log(uniqueCharsWithObj('mdjq'), 'true')
console.log(uniqueCharsWithObj('1353'), 'false')
console.log(uniqueCharsWithObj('11'), 'false')
console.log(uniqueCharsWithObj('bhaa'), 'false')
