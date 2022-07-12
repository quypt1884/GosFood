import request from "helpers/request";

export const getProductById = async (id: number) => {
  try {
    const response = await request.get(`http://localhost:3000/products/${id}`);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};
