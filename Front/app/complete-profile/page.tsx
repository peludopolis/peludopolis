'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;


const CompleteProfileForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
    });
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        picture: '',
    });

    useEffect(() => {
        const googleUser = localStorage.getItem('googleUser');
        if (googleUser) {
            setUserData(JSON.parse(googleUser));
        } else {
            alert('No se encontraron datos de usuario. Por favor, inicia sesión.');
            router.push('/login');
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Verificar que las contraseñas coincidan
        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden. Por favor, verifica e inténtalo de nuevo.');
            return;
        }

        // Construir los datos completos
        const { confirmPassword, ...filteredFormData } = formData;
        const completeData = {
            ...filteredFormData,
            ...userData,
            profilePicture: userData.picture, // Renombrar picture a profilePicture
        };

        try {
            // Registrar al usuario
            const res = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(completeData),
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.removeItem('googleUser');
                alert('Registro exitoso');
                router.push('/login');
            } else {
                alert('Hubo un problema al completar tu registro. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error en la petición al backend:', error);
            alert('Error en la conexión con el servidor.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-center bg-white shadow-lg rounded-lg w-full max-w-md p-8">
                <div className="profile-preview flex flex-col items-center mb-6">
                    {userData.picture ? (
                        <img src={userData.picture} alt="Foto de perfil" />
                    ) : (
                        <div className="placeholder-image">Sin foto</div>
                    )}
                    <h3>{userData.name}</h3>
                    <p>{userData.email}</p>
                </div>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="block w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring focus:ring-primary"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Dirección</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="block w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring focus:ring-primary"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="block w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring focus:ring-primary"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="block w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring focus:ring-primary"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark focus:outline-none"
                    >
                        Completar Registro
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CompleteProfileForm;
