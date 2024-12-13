"use client";

import { AuthContext } from "../../contexts/authContext";
import { login } from "../../service/auth";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import validator from "validator";

const LoginForm = () => {

const { setUser } = useContext(AuthContext); // Obtiene la función setUser del contexto de autenticación

const router = useRouter(); // Obtiene la función de enrutamiento de Next.js

    const [data, setData] = useState({email: "", password: ""}); // Estado para almacenar los datos del formulario (correo electrónico y contraseña)
    const [errors, setErrors] = useState({email: "", password: ""});  // Estado para almacenar los errores de validación del formulario
    const [touched, setTouched] = useState({email: false, password: false}); // Estado para rastrear si los campos del formulario han sido tocados por el usuario

    // Función para manejar el envío del formulario
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del formulario (recarga de página)
        const res = await login(data); // Llama a la función de inicio de sesión con los datos del formulario y espera la respuesta
        if (res.statusCode) {
            alert(res.message); // Muestra un mensaje de alerta con el mensaje de error de la respuesta
        } else {
            alert("Ingreso exitoso");
            setUser(res); // Establece el usuario autenticado en el contexto de autenticación
            router.push("/"); // Redirige al usuario a la página principal
        }
    };

     // Función para manejar los cambios en los campos del formulario
    const handleChange = (e: 
        ChangeEvent<HTMLInputElement>) => {
            setData({...data, [e.target.name]: e.target.value}); // Actualiza el estado de los datos del formulario con el valor del campo cambiado
    };

     // Función para manejar el evento de pérdida de foco en los campos del formulario
    const handleBlur = (e: 
        ChangeEvent<HTMLInputElement>) => {
            setTouched({...touched, [e.target.name]: true}); // Actualiza el estado de los campos tocados del formulario
    };

     // Función para validar la dirección de correo electrónico
    const validateEmail = (e: string) => {
        let validation = "";
        if (!validator.isEmail(e)) validation = "Wrong email address"; // Verifica si la dirección de correo electrónico es válida utilizando la biblioteca validator
        return validation;
    };

     // Función para validar la contraseña
    const validatePassword = (p: string) => {
        let validation = ""; // Inicializa la variable de validación como una cadena vacía
        if (!validator.isLength(p, {min: 4, max: 8})) 
            validation = "Min 4, max 8";
        return validation;
    }

     // Efecto secundario que se ejecuta cada vez que cambian los datos del formulario o los campos tocados
    useEffect(()=>{
        setErrors({email: validateEmail(data.email),  
                    password: validatePassword(data.password),   
        });
    }, [data]); // El efecto se ejecuta cuando cambian los datos del formulario o los campos tocados
 
return (
<form className="max-w-sm mx-auto flex flex-col gap-3 m-20" onSubmit={(e) => handleSubmit(e)}> 
    <div>
        <h1 className="m-5 text-center font-bold text-black">Soy Cliente</h1>
        <h3 className="text-black">Si ya eres parte de Peludópolis. Inicia sesión con tu correo electrónico y contraseña.</h3>
        <label 
        className="block mb-2 text-sm font-medium mt-4 text-black"
        htmlFor="">
            Usuario
        </label>
        <input type="text" 
        className="bg-white border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="name@email.com"
        name="email"
        onChange={(e)=>handleChange(e)} // Llama a handleChange cuando cambia el valor
        value={data.email}
        onBlur={(e)=> handleBlur(e)}  // Llama a handleBlur cuando el campo pierde el foco
        />
        {touched.email &&  
        <p className="text-black">{errors.email}</p>}
    </div>
    
    <div>
        <label 
        className="block mb-2 text-sm font-medium text-black"
        htmlFor="">
            Contraseña
        </label>
        <input type="password" 
        className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="password"
        name="password"
        onChange={(e)=>handleChange(e)}
        value ={data.password}
        onBlur={(e)=> handleBlur(e)}
        />
        {touched.password &&
        <p className="text-black">{errors.password}</p>}
    </div>
    <button type="submit"
    className={"text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" 

    }> Iniciar Sesion </button>

    <a href="/forgot-password" className="text-blue-500 hover:text-blue-700 text-sm mt-2 inline-block">
        ¿Olvidaste tu contraseña?
    </a>

    
</form>
)
}

export default LoginForm;