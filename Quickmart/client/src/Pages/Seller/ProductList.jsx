import React, { useMemo, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

const ProductList = () => {
  const { products, currency, axios, fetchProducts } = useAppContext();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", category: "", price: "", offerPrice: "", description: "" });

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post("/api/product/stock", { id, inStock });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const openEdit = (product) => {
    setEditing(product);
    setForm({
      name: product.name || "",
      category: product.category || "",
      price: product.price || "",
      offerPrice: product.offerprice || "",
      description: Array.isArray(product.description) ? product.description.join("\n") : (product.description || ""),
    });
    setIsEditOpen(true);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    if (!editing) return;
    try {
      const payload = {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        offerPrice: Number(form.offerPrice),
        description: form.description,
      };
      const { data } = await axios.put(`/api/product/update/${editing._id}`, payload);
      if (data.success) {
        toast.success("Product updated");
        setIsEditOpen(false);
        setEditing(null);
        fetchProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">
                  Selling Price
                </th>
                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                <th className="px-4 py-3 font-semibold truncate">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product) => (
                <tr key={product._id} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="border border-gray-300 rounded p-2">
                      <img
                        src={product.image[0]}
                        alt="Product"
                        className="w-16"
                      />
                    </div>
                    <span className="truncate max-sm:hidden w-full">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>

                  <td className="px-4 py-3 max-sm:hidden">
                    {currency}
                    {product.offerprice}
                  </td>

                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                      <input
                        onClick={() =>
                          toggleStock(product._id, !product.inStock)
                        }
                        checked={product.inStock}
                        type="checkbox"
                        className="sr-only peer"
                      />
                      <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                      <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-tranpmnsform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => openEdit(product)} className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Edit</button>
                    <button onClick={async () => {
                      const ok = confirm('Delete this product?');
                      if (!ok) return;
                      try {
                        const { data } = await axios.delete(`/api/product/delete/${product._id}`);
                        if (data.success) {
                          toast.success('Product deleted');
                          fetchProducts();
                        } else {
                          toast.error(data.message);
                        }
                      } catch (error) {
                        toast.error(error.message);
                      }
                    }} className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isEditOpen && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-md border border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-3">Edit Product</h3>
              <form onSubmit={submitEdit} className="space-y-3">
                <div>
                  <label className="block text-sm mb-1">Name</label>
                  <input name="name" value={form.name} onChange={onChange} className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Category</label>
                  <input name="category" value={form.category} onChange={onChange} className="w-full border rounded px-3 py-2" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm mb-1">Price</label>
                    <input name="price" type="number" value={form.price} onChange={onChange} className="w-full border rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Offer Price</label>
                    <input name="offerPrice" type="number" value={form.offerPrice} onChange={onChange} className="w-full border rounded px-3 py-2" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1">Description (one per line)</label>
                  <textarea name="description" rows="4" value={form.description} onChange={onChange} className="w-full border rounded px-3 py-2" />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => { setIsEditOpen(false); setEditing(null); }} className="px-3 py-2 rounded border">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
