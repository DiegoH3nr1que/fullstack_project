import React, { useState } from 'react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-gradient2">
      <div className="bg-custom-gradient p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex items-center justify-center mt-5 mb-4">
          <img
            src="/images/Gemini_Generated_Image_sm9kpasm9kpasm9k-removebg-preview.png"
            alt="Gemini Logo"
            className="w-20 h-20"
          />
          <h1 className="text-xl font-medium text-white text-center font-press-start mr-9">Save point</h1>
        </div>
        <h2 className="text-lg font-bold mb-6 text-center text-white font-press-start">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Insira seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black placeholder-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Insira sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 p-2 w-full pr-20 border border-gray-300 rounded-md text-black placeholder-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 sm:text-sm"
              />
              {password && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs leading-5 text-blue-500 hover:text-blue-700 focus:outline-none"
                >
                  {showPassword ? 'Esconder' : 'Mostrar'}
                </button>
              )}
            </div>
          </div>
          <button type="submit" className="w-full bg-custom-button text-white p-2 rounded-md hover:bg-custom-button hover:opacity-75">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
