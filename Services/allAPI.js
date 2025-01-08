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
export const addPetAPI = async (reqHeader =reqHeader)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/api/add-pet`,reqbody,reqHeader)
}

export const getPetAPI = async () => {
    try {
      const response = await commonAPI("GET", `${SERVER_BASE_URL}/api/get-pet`, {});
      
      if (response.status === 200) {
        return response;
      } else {
        console.error("Failed to fetch pets:", response.data);
        return { status: response.status, data: [] };
      }
    } catch (error) {
      console.error("Error fetching pets:", error);
      return { status: 500, data: [] };
    }
  };

  export const addBookingAPI = async (reqbody,reqHeader =reqHeader)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/api/add-booking`,reqbody,reqHeader)
  }

  export const getBookingAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/api/get-booking`,reqBody,reqHeader)
  }
  
  

