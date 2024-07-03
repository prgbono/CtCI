// Given 2 strings, write a method to decide if one is a permutation of the other.
const check = (str1, str2) => {
  for (let i = 0; i < str1.length; i++) {
    if (!str2.includes(str1[i])) return false
  }
  return true
}

const isPermutation = (str1, str2) => {
  return str1.length !== str2.length ? false : check(str1, str2)
}

console.log(isPermutation('abcde', 'cba'), 'false')
console.log(isPermutation('abC', 'cba'), 'false')
console.log(isPermutation('ab c', 'cba'), 'false')
console.log(isPermutation('123', '321'), 'true')
console.log(isPermutation('abc', 'cba'), 'true')
console.log(isPermutation('abc', 'abc'), 'true')
console.log(isPermutation('abdc', 'dcab'), 'true')
console.log(isPermutation('aba', 'aab'), true)
console.log(isPermutation('aba', 'aaba'), false)
console.log(isPermutation('aba', 'aa'), false)
