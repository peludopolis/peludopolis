'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
    
        // Verifica que las contraseñas coincidan
        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden. Por favor, verifica e inténtalo de nuevo.');
            return;
        }
    
        // Construir los datos completos sin `confirmPassword` y cambiando `picture` a `profilePicture`
        const { confirmPassword, ...filteredFormData } = formData; // Excluir confirmPassword
        const { picture, ...restUserData } = userData; // Excluir picture y obtener el resto de los datos
    
        const completeData = {
            ...filteredFormData,
            ...restUserData,
            profilePicture: picture, // Renombrar `picture` a `profilePicture`
        };
    
        console.log(completeData);
    
        const res = await fetch('http://localhost:3001/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(completeData), // Enviar datos sin token
        });
    
        if (res.ok) {
            const data = await res.json();
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.removeItem('googleUser'); // Eliminar datos relacionados con Google si no se necesitan
            alert('Registro exitoso');
            router.push('/dashboard');
        } else {
            alert('Hubo un problema al completar tu registro. Inténtalo de nuevo.');
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
                    <h3 className="text-lg font-semibold">{userData.name}</h3>
                    <p className="text-gray-600">{userData.email}</p>
                </div>
                <form onSubmit={handleSubmit} className="w-full">
                    <h2 className="text-xl font-bold text-center mb-4">Completa tu perfil</h2>
                    <div className="mb-4">
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Teléfono
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="Escribe tu número de teléfono"
                            className="block w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring focus:ring-primary"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Dirección
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            placeholder="Escribe tu dirección"
                            className="block w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring focus:ring-primary"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Escribe tu Contraseña"
                            className="block w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring focus:ring-primary"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Confirmar contraseña
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            placeholder="Confirma tu Contraseña"
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

