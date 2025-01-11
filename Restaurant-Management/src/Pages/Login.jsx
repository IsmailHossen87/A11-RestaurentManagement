import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthProvider/AuthProvier";
import bgImage from "../assets/login.jpg";
import { IoLogoGithub } from "react-icons/io";

const Login = () => {
  const location = useLocation();
  const from = location.state || "/";
  const navigate = useNavigate();

  const { loginGoogle, loginByemail ,gitHub} = useContext(AuthContext);

  const handleloginGoogle = () => {
    loginGoogle()
    .then(() => {
      Swal.fire("Good job!", "You login successfully", "success");
      navigate(from);
    })
    .catch((error) => {
      console.error(error.message);
      Swal.fire("Sorry", "Google login failed. Please try again.", "error");
    });
  };
  const handleGitHub = ()=>{
    gitHub
    .then(()=>{
      Swal.fire("Good job!", "You login successfully", "success");
      navigate(from)
    })
  }

  const handleLoginEmail = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    loginByemail(email, password)
      .then((res) => {
        Swal.fire("Good job!", "You login successfully", "success");
        navigate(from);
      })
      .catch((error) => {
        Swal.fire("Sorry", "Something went wrong", error);
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="backdrop-blur-md bg-white bg-opacity-20 shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-4xl text-center font-bold text-white mb-6">
          Login now!
        </h1>
        <form onSubmit={handleLoginEmail} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-white bg-opacity-30 text-white placeholder-gray-300 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          {/* Password Input */}
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-white bg-opacity-30 text-white placeholder-gray-300 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <a
              href="#"
              className="text-sm text-orange-300 hover:text-orange-500 mt-2 block"
            >
              Forgot password?
            </a>
          </div>
          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Login
            </button>
          </div>
        </form>
        {/* Google Login */}
        <div className="mt-6 flex flex-col items-center  space-y-3 ">
          <div>
            <button
              onClick={() => handleloginGoogle()}
              className="flex items-center bg-white bg-opacity-30 text-white px-4 py-2 rounded-lg hover:bg-opacity-40 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <FcGoogle className="text-2xl mr-2" />
              login with Google
            </button>
          </div>

          {/* gitHub */}
          <div>
            <button
              onClick={() => handleGitHub()}
              className="flex items-center bg-white bg-opacity-30 text-white px-4 py-2 rounded-lg hover:bg-opacity-40 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <IoLogoGithub className="text-2xl mr-2" />
              login with GitHub
            </button>
          </div>
        </div>
        {/* Register Link */}
        <p className="mt-4 text-center text-sm text-white">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-orange-300 hover:text-orange-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
