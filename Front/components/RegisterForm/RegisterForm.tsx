"use client";

import { register } from "../../service/auth"; 
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import validator from "validator";

const RegisterForm = () => {
  const router = useRouter();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: ""
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    address: false,
    phone: false
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      alert("Las contraseñas no coinciden");
    }
    const res = await register(data);
    if (res.statusCode) {
      alert(res.message);
    } else {
      alert("Registro exitoso");
      router.push("/login");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

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

  useEffect(() => {
    setErrors({
      name: validateName(data.name),
      email: validateEmail(data.email),
      password: validatePassword(data.password),
      confirmPassword: validateConfirmPassword(data.confirmPassword),
      address: validateAddress(data.address),
      phone: validatePhone(data.phone)
    });
  }, [data]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      {/* Imagen del perro */}
      <div className="relative w-1/2 h-full bg-primary hidden lg:flex items-center justify-center">
        <img
          src="/images/perro3.png"
          alt="Perro asomándose"
          className="absolute bottom-0 right-0 object-contain w-80 h-100"
        />
      </div>

      {/* Formulario de Registro */}
      <form
        className="flex flex-col justify-center p-8 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto lg:w-1/2 lg:max-w-none h-screen"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center mb-4">¡Crea tu cuenta en Peludópolis!</h1>
        <p className="text-center text-gray-600 mb-6">
          Regístrate para disfrutar de nuestros servicios.
        </p>

        <label className="block mb-1 text-sm font-medium text-gray-700">*Nombre</label>
        <input
          type="text"
          className={`w-full p-3 border rounded-lg mb-4 text-sm focus:outline-none ${touched.name && errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
          placeholder="Nombre"
          name="name"
          onChange={handleChange}
          value={data.name}
          onBlur={handleBlur}
        />
        {touched.name && errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

        <label className="block mb-1 text-sm font-medium text-gray-700">*Correo Electrónico</label>
        <input
          type="text"
          className={`w-full p-3 border rounded-lg mb-4 text-sm focus:outline-none ${touched.email && errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
          placeholder="name@email.com"
          name="email"
          onChange={handleChange}
          value={data.email}
          onBlur={handleBlur}
        />
        {touched.email && errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

        <label className="block mb-1 text-sm font-medium text-gray-700">*Contraseña</label>
        <input
          type="password"
          className={`w-full p-3 border rounded-lg mb-4 text-sm focus:outline-none ${touched.password && errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
          placeholder="Contraseña"
          name="password"
          onChange={handleChange}
          value={data.password}
          onBlur={handleBlur}
        />
        {touched.password && errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

        <label className="block mb-1 text-sm font-medium text-gray-700">*Confirmar Contraseña</label>
        <input
          type="password"
          className={`w-full p-3 border rounded-lg mb-4 text-sm focus:outline-none ${touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
          placeholder="Confirmar contraseña"
          name="confirmPassword"
          onChange={handleChange}
          value={data.confirmPassword}
          onBlur={handleBlur}
        />
        {touched.confirmPassword && errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}

        <label className="block mb-1 text-sm font-medium text-gray-700">*Dirección</label>
        <input
          type="text"
          className={`w-full p-3 border rounded-lg mb-4 text-sm focus:outline-none ${touched.address && errors.address ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
          placeholder="Dirección"
          name="address"
          onChange={handleChange}
          value={data.address}
          onBlur={handleBlur}
        />
        {touched.address && errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}

        <label className="block mb-1 text-sm font-medium text-gray-700">*Teléfono</label>
        <input
          type="text"
          className={`w-full p-3 border rounded-lg mb-6 text-sm focus:outline-none ${touched.phone && errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
          placeholder="Teléfono"
          name="phone"
          onChange={handleChange}
          value={data.phone}
          onBlur={handleBlur}
        />
        {touched.phone && errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300"
          
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;


