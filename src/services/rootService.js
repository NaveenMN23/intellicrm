import axios from "axios"
import { appConfig } from "./../config";
import { EndPoints, RequestType } from "./apiConfig";

//Constructs API BASE URL
const getBaseUrl = () => {
    let apiUrl = appConfig.API_BASE_URL + appConfig.API_VERSION;
    return apiUrl;
}



//Method to create a axios instance
const getAxiosInstance = () => {
    const instance = axios.create();
    return instance;
}

//Get all Product details from DB
export const APIService = async (endPoint, requestType, formData) => {

    let url = `${getBaseUrl()}/${endPoint}`;
    // if(requestParams) {
    //    url = `${url}/${requestParams}`;
    // }

    if(requestType === RequestType.GET){
      return await getAPI(url);
    } else {
      return await postAPI(url, formData);
    }

    // const options = {
    //     headers: headers
    // }


}

const getAPI = async (url) => {
  const instance = getAxiosInstance();
  //set Headers
  const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      "Authorization" : "Basic RGV2VXNlcjpEZXZAMTIz"
  };

  try {
      const response = await instance.get(url, {headers:headers});
      return response;
  }
  catch (err) {
      console.log(err);
  }
}


const postAPI = async (url, formData) => {
  const instance = getAxiosInstance();
  //set Headers
  const headers = {
      'Authorization' : 'Basic RGV2VXNlcjpEZXZAMTIz',     
      "Accept": "application/json",
      "Content-Type": "application/json;charset=UTF-8",
  };

  try {
      const response = await instance.post(url, formData , {headers: headers});
      return response;
  }
  catch (err) {
      console.log(err);
  }
}
