import { useForm } from "react-hook-form";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserAuth from "../utils/useAuth";
import { useEffect, useState } from "react";
function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const login = useUserAuth((state) => state.login);

  const { isAuthenticated } = useUserAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const apiUrl = import.meta.env.VITE_API_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await axios
      .post(
        `${apiUrl}/auth/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          login(res.data.user, res.data.userID);
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        if (err.status === 401 || err.status === 404)
          setLoginError(err.response.data.message);
      });
  };

  const handleSignup = () => {
    navigate("/signup");
  };
  return (
    <div className="h-screen w-screen flex">
      <div className="w-5/12 flex justify-center pt-28 bg-custom-bg bg-cover"></div>
      <div className="w-7/12 flex justify-center items-center flex-col">
        <div className="w-5/12">
          <div>
            <p className="text-3xl font-semibold pb">Login</p>
            <p className="text-gray-600 text-lg pb-8">
              Access your spot—log in now! 🅿️🚀
            </p>
          </div>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="relative flex flex-col">
              <input
                type="email"
                id="email"
                name="email"
                placeholder=""
                className="peer input-style"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              <label htmlFor="email" className="label-style">
                Enter email
              </label>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 ml-5">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative flex flex-col ">
              <input
                type="password"
                id="password"
                name="password"
                placeholder=""
                className="peer input-style"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                  },
                })}
              />
              <label htmlFor="password" className="label-style">
                Enter password
              </label>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 ml-5">
                  {errors.password.message}
                </p>
              )}
              {<p className="text-red-500 text-sm mt-1 ml-5">{loginError}</p>}
            </div>
            <div className="flex justify-between items-center">
              <p className="hover:underline pl-1 cursor-pointer text-zinc-800 ">
                Forgot Password ?
              </p>
              <button className="submit-button self-start" type="submit">
                Login
              </button>
            </div>
          </form>
          <div className="pt-12 flex flex-col items-start">
            <p className="pb-3 text-gray-600 text-lg">
              No account? No problem—register now and park smarter! 🅿️🚀
            </p>
            <button className="submit-button" onClick={handleSignup}>
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
