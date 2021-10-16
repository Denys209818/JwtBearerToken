import axiosCreate from "./axiosCreate";

class axiosService {
    send(path, data, headers) 
    {
        return axiosCreate.post(path, data, {
            'Content-Type': headers
        });
    }

    sendWithToken(path, data, headers, token) 
    {
        var bearerRequest = `Bearer ${token}`;
        console.log(bearerRequest);
        return axiosCreate.post(path, data, {
            headers: {
                'Content-Type': headers,
                Authorization: "Bearer " + token
            }
         });

        
    }
}

export default new axiosService();