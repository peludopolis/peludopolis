"use client";

import { GoogleLogin } from "@react-oauth/google";
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
                id: undefined,
            },
            login: true,
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
        <form className="max-w-sm mx-auto flex flex-col gap-3 m-20" onSubmit={(e) => handleSubmit(e)}>
            <div>
                <h1 className="m-5 text-center font-bold text-black">Soy Cliente</h1>
                <h3 className="text-black">
                    Si ya eres parte de Peludópolis, inicia sesión con tu correo electrónico y contraseña o utiliza Google.
                </h3>

                {/* Formulario con usuario y contraseña */}
                {!isLoginWithGoogle ? (
                    <>
                        <label className="block mb-2 text-sm font-medium mt-4 text-black" htmlFor="email">
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

                        <label className="block mb-2 text-sm font-medium text-black" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="********"
                            name="password"
                            onChange={(e) => handleChange(e)}
                            value={data.password}
                            onBlur={(e) => handleBlur(e)}
                        />
                        {touched.password && <p className="text-black">{errors.password}</p>}

                        <button
                            type="submit"
                            className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-3"
                        >
                            Iniciar Sesión
                        </button>
                    </>
                ) : (
                    // Login con Google
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleFailure}
                    />
                )}

                <div className="flex gap-3 mt-3">
                    <button
                        type="button"
                        onClick={() => setIsLoginWithGoogle(!isLoginWithGoogle)} // Cambia entre los dos métodos de login
                        className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        {isLoginWithGoogle ? "Usar correo y contraseña" : "Iniciar sesión con Google"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;