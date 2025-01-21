import commonAPI from "./commonAPI";
import SERVER_BASE_URL from "./serverURL";
const token = sessionStorage.getItem('token');
const reqHeader = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
};
//register API
export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/api/register`,reqBody)
}

//login API

export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/api/login`,reqBody)
}

//add pet Modal
export const addPetAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/api/add-pet`,reqBody,reqHeader)
}

export const getPetAPI = async (ownerId) => {
  try {
    const response = await commonAPI("GET", `${SERVER_BASE_URL}/api/get-pet/${ownerId}`, {});
    return response; // Return the full response object (includes status and data)
  } catch (error) {
    console.error("Error fetching pets:", error);
    throw error; // Throw the error for handling in the calling function
  }
};


  export const addBookingAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/api/add-booking`,reqBody,reqHeader)
    
  }

  export const getBookingAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/api/get-booking`,reqBody,reqHeader)
  }
  
  
//removePet
export const removePetAPI = async (id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_BASE_URL}/api/remove-pet/${id}`,{},reqHeader)
}

//getServices

export const getServicesAPI = async(reqHeader)=>{
  return await commonAPI("GET",`${SERVER_BASE_URL}/api/get-services`,reqHeader)
}
//getProviders

export const getProvidersAPI = async(reqHeader)=>{
  return await commonAPI("GET",`${SERVER_BASE_URL}/api/get-providers`,reqHeader)
}
