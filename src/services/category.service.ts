import request from "helpers/request";

export const getListCategories = async () => {
  try {
    const response = await request.get(`http://localhost:3000/categories`);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};
