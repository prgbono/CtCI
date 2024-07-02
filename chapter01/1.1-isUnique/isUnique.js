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
console.log(uniqueChars('abcd'), 'true')
console.log(uniqueChars('abccd'), 'false')
console.log(uniqueChars('bhjjb'), 'false')
console.log(uniqueChars('mdjq'), 'true')
console.log(uniqueChars('1353'), 'false')
console.log(uniqueChars('11'), 'false')
console.log(uniqueChars('bhaa'), 'false')
