import {Routes,Route} from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import Categories from './pages/Categories'
import Products from './pages/Products'
import Orders from './pages/Orders'
export default function App() {
  return (
  <div >
    <Sidebar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path="/dashboard/categories" element={<Categories/>}></Route>
      <Route path="/dashboard/products" element={<Products/>}></Route>
      <Route path="/dashboard/orders" element={<Orders/>}></Route>



    </Routes>
  </div>
  )
}