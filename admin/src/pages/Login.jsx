import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { FiEye, FiEyeOff, FiMail, FiLock, FiGithub, FiTwitter, FiUserPlus } from "react-icons/fi";
import { FaGoogle, FaApple } from "react-icons/fa";

// internal imports
import Error from "@/components/form/others/Error";
import LabelArea from "@/components/form/selectOption/LabelArea";
import InputArea from "@/components/form/input/InputArea";
import ImageLight from "@/assets/img/login-office.jpeg";
import ImageDark from "@/assets/img/login-office-dark.jpeg";
import useLoginSubmit from "@/hooks/useLoginSubmit";

const LoginModern = () => {
  const { t } = useTranslation();
  const { onSubmit, register, handleSubmit, errors, loading } = useLoginSubmit();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/20 p-4 md:p-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl dark:bg-purple-600/10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl dark:bg-blue-600/10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-200/10 to-pink-200/10 rounded-full blur-3xl dark:from-purple-500/5 dark:to-pink-500/5"></div>
      </div>

      <div className="relative w-full max-w-lg">
        {/* Floating glass cards */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-purple-500/30 backdrop-blur-3xl rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-500/30 backdrop-blur-3xl rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>

        <div className="relative backdrop-blur-2xl bg-white/40 dark:bg-gray-900/40 rounded-3xl shadow-2xl overflow-hidden border border-white/50 dark:border-white/10 ring-1 ring-white/20">

          {/* Form Section */}
          <div className="relative p-8 md:p-10">
            {/* Reduced Floating Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-50"></div>

            <div className="max-w-md mx-auto">
              {/* Header */}
              <div className="text-center mb-10 ">
                <img
                  className="h-20 w-auto animate-[spin_6s_linear_infinite] mx-auto mb-2"
                  src="/logo/Precious.svg"
                  alt="Precious"

                />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-200">
                  Admin Login
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Sign in to access specific analytics</p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email Input */}
                <div className="group space-y-2">
                  <LabelArea label="Email Address" />
                  <div className="relative transition-all duration-300 group-focus-within:-translate-y-1">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                      {/* <FiMail className="w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" /> */}
                    </div>
                    <InputArea
                      required
                      register={register}
                      label="Email"
                      name="email"
                      type="email"
                      autoComplete="username"
                      placeholder="admin@preciouscraft.com"
                      className="pl-12 h-12 bg-white/50 dark:bg-black/20 border border-gray-200/50 dark:border-gray-700/50 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 rounded-xl backdrop-blur-sm transition-all duration-300"
                    />
                  </div>
                  <Error errorName={errors.email} />
                </div>

                {/* Password Input */}
                <div className="group space-y-2">
                  <div className="flex items-center justify-between">
                    <LabelArea label="Password" />
                    <Link
                      to="/forgot-password"
                      className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative transition-all duration-300 group-focus-within:-translate-y-1">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                      {/* <FiLock className="w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" /> */}
                    </div>
                    <InputArea
                      required
                      register={register}
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className="pl-12 pr-12 h-12 bg-white/50 dark:bg-black/20 border border-gray-200/50 dark:border-gray-700/50 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 rounded-xl backdrop-blur-sm transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                      {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                    </button>
                  </div>
                  <Error errorName={errors.password} />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    disabled={loading}
                    isLoading={loading}
                    type="submit"
                    className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {loading ? "Signing in..." : t("LoginTitle")}
                  </Button>
                </div>
              </form>

              {/* Social Login Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-gray-500 dark:text-gray-400 font-medium bg-clip-text">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 h-11 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:scale-[1.02] transition-all duration-200">
                  <FaGoogle className="text-red-500 text-lg" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Google</span>
                </button>
                <button className="flex items-center justify-center gap-3 h-11 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:scale-[1.02] transition-all duration-200">
                  <FaApple className="text-gray-900 dark:text-white text-lg" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Apple</span>
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link to="/signup" className="font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModern;