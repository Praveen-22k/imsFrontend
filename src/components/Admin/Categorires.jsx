import React, { useState, useEffect } from "react";
import axios from "axios";

export const Categorires = () => {
  const baseapi = "http://localhost:9000/api";
  const [categoryName, setcategoryName] = useState("");
  const [categoryDescription, setcategoryDescription] = useState("");
  const [categories, setcategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;

      if (editId) {
        res = await axios.put(
          `${baseapi}/category/update/${editId}`,
          { categoryName, categoryDescription },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          },
        );
      } else {
        res = await axios.post(
          `${baseapi}/category/add`,
          { categoryName, categoryDescription },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          },
        );
      }

      alert(res.data.message);
      setcategoryName("");
      setcategoryDescription("");
      setEditId(null);
      setShowModal(false);
      getCategories();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get(`${baseapi}/category`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });
      setcategories(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      const res = await axios.delete(`${baseapi}/category/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });
      alert(res.data.message);
      getCategories();
    } catch (err) {
      alert(err.response?.data?.message || "Delete Failed");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7">
          <h1 className="text-xl sm:text-2xl font-bold">Category Management</h1>
          <button
            className="bg-green-500 text-white text-sm font-medium rounded-md px-4 py-2 hover:bg-green-700"
            onClick={() => setShowModal(true)}
          >
            Add Category
          </button>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="min-w-[600px] w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">S.No</th>
                <th className="border px-4 py-2 text-left">Category Name</th>
                <th className="border px-4 py-2 text-left">Description</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.length > 0 ? (
                categories.map((val, index) => (
                  <tr key={val._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2 font-medium">
                      {val.categoryName}
                    </td>
                    <td className="border px-4 py-2">
                      {val.categoryDescription || "—"}
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                          onClick={() => {
                            setShowModal(true);
                            setEditId(val._id);
                            setcategoryName(val.categoryName);
                            setcategoryDescription(val.categoryDescription);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                          onClick={() => deleteCategory(val._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No Category Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[95%] sm:w-[80%] md:w-[450px] lg:w-[500px] p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              {editId ? "Edit Category" : "Add Category"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setcategoryName(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-green-400"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={categoryDescription}
                  onChange={(e) => setcategoryDescription(e.target.value)}
                  rows="3"
                  className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-green-400"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
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
