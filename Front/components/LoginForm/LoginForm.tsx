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
    const [isLoginWithGoogle, setIsLoginWithGoogle] = useState(false); // Estado para cambiar entre login

    // Manejador del submit con email y contraseña
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

    // Manejador del login con Google
    const handleGoogleSuccess = (credentialResponse: any) => {
        const token = credentialResponse.credential;
    
        // Decodifica el token para obtener la información del usuario
        const payload = JSON.parse(atob(token.split('.')[1]));  // Decodifica el JWT
    
        // Guarda la sesión en el localStorage
        localStorage.setItem('googleToken', token);
        localStorage.setItem('user', JSON.stringify({
            user: {
                name: payload.name,
                email: payload.email,
                picture: payload.picture,
                id: undefined,  // Puedes agregar otros campos si los tienes
            },
            login: true,
        }));
    
        // Actualiza el estado global del usuario
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
                user: undefined,
                services: []
            },
            login: true,
            id: ""
        });
    
        alert('Inicio de sesión exitoso');
        router.push('/');
    };
    

    const handleGoogleFailure = () => {
        alert("Error al iniciar sesión con Google");
    };

    // Manejador de cambios en los inputs
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Manejador de onBlur para marcar si el campo fue tocado
    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        setTouched({ ...touched, [e.target.name]: true });
    };

    // Validación de email
    const validateEmail = (e: string) => {
        let validation = "";
        if (!validator.isEmail(e)) validation = "Wrong email address";
        return validation;
    };

    // Validación de contraseña
    const validatePassword = (p: string) => {
        let validation = "";
        if (!validator.isLength(p, { min: 4, max: 8 })) validation = "Min 4, max 8";
        return validation;
    };

    // Actualización de errores en los campos
    useEffect(() => {
        setErrors({
            email: validateEmail(data.email),
            password: validatePassword(data.password),
        });
    }, [data]);

    return (
        <div className="flex items-center justify-center h-96 bg-gray-100">

            {/* Imagen del perro */}
            <div className="relative w-1/2 h-full bg-primary hidden lg:flex items-center justify-center">
                <Image
                    src="/images/perro2.png"
                    alt="Perro asomándose"
                    width={300}
                    height={400}
                    className="absolute bottom-0 right-0 object-contain"
                />
            </div>

            {/* Formulario */}
            <form
                className="flex flex-col justify-center p-8 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto lg:w-1/2 lg:max-w-none"
                onSubmit={(e) => handleSubmit(e)}
            >
                <h1 className="text-2xl font-bold text-center mb-4">¡Bienvenido a Peludópolis!</h1>
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

                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4 mb-1">
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