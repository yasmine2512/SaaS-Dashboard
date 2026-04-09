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
      image: URL.createObjectURL(form.image),
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
        {/* max-h-[80vh] */}
      <div className="bg-white w-[600px] h-[90vh] rounded-2xl overflow-y-auto shadow-xl p-8 flex flex-col border">

        <h2 className="text-xl font-semibold mb-4">
          Add Product
        </h2>

        <div className="space-y-3">
          <input
            name="name"
            placeholder="Product name"
            className="w-full border p-2 rounded-lg"
            onChange={handleChange}
          />

          <input
            name="price"
            placeholder="Price (ex: $49/mo)"
            className="w-full border p-2 rounded-lg"
            onChange={handleChange}
          />

          <input
            name="category"
            placeholder="Category"
            className="w-full border p-2 rounded-lg"
            onChange={handleChange}
          />

          <input
            name="stock"
            placeholder="Stock"
            className="w-full border p-2 rounded-lg"
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            className="w-full border p-2 rounded-lg"
            rows={3}
            onChange={handleChange}
          />

          <textarea
            name="features"
            placeholder="Features (one per line)"
            className="w-full border p-2 rounded-lg"
            rows={4}
            onChange={handleChange}
          />

          <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) =>
          setForm({ ...form, image: e.target.files[0] })}
          className="w-full border p-2 rounded-lg"
          />

        </div>

        <div className="flex justify-end gap-3 mt-5">
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