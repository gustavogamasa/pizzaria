import { AuthTokenError } from "./errors/AuthTokenError";
import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { signOut } from "../contexts/AuthContext";

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      Authorization: `Bearer ${cookies["@pizzaAuth.token"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response.status == 401) {
        if (typeof window !== undefined) {
          signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
export function setupAPIProcessStreet(productName, productPrice, productDescription) {

  axios
  .post(
    "https://public-api.process.st/api/v1.1/workflow-runs",
    {
      "workflowId": "pUyVp1YAU6h8aSqd-MNP0Q",
      "name": `${productName} - Onboarding`
      },
    {
      headers: {
        "X-API-Key": "api_gi1mqeIa2HsSGhvUtx9GgA",
      },
    }
  )
  .then((response) => {
    // Manipule a resposta da API aqui
    console.log(response.data);
  })
  .catch((error) => {
    // Manipule erros aqui
    console.error(error);
  });
  
}


