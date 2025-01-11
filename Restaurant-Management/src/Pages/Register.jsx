import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider/AuthProvier";
import bgImage from "../assets/Register.jpg";

const Register = () => {
  const navigate = useNavigate();
  const { loginGoogle, createUserEmail, userUpdate } = useContext(AuthContext);

  const handleLogin = () => {
    loginGoogle()
    .then(()=>{
      Swal.fire("Success!", "You logged in successfully", "success");
      navigate("/");
    })
    .catch((error)=>{
      Swal.fire("Sorry", "Something went wrong", error)
    })
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      Swal.fire("Error", "Your password must be at least 6 characters", "error");
      return;
    } else if (!/[A-Z]/.test(password)) {
      Swal.fire(
        "Error",
        "Your password must contain at least one uppercase letter",
        "error"
      );
      return;
    } else if (!/(?=.*[@$!%*?&])/.test(password)) {
      Swal.fire(
        "Error",
        "Your password must include at least one special character",
        "error"
      );
      return;
    }

    createUserEmail(email, password)
      .then(() => {
        userUpdate(name, photo).then(() => {
          Swal.fire("Success!", "Account created successfully", "success");
          navigate("/");
        });
      })
      .catch((error) => {
        console.error(error.message);
        Swal.fire("Error", "Something went wrong", "error");
      });

    form.reset();
  };

  return (
    <div
      className="min-h-screen flex items-center py-10 justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="backdrop-blur-lg bg-white/10 border border-white/30 rounded-xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Register Now
        </h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-1">Photo URL</label>
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-white mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 underline">
            Login
          </Link>
        </p>
        <div className="mt-6 text-center">
          <button
            onClick={() => handleLogin()}
            className="flex items-center justify-center w-full bg-white/20 border border-white/30 text-white py-2 rounded-lg hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FcGoogle className="text-2xl mr-2" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
