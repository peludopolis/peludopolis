"use client";

import { AuthContext } from "../../contexts/authContext";
import { login } from "../../service/auth";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import validator from "validator";

const LoginForm = () => {
    const { setUser } = useContext(AuthContext);
    const router = useRouter();

    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [touched, setTouched] = useState({ email: false, password: false });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await login(data);
        if (res.statusCode) {
            alert(res.message);
        } else {
            alert("Ingreso exitoso");
            setUser(res);
            router.push("/");
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:3001/login"; // Redirige al endpoint de login con Google
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        setTouched({ ...touched, [e.target.name]: true });
    };

    const validateEmail = (e: string) => {
        let validation = "";
        if (!validator.isEmail(e)) validation = "Wrong email address";
        return validation;
    };

    const validatePassword = (p: string) => {
        let validation = "";
        if (!validator.isLength(p, { min: 4, max: 8 })) validation = "Min 4, max 8";
        return validation;
    };

    useEffect(() => {
        setErrors({
            email: validateEmail(data.email),
            password: validatePassword(data.password),
        });
    }, [data]);

    return (
        <form className="max-w-sm mx-auto flex flex-col gap-3 m-20" onSubmit={(e) => handleSubmit(e)}>
            <div>
                <h1 className="m-5 text-center font-bold text-black">Soy Cliente</h1>
                <h3 className="text-black">
                    Si ya eres parte de Peludópolis, inicia sesión con tu correo electrónico y contraseña o utiliza Google.
                </h3>
                <label className="block mb-2 text-sm font-medium mt-4 text-black" htmlFor="">
                    Usuario
                </label>
                <input
                    type="text"
                    className="bg-white border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black"
                    placeholder="name@email.com"
                    name="email"
                    onChange={(e) => handleChange(e)}
                    value={data.email}
                    onBlur={(e) => handleBlur(e)}
                />
                {touched.email && <p className="text-black">{errors.email}</p>}
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium text-black" htmlFor="">
                    Contraseña
                </label>
                <input
                    type="password"
                    className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                    value={data.password}
                    onBlur={(e) => handleBlur(e)}
                />
                {touched.password && <p className="text-black">{errors.password}</p>}
            </div>

            <button
                type="submit"
                className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
                Iniciar Sesión
            </button>

            <button
                type="button"
                onClick={handleGoogleLogin}
                className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-3"
            >
                Iniciar Sesión con Google
            </button>

            <a href="/forgot-password" className="text-blue-500 hover:text-blue-700 text-sm mt-2 inline-block">
                ¿Olvidaste tu contraseña?
            </a>
        </form>
    );
};

export default LoginForm;
