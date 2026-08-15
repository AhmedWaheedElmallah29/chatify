import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, MessageSquare, LogIn } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {
  const { login, isLoggingIn } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(form);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-5xl bg-base-100 shadow-2xl flex-row overflow-hidden rounded-3xl">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 sm:p-14 flex flex-col justify-center">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 shadow-sm">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Welcome Back
            </h1>
            <p className="text-base-content/60 mt-2 text-lg">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40 z-10">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered w-full pl-11 focus:input-primary transition-all duration-300"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40 z-10">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-11 pr-11 focus:input-primary transition-all duration-300"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-base-content/40 hover:text-base-content transition-colors z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full shadow-md hover:shadow-xl transition-all duration-300 mt-2"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-base-content/60">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="link link-primary no-underline hover:underline font-semibold transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Decorative Section */}
        <div className="hidden lg:flex w-1/2 bg-primary/10 items-center justify-center p-12 relative overflow-hidden">
          {/* Decorative background circles */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-md text-center">
            <div className="flex justify-center mb-10 gap-6">
              <div className="w-20 h-20 bg-primary rounded-3xl shadow-xl flex items-center justify-center transform -rotate-6 transition-transform hover:scale-105 duration-300">
                <LogIn className="w-10 h-10 text-primary-content" />
              </div>
              <div className="w-20 h-20 bg-secondary rounded-3xl shadow-xl flex items-center justify-center transform rotate-6 transition-transform hover:scale-105 duration-300">
                <MessageSquare className="w-10 h-10 text-secondary-content" />
              </div>
            </div>
            <h2 className="text-4xl font-extrabold mb-5 tracking-tight text-base-content">
              Welcome Back!
            </h2>
            <p className="text-base-content/70 text-lg leading-relaxed">
              We're so excited to see you again. Sign in to reconnect with your
              friends and community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
