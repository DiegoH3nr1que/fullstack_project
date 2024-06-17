import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  username: string;
  email: string;
}

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("Token de autenticação não encontrado");
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const response = await axios.get("http://127.0.0.1:8000/user/admin/");

        if (!Array.isArray(response.data)) {
          throw new Error("Resposta inválida da API: não é uma lista de usuários");
        }

        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao obter a lista de usuários:", error.message);
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId: number) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await axios.get(`http://127.0.0.1:8000/user/delete/${userId}`);

      // Remove o usuário da lista de usuários
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Erro ao deletar usuário:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#196273]">
      <div className="bg-custom-gradient p-8 rounded-lg shadow-lg max-w-5xl w-full">
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
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <table className="w-full text-white text-sm">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Username</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
