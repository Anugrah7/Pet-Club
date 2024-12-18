import commonAPI from "./commonAPI";
import SERVER_BASE_URL from "./serverURL";

//register API
export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/api/register`,reqBody)
}

