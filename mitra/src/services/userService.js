//1. Creación de servicios
const API_BASE = "http://127.0.0.1:8000";

export const getUsers = async () => {
  const res = await fetch(`${API_BASE}/user/get-users/`);
  return await res.json();
};

export const getUserById = async (id) => {
  const res = await fetch(`${API_BASE}/user/users/${id}`);
  return await res.json();
};

export const createUser = async (data) => {
  return await fetch(`${API_BASE}/user/create-user/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export async function changeUserStatus(id, estado) {
  return await fetch(`${API_BASE}/user/change-status/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ estado }),
  });
}


export const updateUser = async (user) => {
  const {id, nombre, apellido, numtelefono, correo, password} =user;
  return await fetch(`${API_BASE}/user/update-user/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({id, nombre, apellido, numtelefono, correo, password}),//No se envia el estado
  });
};
