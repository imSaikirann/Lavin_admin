import {Routes,Route} from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import Categories from './pages/Categories'

import Orders from './pages/Orders'
import ProductManagement from './pages/ProductMangement'

import EditProductSpecification from './pages/EditSpec'
import UserData from './pages/UserData'
import Events from './pages/Events'
import Product from './pages/Product'
import EditProductForm from './pages/EditProduct'
import Reviews from './pages/Reviews'
import Variants from './pages/Varients'
import InternalPages from './pages/InternalPages'

export default function App() {
  return (
  <div >
    <Sidebar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path="/dashboard/categories" element={<Categories/>}></Route>
      <Route path="/allproducts" element={<Product/>}></Route>
      <Route path="/dashboard/orders" element={<Orders/>}></Route>
      <Route path="/dashboard/product" element={<ProductManagement/>}></Route>
 
      <Route path="/specifications/:id" element={<EditProductSpecification/>} /> 
      <Route path="/userdata" element={<UserData/>} /> 
      <Route path="/events" element={<Events/>} /> 
      <Route path="/addProduct" element={<ProductManagement/>} /> 
      <Route path="/editProduct/:id" element={<EditProductForm/>} /> 
      <Route path='/reviews/:id' element={<Reviews/>}></Route>
      <Route path='/variants/:id' element={<Variants/>}></Route>
      <Route path='/internalPages/:id' element={<InternalPages/>}></Route>





    









    </Routes>
  </div>
  )
}