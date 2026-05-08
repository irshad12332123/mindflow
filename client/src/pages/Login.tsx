import React from 'react';
import LoginCard from '../components/auth/LoginCard';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#101415] flex flex-col lg:flex-row relative overflow-hidden">
      {/* Left Branding/Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-purple-900/20 to-black p-16 flex-col justify-start items-start">
        <div className="z-10 max-w-lg">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-lg flex items-center justify-center border border-white/10 shadow-glow-purple">
              <span className="material-symbols-outlined text-primary text-2xl">psychology</span>
            </div >
            <span className="font-h3 text-h3 font-bold tracking-tight text-white uppercase">MindFlow</span>
          </div>
          
          <h1 className="font-h1 text-h1 font-extrabold text-white leading-tight mb-6">
            Reclaim your mind. <br />
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Own your execution.</span>
          </h1>
          
          <p className="text-on-surface-variant text-body-lg mb-12 max-w-md">
            A high-performance workspace designed for deep focus, modular flexibility, and cognitive tranquility.
          </p>

          <div className="flex gap-12">
            <div>
              <p className="text-white font-bold text-2xl">10x</p>
              <p className="text-on-surface-variant text-sm">Cognitive Load Reduction</p>
            </div>
            <div>
              <p className="text-white font-bold text-2xl">Focus</p>
              <p className="text-on-surface-variant text-sm">State Management</p>
            </div>
          </div>
        </div>
        
        {/* Background Decorative Element */}
        <div className="absolute bottom-0 right-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-primary/20 blur-[120px] rounded-full"></div>
        </div>
      </div>

      {/* Right Login Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <LoginCard />
      </div>

      {/* Mobile Help Button */}
      <button className="fixed bottom-6 right-6 w-10 h-10 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors">
        <span className="material-symbols-outlined text-on-surface-variant text-xl">help</span>
      </button>
    </div>
  );
};

export default Login;