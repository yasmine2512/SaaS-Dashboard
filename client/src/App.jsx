import './App.css'
import DashboardLayout from './Layouts/DashboardLayout'
import { Route,Routes} from 'react-router-dom'
import Table from './Layouts/Table'
import Dashboar from './Layouts/Dashboard'
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


function App() {
  return (
    <>
<Routes>
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register/>} />
<Route path="/" element={<Home/>} />
{/* <Route path="/about" element={<About/>} /> */}
{/* <Route path="/contact" element={<Contact/>} /> */}
{/* <Route path=":id/users" element={<Users/>} /> */}
<Route path="/users" element={<Users/>} />
{/* <Route path="/user/:id" element={<User/>} /> */}
{/* <Route path="/products" element={<Products/>} /> */}
{/* <Route path="/products/new" element={<ProductForm />} /> */}
<Route path="/dashboard" element={<Dashboard/>} />
<Route path="/:id/products/:id" element={<ProductsDetailsAdmin />} />
<Route path="/products" element={<Products />} />
<Route path="/orders" element={<Orders/>} />
{/* <Route path="/orders/:id" element={<Order/>} /> */}
<Route path="/settings" element={<Settings/>} />
<Route path="/subscriptions" element={<Subscriptions/>} />
</Routes>
    </>
  )
}

export default App
