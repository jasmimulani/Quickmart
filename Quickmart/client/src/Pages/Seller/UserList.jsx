import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const UserList = () => {
  const { axios } = useAppContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/user/users");
      if (data.success) {
        setUsers(data.users || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle active/block status
  const toggleStatus = async (id, isActive) => {
    try {
      const { data } = await axios.post("/api/user/toggle-user", { id, isActive });
      if (data.success) {
        const user = users.find(u => u._id === id);

        // Log action if user is being blocked and not logged in
        if (!isActive && !user?.isLoggedIn) {
          try {
            await axios.post("/api/logs/block-user", {
              userId: id,
              email: user.email,
              reason: "Blocked while not logged in",
              timestamp: new Date().toISOString(),
            });
            console.log(`Logged block action for ${user.email}`);
            toast.success("Blocked user is not logged in – action logged");
          } catch (logError) {
            console.error("Failed to log block action:", logError);
          }
        }

        fetchUsers();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Prepare chart data
  const chartData = [
    {
      status: "Active",
      count: users.filter(u => u.isActive).length
    },
    {
      status: "Blocked",
      count: users.filter(u => !u.isActive).length
    }
  ];

  return (
    <div className="flex-1 p-6 bg-gray-50 h-[95vh] overflow-y-scroll">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Users Dashboard</h2>
        <button
          onClick={fetchUsers}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh Users"}
        </button>
      </div>

      {/* User Statistics Chart */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">User Status Overview</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Joined</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-t border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-4 py-2 font-medium">{user.name}</td>
                  <td className="px-4 py-2 text-gray-600">{user.email}</td>
                  <td className="px-4 py-2 text-gray-600">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    <label className="relative inline-flex items-center cursor-pointer gap-2">
                      <input
                        type="checkbox"
                        checked={user.isActive}
                        onChange={() => toggleStatus(user._id, !user.isActive)}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition"></div>
                      <span className="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-6"></span>
                      <span className="ml-3 font-medium text-gray-700">
                        {user.isActive ? "Active" : "Blocked"}
                      </span>
                    </label>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
