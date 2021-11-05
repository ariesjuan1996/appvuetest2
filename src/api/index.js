import axios from "axios";
export const requestApi = async (
    endPoint,
    payload = {},
    method = "POST",
    headers = {},
    responseType="json"
) => {
    const token = localStorage.getItem("token");
    
    if (token !== null) {
    headers.Authorization = `Bearer ${token}`;
    }
    let data=await axios({
        url: `http://localhost:8000/api/${endPoint}`, //Endpoint
        method: method, //Método
        data: payload,
        responseType:responseType,
        headers: headers
    });
    let codeError=data.data.codigoHttp;
    if(codeError=="SESSIONERROR"){
        localStorage.removeItem('dataUsuario');
        localStorage.removeItem('token');
        //location.href =location.host+"/login";
    }
    return data;
};
