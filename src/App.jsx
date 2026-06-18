import { Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/adminPage'
import HomePage from './pages/homePage'
import ProductsPage from './pages/productsPage'
import TestPage from './pages/test'
import LoginPage from './pages/loginPage'
import { Toaster } from 'react-hot-toast'

function App() {

  return (

    <div className='w-full h-screen flex justify-center items-center bg-primary text-secondary ' >
      <Toaster position="top-center" />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/admin/*' element={<AdminPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/test' element={<TestPage />} />
        <Route path='/login' element={<LoginPage />} />

      </Routes>

    </div>

  )
}

export default App






















/*           <div className='w-[700px] h-[700px] bg-green-500 flex justify-center items-center flex-col relative' >
              <div className='w-[100px] h-[100px] bg-yellow-500 '></div>
              <div className='w-[100px] h-[100px] bg-blue-500 '></div>
              <div className='w-[100px] h-[100px] bg-purple-500 '></div>
              <div className='w-[100px] h-[100px] bg-pink-500 fixed top-[90px] left-[10px]'></div>
              <div className='w-[100px] h-[100px] bg-indigo-500 absolute top-[190px] right-[10px]'></div>
              <div className='w-[100px] h-[100px] bg-gray-500 '></div>

            </div>*/