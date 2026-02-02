import React, { useState, useEffect } from "react";
import axios from "axios";

export const Suppliers = () => {
  const [supplierName, setSupplierName] = useState("");
  const [supplierAddress, setSupplierAddress] = useState("");
  const [supplierEmail, setSupplierEmail] = useState("");
  const [supplierNo, setSupplierNo] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        supplierName,
        supplierAddress,
        supplierEmail,
        supplierNo,
      };

      let res;
      if (editId) {
        res = await axios.put(
          `http://localhost:9000/api/supplier/update/${editId}`,
          payload,
        );
      } else {
        res = await axios.post(
          "http://localhost:9000/api/supplier/add",
          payload,
        );
      }

      alert(res.data.message);
      resetForm();
      getSuppliers();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const getSuppliers = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/supplier");
      setSuppliers(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSupplier = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await axios.delete(
        `http://localhost:9000/api/supplier/delete/${id}`,
      );
      alert(res.data.message);
      getSuppliers();
    } catch (err) {
      alert(err.response?.data?.message || "Delete Failed");
    }
  };

  const resetForm = () => {
    setSupplierName("");
    setSupplierAddress("");
    setSupplierEmail("");
    setSupplierNo("");
    setEditId(null);
    setShowModal(false);
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 mt-4">
        <h1 className="text-xl sm:text-2xl font-bold">Supplier Management</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto"
          onClick={() => setShowModal(true)}
        >
          Add Supplier
        </button>
      </div>

      <div className="w-full overflow-x-auto rounded-lg shadow">
        <table className="min-w-[800px] w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.map((s) => (
              <tr key={s._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{s.supplierName}</td>
                <td className="border px-4 py-2">{s.supplierAddress}</td>
                <td className="border px-4 py-2 break-all">
                  {s.supplierEmail}
                </td>
                <td className="border px-4 py-2">{s.supplierNo}</td>
                <td className="border px-4 py-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => {
                        setEditId(s._id);
                        setSupplierName(s.supplierName);
                        setSupplierAddress(s.supplierAddress);
                        setSupplierEmail(s.supplierEmail);
                        setSupplierNo(s.supplierNo);
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => deleteSupplier(s._id)}
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md sm:max-w-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              {editId ? "Edit Supplier" : "Add Supplier"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Supplier Name</label>
                <input
                  type="text"
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Address</label>
                <input
                  type="text"
                  value={supplierAddress}
                  onChange={(e) => setSupplierAddress(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  value={supplierEmail}
                  onChange={(e) => setSupplierEmail(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Phone</label>
                <input
                  type="text"
                  value={supplierNo}
                  onChange={(e) => setSupplierNo(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="border px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
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
