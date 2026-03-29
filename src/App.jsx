import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/navbar'
import PropertyPage from './pages/PropertyPage'
import SearchPage from './pages/SearchPage'
import PropertiesPage from './pages/PropertiesPage'
const App = () => {
  return (
    <>
    <BrowserRouter>
        <Navbar/>
    <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/property/:id' element={<PropertyPage/>}/>
    <Route path='/search' element={<SearchPage/>}/>
    <Route path='/properties' element={<PropertiesPage/>}/>

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
