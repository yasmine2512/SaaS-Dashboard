import { useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

export default function AddProductPopup({ open, setOpen, onSave }) {
const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock:"",
    description: "",
    features: "",
    image: null, 
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async() => {
    const product = {
      ...form,
      features: form.features.split("\n"),
    }
    const data = new FormData()

    data.append("name", product.name)
    data.append("price", product.price)
    data.append("category", product.category)
    data.append("stock",product.stock)
    data.append("desc", product.description)
    data.append("features", JSON.stringify(product.features))
    data.append("image", form.image)
try{
    await axios.post(`${API_URL}/api/products/${id}/new-product`, data,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  alert("Product added successfully!");
}catch(error){
    console.log(error.message);
}
    setOpen(false)
  }

  if (!open) return null

  return (
<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
  <div className="bg-white w-[700px] h-[92vh] rounded-2xl overflow-y-auto shadow-xl p-6 flex flex-col border">

    <h2 className="text-xl font-semibold mb-5 ">
      Add Product
    </h2>

    <div className="grid grid-cols-2 gap-2">

      <div className="flex flex-col mx-1">
        <label className="mb-2 text-left  ml-3">Product Name</label>
        <input
          name="name"
          placeholder="Product name"
          className="border p-2 rounded-lg w-full "
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col mx-1">
        <label className="mb-2 text-left ml-3">Price</label>
        <input
          name="price"
          placeholder="Price (ex: $49/mo)"
          className="border p-2 rounded-lg w-full"
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col mx-1">
        <label className="mb-2 text-left ml-3">Category</label>
        <input
          name="category"
          placeholder="Category"
          className="border p-2 rounded-lg w-dull"
          onChange={handleChange}
        />
      </div>


      <div className="flex flex-col mx-1">
        <label className="mb-2 text-left ml-3">Stock</label>
        <input
          name="stock"
          placeholder="Stock"
          className="border p-2 rounded-lg w-full"
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col mx-1">
        <label className="mb-2 text-left ml-3">Description</label>
        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 rounded-lg w-full"
          rows={3}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col mx-1">
        <label className="mb-2 text-left ml-3">Features</label>
        <textarea
          name="features"
          placeholder="Features (one per line)"
          className="border p-2 rounded-lg w-full"
          rows={3}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col col-span-2 mx-1">
        <label className="mb-2 text-left ml-3">Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files[0] })
          }
          className="border p-2 rounded-lg"
        />
      </div>

    </div>

    <div className="flex justify-end gap-3 mt-6">
      <button
        onClick={() => setOpen(false)}
        className="px-4 py-2 border rounded-lg"
      >
        Cancel
      </button>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-black text-white rounded-lg"
      >
        Add Product
      </button>
    </div>

  </div>
</div>
  )
}