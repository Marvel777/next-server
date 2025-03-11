import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const getPosts = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const getPost = async (id: number) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
};

export const createPost = async (post: { title: string; body: string; userId: number }) => {
    const response = await axios.post(API_URL, post);
    return response.data;
};

export const updatePost = async (id: number, post: { title: string; body: string }) => {
    const res = await axios.put(`${API_URL}/${id}`, { ...post, userId: 1 });
    return res.data;
};

export const deletePost = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    return { id };
};