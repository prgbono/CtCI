// Con async - await
let response = await fetch('https://randomuser.me/api/?results=20')
let data = await response.json()
const results = data.results
const nameAndSurname = (results) =>
  results.map((item) => `${item.name.first} ${item.name.last}`)
const ages = results.map((result) => result.dob.age)
const average = (ages) => {
  const total = ages.reduce((acc, item) => acc + item, 0)
  return total / ages.length
}

const fetchData = async () => {
  try {
    const response = await fetch('https://api.example.com/data') // Hacer la solicitud
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json() // Convertir la respuesta en JSON
    console.log(data) // Trabajar con los datos
  } catch (error) {
    console.error('Error fetching the data:', error) // Manejo de errores
  }
}

fetchData()

// Con async-await y typescript
interface User {
  id: number
  name: string
  email: string
}

const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data: User[] = await response.json()
    // `data` es un array tipado de usuarios
    return data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error // Propagar el error
  }
}

fetchUsers().then((users) => console.log('Users:', users))

// Con then
fetch('https://randomuser.me/api/?results=20')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  })
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.error('Error fetching the data:', error)
  })

// Then + TypeScript
interface User {
  id: number
  name: string
  email: string
}

fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  })
  .then((data: User[]) => {
    console.log('Users:', data)
  })
  .catch((error) => {
    console.error('Error fetching users:', error)
  })
