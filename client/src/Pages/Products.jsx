import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function Products() {
  return (
    <Layout>
      <h1 className="text-xl mb-4">Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {[1,2,3].map((p)=> (
          <Link to={`/products/${p}`} key={p}>
            <div className="border p-4 rounded">Product {p}</div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}