import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PropertyPage from './pages/PropertyPage'
import SearchPage from './pages/SearchPage'
import PropertiesPage from './pages/PropertiesPage'
import AdminPanel from './pages/admin/AdminPanel'
import UserLayout from './pages/UserLayout';

const App = () => {
  return (
    <>
    <BrowserRouter>
        {/* <Navbar/> */}
    <Routes>
     <Route element={<UserLayout/>}>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/property/:id' element={<PropertyPage/>}/>
    <Route path='/search' element={<SearchPage/>}/>
    <Route path='/properties' element={<PropertiesPage/>}/>
    </Route> 
    <Route path='/admin' element={<AdminPanel/>}/>

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
