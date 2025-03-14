import axios from "axios"
const axiosInstance=axios.create({
    // baseURL:"http://127.0.0.1:5001/e-clone-2eb98/us-central1/api"

   //baseURL: "http://localhost:5000"
    baseURL: "https://amazon-api-deploy-yel3.onrender.com"


})

export {axiosInstance} 