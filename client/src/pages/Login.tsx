import React from "react";

const Login = () => {
  return (
    <div className="h-screen overflow-hidden bg-[#070B14] flex">
      
      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#0B1020] via-[#111827] to-black px-8 py-10 flex-col justify-center overflow-hidden">

        {/* Glow */}
        <div className="absolute top-[-120px] left-[-120px] w-[260px] h-[260px] bg-purple-600/20 blur-[120px] rounded-full"></div>

        <div className="absolute bottom-[-120px] right-[-120px] w-[240px] h-[240px] bg-blue-500/20 blur-[120px] rounded-full"></div>

        {/* Content */}
        <div className="relative z-10 max-w-sm">

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <span className="text-blue-400 text-lg">✦</span>
            </div>

            <h1 className="text-white text-3xl font-bold">
              MindFlow
            </h1>
          </div>

          {/* Heading */}
          <h1 className="text-[48px] leading-[56px] font-extrabold text-white mb-5">
            Reclaim your
            <br />

            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              mind.
            </span>

            <br />

            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Own your
            </span>

            <br />

            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              execution.
            </span>
          </h1>

          {/* Paragraph */}
          <p className="text-gray-400 text-[15px] leading-7 mb-8">
            A high-performance workspace designed for deep focus,
            modular flexibility, and cognitive tranquility.
          </p>

          {/* Stats */}
          <div className="flex gap-10">
            <div>
              <h2 className="text-white text-2xl font-bold">
                10x
              </h2>

              <p className="text-gray-500 text-xs mt-1">
                Cognitive Load Reduction
              </p>
            </div>

            <div>
              <h2 className="text-white text-2xl font-bold">
                Focus
              </h2>

              <p className="text-gray-500 text-xs mt-1">
                State Management
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 bg-[#0A0F1C]">

        <div className="w-full max-w-sm bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-7 shadow-2xl">

          {/* Title */}
          <div className="mb-7">
            <h1 className="text-white text-4xl font-bold mb-2">
              MindFlow
            </h1>

            <p className="text-gray-400 text-sm">
              Enter your workspace to continue
            </p>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-gray-300 text-sm block mb-2">
              Workspace Email
            </label>

            <input
              type="email"
              placeholder="name@company.com"
              className="w-full bg-[#1A2234] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="text-gray-300 text-sm block mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#1A2234] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
            />
          </div>

          {/* Continue */}
          <button className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:scale-[1.01] transition-all">
            Continue
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-[1px] bg-white/10"></div>

            <p className="text-gray-500 text-xs">OR</p>

            <div className="flex-1 h-[1px] bg-white/10"></div>
          </div>

          {/* Google */}
          <button className="w-full py-3 rounded-xl bg-[#1A2234] text-white border border-white/10 hover:bg-[#232E45] transition-all mb-3">
            Continue with Google
          </button>

          {/* Bottom Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="py-3 rounded-xl bg-[#1A2234] text-white border border-white/10 hover:bg-[#232E45] transition-all">
              GitHub
            </button>

            <button className="py-3 rounded-xl bg-[#1A2234] text-white border border-white/10 hover:bg-[#232E45] transition-all">
              OTP
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 mt-5 text-sm">
            Don’t have an account?{" "}
            <span className="text-blue-400 cursor-pointer">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;