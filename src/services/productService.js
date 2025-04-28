import axios from "axios";

const API_URL = "http://localhost:5000/products";

export const getProducts = () => axios.get(API_URL);
export const addProduct = (product) => axios.post(API_URL, product);
export const purchaseProduct = (id, amount) => axios.post(`${API_URL}/${id}/purchase`, { amount });
export const sellProduct = (id, amount) => axios.post(`${API_URL}/${id}/sell`, { amount });
