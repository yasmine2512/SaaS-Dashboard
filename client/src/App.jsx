import './App.css'
import { Route,Routes} from 'react-router-dom'
import Home from "./Pages/Home"
import Dashboard from "./Pages/Dashboard"
import Login from "./Pages/Login"
import NotFound from "./Pages/NotFound"
import Orders from "./Pages/Orders"
// import Products from "./Pages/Products"
import ProductsDetailsAdmin from "./Pages/ProductDetailsAdmin"
import Products from "./Pages/ProductsAdmin"
import Register from "./Pages/Register"
import Settings from "./Pages/Settings"
import Subscriptions from "./Pages/Subsriptions"
import Users from "./Pages/UsersList"
import Cart from "./Pages/Cart"


function App() {
  return (
    <>
<Routes>
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register/>} />
<Route path="/" element={<Home/>} />
<Route path="/users" element={<Users/>} />
{/* <Route path="/products/new" element={<ProductForm/>} /> */}
<Route path="/:id/dashboard" element={<Dashboard/>} />
<Route path="/:id/cart" element={<Cart/>} />
<Route path="/products/:productid" element={<ProductsDetailsAdmin />} />
{/* <Route path="/products/:id" element={<ProductsDetailsuser />} /> */}
<Route path="/:id/products" element={<Products />} />
<Route path="/products/dashboard" element={<Products />} />
<Route path="/orders" element={<Orders/>} />
<Route path="/settings" element={<Settings/>} />
<Route path="/subscriptions" element={<Subscriptions/>} />
<Route path="*" element={<NotFound />} />
<Route path="/cart" element={<Cart />} />

</Routes>
    </>
  )
}

export default App
