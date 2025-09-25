import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN } from "../graphql/mutation/user.mutation";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client/react";

const Login = ({setUser}) => {
  const navigate = useNavigate();
  const [login, { loading }] = useMutation(LOGIN);
  const [logindata, setLoginData] = useState({
    username: "",
    password: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { input: logindata } });
      const loggedInUser = data.login;

      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUser(loggedInUser); // Now this will work
      toast.success(`Welcome back, ${loggedInUser.name}!`);
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <>
      <div className="flex w-full h-screen flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="userName"
                className="block text-sm/6 font-medium text-gray-100"
              >
                UserName
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  onChange={handleChange}
                  value={logindata.username}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-100"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={handleChange}
                  value={logindata.password}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Alredy have an acount?{" "}
            <Link
              to={"/signup"}
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Create an acount
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
