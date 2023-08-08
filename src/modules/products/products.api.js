import http from "../../../axios.config";


export async function fetchAllProducts() {
  return await http.get("products");
}


export async function addNewProduct(newProduct) {
  return await http.post("products/add", newProduct);
}


export async function fetchComment(id) {
  return await http.get(`comments/post/${id}`);
}


export async function addNewComment(newComment) {
  try {
    const response = await http.post('comments/add', newComment);
    return response.data; 
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error; 
  }
}