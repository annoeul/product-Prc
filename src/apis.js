import axios from "axios"

export const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:9090/categories")
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error("카테고리 조회에 실패했습니다.")
  }
}

export const createCategory = async (name) => {
  try {
    const response = await axios.post("http://localhost:9090/categories", { name })
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error("카테고리 생성에 실패했습니다.")
  }
}

export const createProduct = async (productName, productDescription, productPrice, categoryId) => {
  try {
    const response = await axios.post("http://localhost:9090/products", {
      name: productName,
      description: productDescription,
      price: productPrice,
      categoryId: categoryId,
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error("상품 생성에 실패했습니다.")
  }
}
