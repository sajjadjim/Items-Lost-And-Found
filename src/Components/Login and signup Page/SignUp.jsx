import React, { use, useEffect } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import Lottie from 'lottie-react';
import registerLottie from '../../../public/register.json';
import { AuthContext_File } from '../../Authcontext/AuthProvider';
import { FcGoogle } from "react-icons/fc";
import { Navigate } from 'react-router';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';

const SignUp = () => {

  // dynamic Name write 
  useEffect(() => {
    document.title = 'Sign Up'
  })

  const location = useLocation()
  // console.log(location)
  const navigate = useNavigate()

  const { createUser, signInWithGoogle } = use(AuthContext_File)

  // users information send to the Database system 
  const handleAddNewUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newUser = Object.fromEntries(formData.entries())


    const email = e.target.email.value
    const password = e.target.password.value
    createUser(email, password).then(() => {

    }).catch((error) => {
      console.log(error)
    })
    // toast("Successfully Log in Done ✅");

    // Optional: Send taskData to your backend
    fetch('https://b11a11-server-side-sajjadjim.vercel.app/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'New User Added successfully',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
  }

  // Password validation function
  const isValidPassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 8;
    return hasUppercase && hasLowercase && isLongEnough;
  };

  // sign in with google here part code ----------------------
  const signInGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log('Google User:', user);
        toast.success("Successfully create account  with Google ✅");
        fetch('https://b11a11-server-side-sajjadjim.vercel.app/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
          }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.insertedId) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'New User Added successfully',
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })

        setTimeout(() => {
          navigate(`${location.state ? location.state : '/'}`);
        }, 2000);
      })
      .catch((error) => {
        console.error('Google sign-in error:', error);
        toast.error("Google Sign-in failed ❌");
      });
  };

  return (
    <div className="min-h-screen md:flex items-center justify-center  px-4 gap-10">
      <div className="max-w-md w-full  p-8 rounded-2xl border-white border shadow-md">
        <h2 className="text-3xl font-bold text-center  mb-6">Create an Account</h2>
        <form
          onSubmit={e => {
            const password = e.target.password.value;
            if (!isValidPassword(password)) {
              e.preventDefault();
              Swal.fire({
                icon: 'error',
                title: 'Invalid Password',
                text: 'Password must be at least 8 characters and contain both uppercase and lowercase letters.',
              });
              return;
            }
            handleAddNewUser(e);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block  text-sm mb-1">Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="Your name"
              required
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block  text-sm mb-1">Photo URL</label>
            <input
              name="photoUrl"
              type="url"
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required />
          </div>
          <div>
            <label className="block  text-sm mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block  text-sm mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-2">create account with in google</p>
          <button
            onClick={signInGoogle}
            className="w-full flex items-center justify-center space-x-2 text-black bg-white py-2 rounded-xl border border-gray-300 hover:shadow-md transition"
          >
            <FcGoogle />
            <span>Sign in with Google</span>
          </button>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>

      <div className="text-center lg:text-left">
        <Lottie className='w-50' animationData={registerLottie} loop={true}></Lottie>
      </div>
    </div>
  );
};

export default SignUp;