import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CreateBooks from './pages/CreateBooks.jsx'
import ShowBook from './pages/ShowBook.jsx'
import DeleteBook from "./pages/DeleteBook.jsx"
import EditBook from './pages/EditBook.jsx'

const router= createBrowserRouter([{
  path: '/',
  element: <Home/> 
},{
  path: '/books/create',
  element: <CreateBooks />
},{
  path: '/books/details/:id',
  element: <ShowBook/>
},{
  path: '/books/edit/:id',
  element: <EditBook/>
},{
  path: '/books/delete/:id',
  element: <DeleteBook/>
}])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
