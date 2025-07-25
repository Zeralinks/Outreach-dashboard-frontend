import api from "../api"

export async function login(data) {
    try{
        const response = await api.post("token/", data)
        return response.data

    }
    catch(err){
        if (err.status===401){
            throw new Error("Invalid Credentials")
        }

        throw new Error(err)

    }
    
}

export async function getGmailAccounts() {
  try {
    const response = await api.get("/dashboard/gmail-accounts/");
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function createGmailAccount(data) {
  try {
    const response = await api.post("/dashboard/gmail-accounts/create/", data);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function deleteGmailAccount(id) {
  try {
    const response = await api.post(`/dashboard/gmail-accounts/${id}/delete/`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}