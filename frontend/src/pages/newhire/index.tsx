import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from "./styles.module.scss";
import { FiUpload } from "react-icons/fi";
import { ChangeEvent, FormEvent, useState } from "react";
import { setupAPIClient, setupAPIProcessStreet } from "../../services/api";
import { toast } from "react-toastify";
import { api } from "../../services/apiClient";
import Head from "next/head";
import axios from "axios";

type CategoryProps = {
  id: string;
  name: string;
};

interface CategoryListProps {
  categoryList: CategoryProps[];
}

export default function Product({ categoryList }: CategoryListProps) {
  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [workflowURL, setWorkflowURL] = useState("");
  const [productDescription, setProductDescription] = useState("");

  function resetFields() {
    setProductName("");
    setProductPrice("");
    setProductDescription("");
  }

  function handleChangeCategory(e) {
    setCategorySelected(e.target.value);
  }

  // run workflow in PS
  function handleRegister(e: FormEvent) {
    e.preventDefault();
    try {
      if (
        productName === "" ||
        productPrice === "" ||
        productDescription === ""
      ) {
        toast.warn("Please, fill in all the details");
        return;
      }

      const data = new FormData();

      data.append("name", productName);
      data.append("price", productPrice);
      data.append("description", productDescription);
      data.append("category_id", categories[categorySelected].id);

      // const api = new setupAPIProcessStreet(productName, productPrice, productDescription);
      // api;

      axios
        .post(
          "https://public-api.process.st/api/v1.1/workflow-runs",
          {
            workflowId: "pUyVp1YAU6h8aSqd-MNP0Q",
            name: `${productName} - Onboarding`,
          },
          {
            headers: {
              "X-API-Key": "api_gi1mqeIa2HsSGhvUtx9GgA",
            },
          }
        )
        .then((response) => {
          setWorkflowURL(response.data.links[1].href);
          console.log(response.data.id);

          axios.post(
            `https://public-api.process.st/api/v1.1/workflow-runs/${response.data.id}/form-fields`,

            {
              fields: [
                {
                  id: "idmJdk6sCpAQxg-besdBfQ",
                  value: `${productDescription}`,
                },
                {
                  id: "o9GvsX13Hz-5NQ8Rpf1IwQ",
                  value: `${productName}`,
                },
                {
                  id: "iKV86Lzeuw02Dsr0_3BJXA",
                  value: `${productPrice}`,
                },
              ],
            },

            {
              headers: {
                "X-API-Key": "api_gi1mqeIa2HsSGhvUtx9GgA",
              },
            }
          );

          console.log(response.data.links[1].href);
          toast.success(`Workflow for ${productName} has been initiated!!!`);
        })

        // THEN FIM

        .catch((error) => {
          toast.warn("Oops! Something went wrong");
          console.error(error);
        });

      // toast.success("Workflow run successfully");
      // resetFields();
    } catch (error) {
      console.log(error);
      toast.error("Oops! Failed to run the workflow");
    }
  }

  /// New hire

  return (
    <>
      <Head>
        <title>New hire</title>
      </Head>
      <Header />

      <div className={styles.container}>
        <main>
          <h1>New hire</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <input
              className={styles.input}
              type="text"
              placeholder="New hire name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />

            <input
              className={styles.input}
              type="email"
              placeholder="Hiring manager email"
              value={productPrice}
              onChange={(e) => {
                setProductPrice(e.target.value);
              }}
            />

            <textarea
              className={styles.input}
              placeholder="Cover letter"
              value={productDescription}
              onChange={(e) => {
                setProductDescription(e.target.value);
              }}
            />

            <button type="submit" className={styles.buttonAdd}>
              Run workflow in Process Street
            </button>
          </form>
          {workflowURL ? (
            <>
              <h2 style={{ color: "white" }}>Workflow generated!!!</h2>
              <br></br>
              <a className={styles.input} href={workflowURL} target="_blank">
                Go to the workflow
              </a>
            </>
          ) : (
            <></>
          )}
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (context) => {
  const apiClient = setupAPIClient(context);
  const response = await apiClient.get("/category/list-all");

  return {
    props: {
      categoryList: response.data,
    },
  };
});
