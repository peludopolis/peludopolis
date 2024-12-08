import { UserData, UserLogin } from "../app/interfaces/index";

// Definir la URL base de la API, se obtiene del entorno o se usa localhost por defecto
const apiUrl= process.env.API_URL || "http://localhost:3001";

// Función para registrar un nuevo usuario, realiza una solicitud POST con los datos proporcionados
export const register = async (data: UserData) => {
    const res = await fetch(`${apiUrl}/auth/signup`, {
        method: 'POST', // Método de la solicitud HTTP
        body: JSON.stringify(data), // Convierte los datos del usuario a formato JSON para enviarlos en el cuerpo de la solicitud
        headers: {
            'Content-Type': 'application/json', // Establece el tipo de contenido de la solicitud como JSON
        },
    });
    return await res.json();
};

// Función para iniciar sesión de un usuario, realiza una solicitud POST con los datos de inicio de sesión proporcionados
export const login = async (data: UserLogin) => {
    const res = await fetch(`${apiUrl}/auth/signin`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await res.json();
};