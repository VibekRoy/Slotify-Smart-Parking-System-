import { useForm } from "react-hook-form";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserAuth from "../state/useAuth";
import { useEffect, useState } from "react";
function Signup() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const login = useUserAuth((state) => state.login);
  const { isAuthenticated } = useUserAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  const apiUrl = import.meta.env.VITE_API_URL;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await axios
      .post(
        `${apiUrl}/auth/register`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      )
      .then(async (res) => {
        if (res.status === 200) {
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
                login(res.data.user);
                navigate("/dashboard");
              }
            })
            .catch((err) => {
              if (err.status === 401 || err.status === 404)
                setLoginError(err.response.data.message);
            });
        }
      })
      .catch((err) => {
        if (err.status === 409 || err.status === 500)
          setLoginError(err.response.data.message);
      });
  };
  const handleLogin = () => {
    navigate("/login");
  };

  const password = watch("password");
  return (
    <div className="h-screen w-screen flex">
      <div className="w-5/12 flex justify-center pt-28 bg-custom-bg bg-cover"></div>
      <div className="w-7/12 flex justify-center items-center flex-col">
        <div className="w-5/12">
          <div>
            <p className="text-3xl font-semibold pb">Signup</p>
            <p className="text-gray-600 text-lg pb-8">
              Secure your spot—sign up today! 🚗🅿️✨
            </p>
          </div>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="relative flex flex-col">
              <input
                type="name"
                id="name"
                name="name"
                placeholder=""
                className="peer input-style"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              <label htmlFor="name" className="label-style">
                Enter name
              </label>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 ml-5">
                  {errors.email.message}
                </p>
              )}
            </div>

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
            </div>

            <div className="relative flex flex-col ">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder=""
                className="peer input-style"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <label htmlFor="password" className="label-style">
                Confirm password
              </label>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 ml-5">
                  {errors.confirmPassword.message}
                </p>
              )}
              {<p className="text-red-500 text-sm mt-1 ml-5">{loginError}</p>}
            </div>
            <button className="submit-button self-start" type="submit">
              Signup
            </button>
          </form>
          <div className="pt-12 flex flex-col items-end">
            <p className="text-gray-600 text-lg pb-3">Already parked here? Log in now!</p>
            <button className="submit-button" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
