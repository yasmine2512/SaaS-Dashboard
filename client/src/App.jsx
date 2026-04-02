import './App.css'
import DashboardLayout from './Layouts/DashboardLayout'
import { Route,Routes} from 'react-router-dom'
import Table from './Layouts/Table'
import Dashboard from './Layouts/Dashboard'


function App() {
  return (
    <>
<Routes>
{/* <Route path="/login" element={<Login />} /> */}
{/* <Route path="/register" element={<Register/>} /> */}
{/* <Route path="/" element={<Home/>} /> */}
{/* <Route path="/about" element={<About/>} /> */}
{/* <Route path="/contact" element={<Contact/>} /> */}
{/* <Route path=":id/users" element={<Users/>} /> */}
{/* <Route path=":id/users/:id" element={<User/>} /> */}
{/* <Route path="/user/:id/info" element={<Myinformation/>} /> */}
{/* <Route path="/user/:id" element={<User/>} /> */}
<Route path="/" element={<DashboardLayout/>} />
<Route path="/products" element={<Table/>} />
{/* <Route path="/products/new" element={<ProductForm />} />
<Route path="/products/:id" element={<ProductForm />} /> */}
<Route path="/orders" element={<Dashboard/>} />
{/* <Route path="/orders/:id" element={<Order/>} /> */}
{/* <Route path="/settings" element={<Settings/>} /> */}
{/* <Route path="/subscription" element={<Subscribtion/>} /> */}
</Routes>
    </>
  )
}

export default App
