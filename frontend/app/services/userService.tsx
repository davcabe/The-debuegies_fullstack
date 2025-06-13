const VITE_API_URL = import.meta.env.VITE_API_URL;

console.log("VITE_API_URL at build/runtime:", VITE_API_URL);
if (!VITE_API_URL) {
    throw new Error("VITE_API_URL is not defined. Check your environment variables and Docker Compose configuration.");
}

export async function registerUser(email: string, password: string) {
    try {
        const response = await fetch(`${VITE_API_URL}/api/User/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            const errorData = await response.json(); // <-- aquí falla si la respuesta no es JSON
            throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);    
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

export async function loginUser(email: string, password: string) { 
    try {
        const response = await fetch(`${VITE_API_URL}/api/User/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            const errorData = await response.json(); // <-- aquí falla si la respuesta no es JSON
            throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
        } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}