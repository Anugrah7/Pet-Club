import axios from 'axios'

const commonAPI = async (httpMethod,url,reqBody,reqHeader)=>{
    const reqConfig ={
        method:httpMethod,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{"Content-Type":"application/json"},
    };

  try {
        const res = await axios(reqConfig);
        return res;
    } catch (err) {
        console.error("API Error:", err?.response || err.message);
        return err?.response || { status: 500, data: "Server Error" };
    }
};
export default commonAPI