import React, { useState, useEffect } from "react";
import axios from "axios";

export const Products = () => {
  const baseapi = "http://localhost:9000/api";
  const baseImageUrl = "http://localhost:9000/upload";

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [CategoryId, setCategoryId] = useState("");
  const [productImage, setProductImage] = useState(null);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getProducts = async () => {
    const res = await axios.get(`${baseapi}/product`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("pos-token")}` },
    });
    setProducts(res.data.data);
  };

  const getCategories = async () => {
    const res = await axios.get(`${baseapi}/category`);
    setCategories(res.data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productStock", productStock);
    formData.append("productDescription", productDescription);
    formData.append("category", CategoryId);
    if (productImage) formData.append("image", productImage);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
      },
    };

    editId
      ? await axios.put(`${baseapi}/product/edit/${editId}`, formData, config)
      : await axios.post(`${baseapi}/product/add`, formData, config);

    resetForm();
    getProducts();
  };

  const resetForm = () => {
    setProductName("");
    setProductPrice("");
    setProductStock("");
    setProductDescription("");
    setCategoryId("");
    setProductImage(null);
    setEditId(null);
    setShowModal(false);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await axios.delete(`${baseapi}/product/delete/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("pos-token")}` },
    });
    getProducts();
  };

  return (
    <div className="w-full p-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {[
                "S.No",
                "Image",
                "Name",
                "Description",
                "Price",
                "Stock",
                "Category",
                "Actions",
              ].map((h) => (
                <th key={h} className="border p-3 text-left text-sm">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {products.map((p, i) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="border p-3">{i + 1}</td>

                <td className="border p-3">
                  {p.image ? (
                    <img
                      src={`${baseImageUrl}/${p.image}`}
                      className="w-14 h-14 object-cover rounded"
                      alt=""
                    />
                  ) : (
                    "—"
                  )}
                </td>

                <td className="border p-3 font-medium">{p.productName}</td>
                <td className="border p-3">{p.productDescription}</td>
                <td className="border p-3">₹{p.productPrice}</td>
                <td className="border p-3">{p.productStock}</td>
                <td className="border p-3">
                  {p.category?.categoryName || "—"}
                </td>

                <td className="border p-3">
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded min-w-[70px]"
                      onClick={() => {
                        setShowModal(true);
                        setEditId(p._id);
                        setProductName(p.productName);
                        setProductPrice(p.productPrice);
                        setProductStock(p.productStock);
                        setProductDescription(p.productDescription);
                        setCategoryId(p.category?._id);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded min-w-[70px]"
                      onClick={() => deleteProduct(p._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-full max-w-xl p-6 rounded">
            <h2 className="text-xl font-bold mb-4">
              {editId ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="border p-2 w-full"
                placeholder="Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <input
                type="number"
                className="border p-2 w-full"
                placeholder="Price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
              <input
                type="number"
                className="border p-2 w-full"
                placeholder="Stock"
                value={productStock}
                onChange={(e) => setProductStock(e.target.value)}
              />
              <textarea
                className="border p-2 w-full"
                placeholder="Description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
              <select
                className="border p-2 w-full"
                value={CategoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.categoryName}
                  </option>
                ))}
              </select>
              <input
                type="file"
                onChange={(e) => setProductImage(e.target.files[0])}
              />

              <div className="flex justify-end gap-3">
                <button type="button" onClick={resetForm}>
                  Cancel
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
