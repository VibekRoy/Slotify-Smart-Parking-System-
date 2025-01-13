import { useForm } from "react-hook-form";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
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
        if (res.status === 200) navigate("/dashboard");
      });
  };
  return (
    <div className="h-screen w-screen flex">
      <div className="w-5/12 flex justify-center pt-28 bg-custom-bg bg-cover"></div>
      <div className="w-7/12 flex justify-center items-center flex-col">
        <div className="w-5/12">
          <div>
            <p className="text-3xl font-semibold pb">Login</p>
            <p className="text-gray-600 text-lg pb-8">
              Please enter your login details
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
            </div>
            <button className="submit-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
