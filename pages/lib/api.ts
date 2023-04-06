import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetcher = async (url: string) => {
  const response = await api.get(url);
  return response.data;
};

export const post = async (url: string, data: any[]) => {
  const response = await api.post(url, data);
  return response.data;
};
