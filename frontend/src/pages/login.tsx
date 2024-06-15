import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/user/login/", {
        username,
        password,
      });

      // Aqui você pode tratar a resposta do login, como armazenar o token no localStorage
      console.log("Resposta do login:", response.data);

      // Exemplo de armazenamento do token no localStorage
      localStorage.setItem("authToken", response.data.token);

      // Redirecionamento ou qualquer outra lógica após o login ser bem-sucedido
      // Por exemplo, redirecionar para a página inicial
      // router.push('/');
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      // Tratar erros de login aqui
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#196273]">
      <div className="bg-custom-gradient p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex items-center justify-center mt-5 mb-4">
          <img
            src="/images/Gemini_Generated_Image_sm9kpasm9kpasm9k-removebg-preview.png"
            alt="Gemini Logo"
            className="w-20 h-20"
          />
          <h1 className="font-medium text-white text-center font-press-start mr-9 text-sm">
            Save Point
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-medium text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Insira seu username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black placeholder-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 sm:text-xs"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-white"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Insira sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 p-2 w-full pr-20 border border-gray-300 rounded-md text-black placeholder-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 sm:text-xs"
              />
              {password && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-blue-500 hover:text-blue-700 focus:outline-none"
                >
                  {showPassword ? (
                    <img
                      src="/images/bauAberto.png"
                      alt="Show password"
                      className="password-icon"
                    />
                  ) : (
                    <img
                      src="/images/bauFechado.png"
                      alt="Hide password"
                      className="password-icon"
                    />
                  )}
                </button>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-custom-button text-white p-2 rounded-md hover:bg-custom-button hover:opacity-75"
          >
            Login
          </button>
        </form>
        <p className="text-xs text-white text-center mt-4">
          Don't have an account?{" "}
          <Link href="/signup" passHref>
            <span className="text-blue-500 hover:text-blue-400 cursor-pointer">
              Sign up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
