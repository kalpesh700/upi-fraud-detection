import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Login({ closeModal }) {
  const navigate = useNavigate(); // Hook to navigate
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Example hardcoded credentials check
    if (data.Email === "admin@admin" && data.password === "admin") {
      // Set logged in state in localStorage
      localStorage.setItem("isLoggedIn", "true");

      // Close modal
      closeModal();

      // Navigate to upload page
      navigate('/upload');
    } else {
      // Alert for incorrect credentials
      alert("Invalid credentials");
    }
  };

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <h3 className="font-bold text-lg">Login</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          {/* Email Input */}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Email"
              {...register('Email', { required: 'Email is required' })}
            />
          </label>
          {errors.Email && <span className="text-red-500">{errors.Email.message}</span>}

          {/* Password Input */}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              className="grow"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
            />
          </label>
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}

          {/* Submit Button */}
          <div>
            <button type="submit" className="btn btn-primary w-full">Login</button>
            <p>
              Not Registered?{' '}
              <Link to="/signup" className="underline text-blue-500 cursor-pointer">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default Login;
