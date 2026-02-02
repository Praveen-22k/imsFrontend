import { useEffect, useState } from "react";
import axios from "axios";

const baseapi = "http://localhost:9000/api";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get(`${baseapi}/user/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(`${baseapi}/user/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });

      getUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Users</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3 ">Email</th>
              <th className="p-3 hidden sm:table-cell">Role</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody className="center">
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-3 text-center align-middle">{user.name}</td>
                <td className="p-3 text-center align-middle">{user.email}</td>
                <td className="p-3 text-center align-middle hidden sm:table-cell">
                  {user.role}
                </td>
                <td className="p-3 text-center align-middle">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
