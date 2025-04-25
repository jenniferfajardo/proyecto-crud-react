//1. Creación de servicios
const API_BASE = "http://127.0.0.1:8000";

export const getBolsillos= async() =>{
    const response= await fetch(`${API_BASE}/pocket/`)
    return await response.json();
}

export const createBolsillo= async(data)=>{
    const response= await fetch(`${API_BASE}/pocket/`, {
        method : "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(data)
    })

    return response;
}
