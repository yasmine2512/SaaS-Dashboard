import { Link } from "react-router-dom";
import DashboardLayout from "../components/Layout";
import { Plus, Search, MoreHorizontal } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/Input";
import { useState ,useEffect} from "react"
import { useParams } from "react-router-dom";
import axios from "axios";

const products = [
  { id: 1, name: "Starter Kit", category: "SaaS", price: "$29/mo", stock: "Unlimited", status: "Active", image: "🚀" },
  { id: 2, name: "Pro Plan", category: "SaaS", price: "$49/mo", stock: "Unlimited", status: "Active", image: "⚡" },
  { id: 3, name: "Enterprise", category: "SaaS", price: "$199/mo", stock: "Unlimited", status: "Active", image: "🏢" },
  { id: 4, name: "API Access", category: "Add-on", price: "$19/mo", stock: "Unlimited", status: "Active", image: "🔗" },
  { id: 5, name: "White Label", category: "Add-on", price: "$99/mo", stock: "Limited", status: "Draft", image: "🏷️" },
  { id: 6, name: "Custom Integration", category: "Service", price: "$499", stock: "10 slots", status: "Active", image: "🔧" },
];
import AddProductPopup from "./AddProduct";

export default function Products() {
  const { id } = useParams()
   const [open, setOpen] = useState(false)
   const [page, setPage] = useState(null)
    const API_URL = import.meta.env.VITE_API_URL;
     useEffect(() => {
       const fetchProfile = async () => {
         const token = localStorage.getItem("token");
           if (!token) {
         navigate("/login");
         return;
       }
         try {
           const res = await axios.get(`${API_URL}/api/users/${id}`, {
             headers: { Authorization: `Bearer ${token}` }
           })
           setPage(res.data)
           console.log(res.data);
         } catch (err) {
           console.error("Unauthorized or token invalid", err)
           navigate("/login");
         }
       }
   
       fetchProfile()
     }, [id])
   
     if (!page) return <div>Loading...</div>

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold">Products</h1>
            <p className="text-sm text-muted-foreground">Manage your product catalog</p>
          </div>
          <Button className="gradient-primary border-0 text-primary-foreground" onClick={() => setOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </Button>
          <AddProductPopup
        open={open}
        setOpen={setOpen}
      />
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-10" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <Link key={p.id} to={`/products/${p.id}`} className="group">
              <div className="bg-card rounded-xl border border-border p-5 shadow-soft hover:shadow-elevated transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">{p.image}</div>
                  {/* <img src={`http://localhost:5000/uploads/${product.image}`} className="w-full h-4 object-cover rounded"/> */}
                  <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="w-4 h-4" /></button>
                </div>
                <h3 className="font-heading font-semibold group-hover:text-primary transition-colors">{p.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{p.category}</p>
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-lg">{p.price}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    p.status === "Active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                  }`}>{p.status}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
