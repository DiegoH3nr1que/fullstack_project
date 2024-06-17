import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter(); // Inicializa o roteador

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setSuccess('');

    const userData = {
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/user/create/', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        setSuccess('User created successfully!');
        // Clear the form
        setFirstName('');
        setLastName('');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        // Redirect to login page
        setTimeout(() => {
          router.push('/login');
        }, 2000); // Redireciona após 2 segundos para que o usuário veja a mensagem de sucesso
      }
    } catch (error) {
      setError('Error creating user');
      console.error('Error creating user:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up - Save Point</title>
      </Head>
      <main className="bg-teal-800 min-h-screen flex items-center justify-center scroll-container ">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <img
              src="/images/Gemini_Generated_Image_sm9kpasm9kpasm9k-removebg-preview.png"
              alt="Gemini Logo"
              className="w-16 h-16"
            />
            <h1 className="text-2xl font-bold text-white mt-2">Save Point</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="first-name">First Name</label>
              <input
                type="text"
                id="first-name"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 mb-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="last-name">Last Name</label>
              <input
                type="text"
                id="last-name"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 mb-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 mb-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mb-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Choose a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mb-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div className="mb-6">
              <label className="block text-white mb-2" htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 mb-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
              {success && <p className="text-green-500 text-xs mt-2">{success}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-teal-700 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-white">
            Already have an account?{' '}
            <Link href="/login" passHref>
              <span className="text-blue-400 hover:text-blue-500 cursor-pointer">Login</span>
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default SignUp;
