import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/user/admin/")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Erro ao obter a lista de usuários:", error);
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#196273]">
      <div className="bg-custom-gradient p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="flex items-center justify-center mt-5 mb-4">
          <img
            src="/images/Gemini_Generated_Image_sm9kpasm9kpasm9k-removebg-preview.png"
            alt="Gemini Logo"
            className="w-20 h-20"
          />
          <h1 className="font-medium text-white text-center font-press-start mr-9 text-sm">
            Save Point - Admin
          </h1>
        </div>
        <h2 className="text-white text-center font-medium mb-4 text-xl">Lista de Usuários</h2>
        <table className="w-full text-white text-sm">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;