import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full min-h-screen flex bg-[#E6F2E3] text-black overflow-hidden">
      <div className="w-1/2 bg-[#E6F2E3] flex items-center justify-center p-8">
        <img
          src="./images/can.png"
          alt="Illustration"
          className="max-h-[90vh] w-auto object-contain"
        />
      </div>


      <div className="w-1/2 bg-white flex items-center justify-center rounded-3xl m-8 shadow-xl">
        <div className="w-full max-w-md px-10 py-12">

          <h3 className="text-3xl font-bold text-green-700 mb-2 text-center ">Logo</h3>


          <h1 className="text-7xl font-semibold text-black mb-6 text-center">
            Create <br /> account
          </h1>


          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-zinc-100 text-black py-3 px-5 rounded-full outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-zinc-100 text-black py-3 px-5 rounded-full outline-none"
            />
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 transition-colors text-white py-3 rounded-full font-semibold"
              onClick={()=> navigate ('/')}
            >
              Create account
            </button>
          </form>

          <p className="text-sm text-zinc-500 text-center my-4">or sign up with</p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <button className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center shadow">
              {/* <img src="./images/google-icon.png" alt="G" className="h-5 w-5" /> */}
              G
            </button>
            <button className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center shadow">
              {/* <img src="./images/apple-icon.png" alt="Apple" className="h-5 w-5" /> */}
              #
            </button>
            <button className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center shadow">
              {/* <img src="./images/github-icon.png" alt="GitHub" className="h-5 w-5" /> */}
              $
            </button>
          </div>

          <p className="text-sm text-center text-zinc-500">
            Have an account?{' '}
            <a href="#" className="text-green-600 font-semibold hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
