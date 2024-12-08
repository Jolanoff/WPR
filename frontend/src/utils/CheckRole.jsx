import api from "../api";


export const CheckRole = async (role) => {
  try{
    const response = await api.get("/account/role")
    return response.data.includes(role);
  }catch{
    return false
  }
}

