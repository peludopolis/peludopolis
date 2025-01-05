"use client";

import { GoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../../contexts/authContext";
import { login } from "../../service/auth";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import validator from "validator";
import Image from "next/image";

const LoginForm = () => {
    const { setUser } = useContext(AuthContext);
    const router = useRouter();

    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [touched, setTouched] = useState({ email: false, password: false });
    const [isLoginWithGoogle, setIsLoginWithGoogle] = useState(false);

<<<<<<< HEAD
=======
    const validateEmail = (email: string) => {
        if (!email.trim()) return ""; // No mostrar error si está vacío
        if (!validator.isEmail(email)) return "Correo electrónico no válido";
        return "";
    };

    const validatePassword = (password: string) => {
        if (!password.trim()) return ""; // No mostrar error si está vacío
        const hasMinLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[@$!%*?&]/.test(password);

        if (!hasMinLength) return "Debe tener al menos 8 caracteres";
        if (!hasUppercase) return "Debe incluir al menos una letra mayúscula";
        if (!hasNumber) return "Debe incluir al menos un número";
        if (!hasSpecialChar)
            return "Debe incluir al menos un carácter especial (@, $, !, %, *, ?, &)";
        return "";
    };
>>>>>>> f53e878d1b328acf835c86886781d361be12aa31

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Validar que los campos no estén vacíos antes de enviar
        if (!data.email.trim() || !data.password.trim()) {
            alert("Por favor complete todos los campos");
            return;
        }
        const res = await login(data);
        if (res.statusCode) {
            alert(res.message);
        } else {
            alert("Ingreso exitoso");
            localStorage.setItem("user", JSON.stringify({
                user: res.user,
                login: true,
                id: res.user.id,
            }));

            setUser({
                user: res.user,
                login: true,
                id: res.user.id,
            });

            router.push("/");
        }
    };

    const handleGoogleSuccess = (credentialResponse: any) => {
        const token = credentialResponse.credential;
<<<<<<< HEAD
        const payload = JSON.parse(atob(token.split('.')[1]));

        localStorage.setItem('googleToken', token);
        localStorage.setItem('user', JSON.stringify({
            user: {
                name: payload.name,
                email: payload.email,
                picture: payload.picture,
                id: undefined,
            },
            login: true,
        }));

=======
        const payload = JSON.parse(atob(token.split(".")[1]));
        localStorage.setItem("googleToken", token);
        localStorage.setItem(
            "user",
            JSON.stringify({
                user: {
                    name: payload.name,
                    email: payload.email,
                    picture: payload.picture,
                },
                login: true,
            })
        );
>>>>>>> f53e878d1b328acf835c86886781d361be12aa31

        setUser({
            user: {
                name: payload.name,
                email: payload.email,
                picture: payload.picture,
                id: 0,
                phone: "",
                address: "",
                login: false,
                token: "",
                services: []
            },
            login: true,
            id: "",
            isAdmin: false
        });

<<<<<<< HEAD
        alert('Inicio de sesión exitoso');
        router.push('/');
=======
        alert("Inicio de sesión exitoso");
        router.push("/");
>>>>>>> f53e878d1b328acf835c86886781d361be12aa31
    };

    const handleGoogleFailure = () => {
        alert("Error al iniciar sesión con Google");
    };

<<<<<<< HEAD

=======
>>>>>>> f53e878d1b328acf835c86886781d361be12aa31
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

<<<<<<< HEAD

=======
>>>>>>> f53e878d1b328acf835c86886781d361be12aa31
    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        setTouched({ ...touched, [e.target.name]: true });
    };

<<<<<<< HEAD
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

=======
>>>>>>> f53e878d1b328acf835c86886781d361be12aa31
    useEffect(() => {
        // Solo mostrar errores si el campo ha sido tocado
        setErrors({
            email: touched.email ? validateEmail(data.email) : "",
            password: touched.password ? validatePassword(data.password) : "",
        });
    }, [data, touched]);

    return (
        <div className="flex items-center justify-center h-96 bg-gray-100">
            <div className="relative w-1/2 h-full bg-primary hidden lg:flex items-center justify-center">
                <Image
                    src="/images/perro2.png"
                    alt="Perro asomándose"
                    width={300}
                    height={400}
                    className="absolute bottom-0 right-0 object-contain"
                />
            </div>
<<<<<<< HEAD

=======
>>>>>>> f53e878d1b328acf835c86886781d361be12aa31
            <form
                className="flex flex-col justify-center p-8 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto lg:w-1/2 lg:max-w-none"
                onSubmit={handleSubmit}
            >
                <h1 className="text-2xl font-bold text-center mb-4">
                    ¡Bienvenido a Peludópolis!
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Inicia sesión con tu correo electrónico y contraseña o utiliza Google.
                </p>

                {!isLoginWithGoogle ? (
                    <>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="tu@email.com"
                            className="block w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring focus:ring-primary"
                            onChange={handleChange}
                            value={data.email}
                            onBlur={handleBlur}
                        />
                        {touched.email && errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}

                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mt-4 mb-1"
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="********"
                            className="block w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring focus:ring-primary"
                            onChange={handleChange}
                            value={data.password}
                            onBlur={handleBlur}
                        />
                        {touched.password && errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}

                        <button
                            type="submit"
                            className="mt-6 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark focus:outline-none"
                            disabled={touched.email && touched.password && (!!errors.email || !!errors.password)}
                        >
                            Iniciar sesión
                        </button>
                    </>
                ) : (
                    <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
                )}

                <button
                    type="button"
                    onClick={() => setIsLoginWithGoogle(!isLoginWithGoogle)}
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none"
                >
                    {isLoginWithGoogle ? "Usar correo y contraseña" : "Iniciar sesión con Google"}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
