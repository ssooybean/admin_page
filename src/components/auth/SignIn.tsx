import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { auth } from "@/firebase";
import { RootState } from "@/redux/store";
import { setAuth } from "@/redux/slices/authSlice";

type Inputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  const authEmail = useSelector((state: RootState) => state.user.authEmail);
  const navigate = useNavigate();

  useEffect(() => {
    if (authEmail) {
      if (authEmail === "alisalisamur20@gmail.com") navigate("/admin_panel");
      else navigate("/user_panel");
    }
  }, [authEmail, navigate]);

  const dispatch = useDispatch();
  const [notAuth, setNotAuth] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((data) => {
        setNotAuth(false);
        reset();
        dispatch(setAuth(data.user.email || ""));

        if (data.user.email === "alisalisamur20@gmail.com") {
          navigate("/admin_panel");
        } else {
          navigate("/user_panel");
        }
      })
      .catch((er) => {
        console.log(er);
        setNotAuth(true);
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full xs:w-[400px] border rounded-[12px] shadow-xl p-5 grid gap-5 m-auto absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <h1 className="font-semibold text-[24px] lg:text-[36px] leading-[24px] lg:leading-[36px] w-fit m-auto mb-2">
        Оракул
      </h1>
      <div>
        <label className="flex flex-col gap-1 text-[#646464] w-full">
          E-mail
          <input
            type="email"
            className="text-[#1C1c1c] border px-4 py-1 rounded outline-blue-500"
            {...register("email", {
              required: true,
              pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
            })}
          />
        </label>
        {errors.email && (
          <span className="text-[13px] text-red-700">
            Это поле обязятельно для заполнения!
          </span>
        )}
      </div>
      <div>
        <label className="flex flex-col gap-1 text-[#646464] relative w-full">
          Пароль
          <input
            className="text-[#1C1c1c] border px-4 py-1 rounded outline-blue-500 pr-10"
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true })}
          />
          {watch("password") && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute bottom-2 right-2"
            >
              {showPassword ? (
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 2L22 22"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  fill="#000000"
                  width="20px"
                  height="20px"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 4.4C3.439 4.4 0 9.232 0 10c0 .766 3.439 5.6 10 5.6 6.56 0 10-4.834 10-5.6 0-.768-3.44-5.6-10-5.6zm0 9.907c-2.455 0-4.445-1.928-4.445-4.307S7.545 5.691 10 5.691s4.444 1.93 4.444 4.309-1.989 4.307-4.444 4.307zM10 10c-.407-.447.663-2.154 0-2.154-1.228 0-2.223.965-2.223 2.154s.995 2.154 2.223 2.154c1.227 0 2.223-.965 2.223-2.154 0-.547-1.877.379-2.223 0z" />
                </svg>
              )}
            </button>
          )}
        </label>

        {errors.password && (
          <span className="text-[13px] text-red-700">
            Это поле обязятельно для заполнения!
          </span>
        )}
      </div>
      <input
        value={"Войти"}
        className="mt-3 outline-none cursor-pointer border rounded-[12px] text-white bg-blue-500 border-blue-500 py-1 transition-all hover:bg-transparent hover:text-blue-500 active:bg-blue-700 active:text-white"
        type="submit"
      />
      {notAuth && (
        <span className="text-center w-full text-red-700">
          Неправильно введен e-mail и/или пароль
        </span>
      )}
    </form>
  );
};
export default SignIn;
