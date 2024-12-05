"use client";

import { register } from "../../service/auth"; 
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import validator from "validator";

const RegisterForm = () => {
const router = useRouter(); // // Instancia el hook de enrutamiento para redirigir al usuario

// Estado que contiene los datos del formulario
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phone: ""
    });
     // Estado que contiene los errores de validación de cada campo
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phone: ""
    });
     // Estado que indica si un campo ha sido tocado por el usuario o no
    const [touched, setTouched] = useState({
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
        address: false,
        phone: false
    });

    // Función que maneja el envío del formulario
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); //previene recargar la pagina
        if (data.password !== data.confirmPassword) {
            alert("Las contraseñas no coinciden");
        } else {
            alert("Registro exitoso");
        }
        //llama al servicio de registro
        const res = await register(data);
        if (res.statusCode) {
            alert(res.message);
        } else {
            alert("Registro exitoso");
            router.push("/login");
        }

    };

     // Función que maneja los cambios en los campos del formulario
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

     // Función que maneja el evento blur de los campos del formulario
    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        setTouched({ ...touched, [e.target.name]: true });
    };


    const validateName = (n: string) => {
        return n.length < 3 ? "El nombre debe tener al menos 3 caracteres" : "";
    };

    const validateEmail = (e: string) => {
        return !validator.isEmail(e) ? "Correo inválido" : "";
    };

    const validatePassword = (p: string) => {
        return !validator.isLength(p, { min: 4, max: 8 }) ? "La contraseña debe tener entre 4 y 8 caracteres" : "";
    };

    const validateConfirmPassword = (cp: string) => {
        return cp !== data.password ? "Las contraseñas no coinciden" : "";
    };

    const validateAddress = (a: string) => {
        return a.length < 1 ? "Ingrese una dirección" : "";
    };

    const validatePhone = (p: string) => {
        return !validator.isMobilePhone(p, 'any') ? "Número de teléfono inválido" : "";
    };

     // Efecto que se ejecuta cada vez que cambia el estado de los datos del formulario
    useEffect(() => {
        setErrors({
            name: validateName(data.name),
            email: validateEmail(data.email),
            password: validatePassword(data.password),
            confirmPassword: validateConfirmPassword(data.confirmPassword),
            address: validateAddress(data.address),
            phone: validatePhone(data.phone)
        });
    }, [data]); // Se ejecuta cada vez que cambia el estado de los datos del formulario

    return (
        <form className="max-w-sm mx-auto flex flex-col gap-3" onSubmit={handleSubmit}>
            <div>
                <label className="block mb-2 text-sm font-medium">Nombre</label>
                <input
                    type="text"
                    className="bg-white border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Nombre"
                    name="name"
                    onChange={handleChange}
                    value={data.name}
                    onBlur={handleBlur}
                />
                
                {touched.name && <p className="text-red">{errors.name}</p>}
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium">Correo Electrónico</label>
                <input
                    type="text"
                    className="bg-white border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="name@email.com"
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    onBlur={handleBlur}
                />
                {touched.email && <p className="text-red">{errors.email}</p>}
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium">Contraseña</label>
                <input
                    type="password"
                    className="bg-white border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Contraseña"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    onBlur={handleBlur}
                />
                {touched.password && <p className="text-red">{errors.password}</p>}
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium">Confirmar Contraseña</label>
                <input
                    type="password"
                    className="bg-white border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Confirmar contraseña"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={data.confirmPassword}
                    onBlur={handleBlur}
                />
                {touched.confirmPassword && <p className="text-red">{errors.confirmPassword}</p>}
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium">Dirección</label>
                <input
                    type="text"
                    className="bg-white border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Dirección"
                    name="address"
                    onChange={handleChange}
                    value={data.address}
                    onBlur={handleBlur}
                />
                {touched.address && <p className="text-red">{errors.address}</p>}
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium">Teléfono</label>
                <input
                    type="text"
                    className="bg-white border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Teléfono"
                    name="phone"
                    onChange={handleChange}
                    value={data.phone}
                    onBlur={handleBlur}
                />
                {touched.phone && <p className="text-red">{errors.phone}</p>}
            </div>

            <button
                type="submit"
                className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
                Registrarse
            </button>
        </form>
    );
};

export default RegisterForm;
