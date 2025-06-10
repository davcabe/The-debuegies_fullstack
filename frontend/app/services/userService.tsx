import { json } from "@remix-run/react";
import { redirect } from "react-router";

const API_URL = "http://localhost:5207"

 export async function registerUser(email: string, password: string) {
    try {
        const response = await fetch(`${API_URL}/api/Auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            const errorData = await response.json();       
            throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);    
        }  
        const data = await response.json();     
        console.log('Registro exitoso:', data);     
        return data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

export async function loginUser(email: string, password: string) { 
    try {
        const response = await fetch(`${API_URL}/api/Auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Login exitoso:', data); 
        return data; // Asegúrate de que la respuesta contenga un campo 'token'
        /* const token = data.token; */ // Asegúrate de que la respuesta contenga un campo 'token'   
        /* return redirect(`/profile?token=${token}`); */ // Redirige a la ruta de login con el token`);
        } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}