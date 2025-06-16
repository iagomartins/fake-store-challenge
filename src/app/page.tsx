"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import User from "@/types/User";

function Body() {
  const router = useRouter();
  const [users] = useState<User[]>([]);
  const [usernameValue, setUsernameValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [loading, setLoading] = useState(false);

  function handleUsernameChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setUsernameValue(event.target.value);
  }

  function handlePasswordChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setPasswordValue(event.target.value);
  }

  function submitLogin(): User {
    setLoading(true);
    const user = users.find((e) => {
      return e.email === usernameValue && e.password === passwordValue;
    });

    if (user?.id) {
      sessionStorage.setItem('id', user.id.toString());
      sessionStorage.setItem('email', user.email);
      sessionStorage.setItem('password', user.password);
      sessionStorage.setItem('name', user.name);
      sessionStorage.setItem('role', user.role);
      sessionStorage.setItem('avatar', user.avatar);
      sessionStorage.setItem('creationAt', user.creationAt);
      sessionStorage.setItem('updatedAt', user.updatedAt);
      router.push('/gallery');
      return user;
    }
    else {
      setLoading(false);
      toast.error('Usuário ou senha inválidos!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return {
        id: 0,
        email: '',
        password: '',
        name: '',
        role: '',
        avatar: '',
        creationAt: '',
        updatedAt: ''
      };
    }
  }

  async function fetchUsersData() {
    await axios
      .get<User[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`)
      .then(({ data }) => {
        data.forEach((e) => {
          users.push(e);
        })
      });
  }

  useEffect(() => {
    fetchUsersData();
  }, []);

  return (
    <main className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {loading && <div className="ofuscate-background"><div className="loading-spinner">Carregando...</div></div>}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Fake Store E-Commerce"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-100">
          Autenticação de usuário
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-200"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={usernameValue}
                onChange={handleUsernameChange}
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-200"
              >
                Senha
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Esqueceu a senha?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={passwordValue}
                onChange={handlePasswordChange}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <span
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={submitLogin}
            >
              Log in
            </span>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Não possui cadastro?{" "}
          <a
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Criar conta
          </a>
        </p>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Body />
  )
}
