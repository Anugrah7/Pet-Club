import axios from 'axios';

const commonAPI = async (httpMethod, url, reqBody = {}, reqHeader = {}) => {
    // Check if the token is required (exclude login and register routes)
    const isAuthRequired = !url.includes("/api/login") && !url.includes("/api/register");

    if (isAuthRequired) {
        const token = sessionStorage.getItem("token");
        if (token) {
            reqHeader = {
                ...reqHeader,
                Authorization: `Bearer ${token}`,  // Add the token in the Authorization header
            };
        } else {
            console.error("Token is missing");
            throw new Error("Authentication token is required for this API call.");
        }
    }

    // Ensure the Content-Type is application/json for requests that send a body
    reqHeader = {
      ...reqHeader,
      'Content-Type': 'application/json',
    };

    // Log the request details (for debugging purposes)
    console.log(`Request: ${httpMethod} ${url}`);
    console.log("Headers:", reqHeader);
    console.log("Request Body:", reqBody);

    try {
        const response = await axios({
            method: httpMethod,
            url: url,
            data: reqBody,
            headers: reqHeader,
        });

        console.log("API Response:", response);

        return response;
    } catch (error) {
        console.error("API Request failed:", error.response || error);  // Log the error response
        throw error; // Propagate the error for handling in the calling code
    }
};

export default commonAPI;
