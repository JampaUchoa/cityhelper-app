import { getUserLogin } from "./user";

export const get = async (endpoint, type = "json") => {

    const headers = {}
  
    return new Promise((resolve, reject) => {
      fetch("http://localhost:8000" + endpoint, {
        method: "GET",
        headers
      }).then(function (response) {
        if (response.status === 200) {
          if (type === "blob") {
            return response.blob();
          }
          return response.json();
        } else {
          reject(response.status);
        }
      }).then(function (json) {
        resolve(json);
      }).catch(function (error) {
        reject(error)
      });
    });
  }

export const post = async (endpoint, postData, method = "POST") => {

    const contentType = "application/json";
    let data = postData;
    let responseOk;
    if (contentType === "application/json") {
      data = JSON.stringify(postData)
    }
  
    let headers = {
      'Content-Type': contentType
    }
   
    // Form data bug, that if specified will break the uploading
    // https://github.com/github/fetch/issues/505
    if (contentType === "multipart/form-data") {
      delete headers['Content-Type'];
    }
  
    return new Promise((resolve, reject) => {
      fetch(endpoint, {
        method: method,
        headers: headers,
        body: data
      }).then(function (response) {
        responseOk = response.ok;
        
        if (response.status === 204){
          return ({success: "true"})
        }

        return response.json();
      }).then(function (json) {
        if (responseOk) {
          resolve(json);
        } else {
          reject(json);
        }
      }).catch(function (error) {
        console.log("Unexpected error" + error)
        reject(error)
      });
    });
  
  }