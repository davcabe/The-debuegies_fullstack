import { redirect } from "@remix-run/react";

const API_URL = "http://localhost:5207"

 export async function registerUser(email: string, password: string) {
    try {
        const response = await fetch(`http://localhost:5207/api/User/register`, {
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
        const response = await fetch(`${API_URL}/api/User/login`, {
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
        return data;
        } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}