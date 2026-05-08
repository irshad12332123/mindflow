import React, { useState } from 'react';
import { loginUser } from '../../services/auth.ts';

const LoginCard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await loginUser(email, password);
      // Handle success (e.g., redirect to dashboard)
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-3xl bg-surface-container-low/40 backdrop-blur-2xl border border-white/5 shadow-2xl">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 mb-6 shadow-glow-purple">
          <span className="material-symbols-outlined text-primary text-3xl">waves</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">MindFlow</h2>
        <p className="text-on-surface-variant text-sm">Enter your workspace to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-label-caps text-on-surface-variant font-medium">Workspace Email</label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-xl group-focus-within:text-primary transition-colors"></span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-black placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-label-caps text-on-surface-variant font-medium">Password</label>
            <a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors">Forgot password?</a>
          </div>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-xl group-focus-within:text-primary transition-colors">lock</span>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-black placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary-light text-white font-bold py-4 rounded-xl shadow-glow-primary transition-all active:scale-[0.98] flex items-center justify-center gap-2 group overflow-hidden relative"
        >
          <span className="relative z-10">{isLoading ? 'AUTHENTICATING...' : 'CONTINUE'}</span>
          {!isLoading && <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1 relative z-10"></span>}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
        </button>
      </form>

      <div className="relative my-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-surface-container-low/40 px-4 text-on-surface-variant">Or</span>
        </div>
      </div>

      <div className="space-y-4">
        <button className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white py-3.5 rounded-xl transition-all">
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5 opacity-80" alt="Google" />
          <span className="text-sm font-medium">Continue with Google</span>
        </button>
        
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center p-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl transition-all">
            <span className="material-symbols-outlined">terminal</span>
          </button>
          <button className="flex items-center justify-center p-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl transition-all">
            <span className="material-symbols-outlined">fingerprint</span>
          </button>
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-on-surface-variant">
        Don't have an account? <a href="#" className="text-white hover:text-primary transition-colors font-semibold underline underline-offset-4 decoration-primary/30">Sign up</a>
      </p>
    </div>
  );
};

export default LoginCard;