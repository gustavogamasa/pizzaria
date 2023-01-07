import axios from "axios";

const api = axios.create({
    baseURL: "http:/localhost:3333",
    //baseURL: "http://30.30.0.221/3333"
});

export { api };