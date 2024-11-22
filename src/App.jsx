import {Routes,Route} from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import Categories from './pages/Categories'
import Products from './pages/Products'
import Orders from './pages/Orders'
import ProductManagement from './pages/ProductMangement'
import AddSpecfication from './pages/AddSpecfication'
import EditProductSpecification from './pages/EditSpec'
import UserData from './pages/UserData'
import Events from './pages/Events'

export default function App() {
  return (
  <div >
    <Sidebar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path="/dashboard/categories" element={<Categories/>}></Route>
      <Route path="/dashboard/products" element={<Products/>}></Route>
      <Route path="/dashboard/orders" element={<Orders/>}></Route>
      <Route path="/dashboard/product" element={<ProductManagement/>}></Route>
      <Route path="/product/addSpecification/:id" element={<AddSpecfication/>} />
      <Route path="/product/editSpecification/:id" element={<EditProductSpecification/>} /> 
      <Route path="/userdata" element={<UserData/>} /> 
      <Route path="/events" element={<Events/>} /> 








    </Routes>
  </div>
  )
}