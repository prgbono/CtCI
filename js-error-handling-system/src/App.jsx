import './App.css'
import 'react-toastify/dist/ReactToastify.css'

import ProductList from './components/ProductList'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <ProductList />
      <ToastContainer />
    </>
  )
}

export default App
