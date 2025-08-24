import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import EditCreator from './pages/EditCreator.jsx'
import ShowCreators from './pages/ShowCreators.jsx'
import AddCreator from './pages/AddCreator.jsx'
import ViewCreator from './pages/ViewCreator.jsx'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}/>
        <Route path='/show' element={<ShowCreators />}/>
        <Route path='/edit/:id' element={<EditCreator />}/>
        <Route path='/add' element={<AddCreator />}/>
        <Route path='/view/:id' element={<ViewCreator />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
