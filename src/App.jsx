import React, { useState, useEffect } from "react"
import axios from "axios"

function CreateCategoryAndProducts() {
  const [categoryName, setCategoryName] = useState("")
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [categories, setCategories] = useState([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:9090/categories")
      setCategories(response.data)
    } catch (error) {
      console.error(error)
      setMessage("카테고리 조회에 실패했습니다.")
    }
  }

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value)
  }

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value
    setCategoryId(categoryId)

    // 선택한 카테고리의 아이템을 콘솔에 출력
    const selectedCategory = categories.find((category) => category.id === Number(categoryId))
    if (selectedCategory) {
      console.log(selectedCategory.products)
    }
  }

  const handleProductNameChange = (event) => {
    setProductName(event.target.value)
  }

  const handleProductDescriptionChange = (event) => {
    setProductDescription(event.target.value)
  }

  const handleProductPriceChange = (event) => {
    setProductPrice(event.target.value)
  }

  const handleCategorySubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post("http://localhost:9090/categories", {
        name: categoryName,
      })

      console.log(response.data)

      setMessage("카테고리가 생성되었습니다.")
      setCategoryName("")
      fetchCategories()
    } catch (error) {
      console.error(error)
      setMessage("카테고리 생성에 실패했습니다.")
    }
  }

  const handleProductSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post("http://localhost:9090/products", {
        name: productName,
        description: productDescription,
        price: productPrice,
        categoryId: categoryId,
      })

      console.log(response.data)

      setMessage("상품이 생성되었습니다.")
    } catch (error) {
      console.error(error)
      setMessage("상품 생성에 실패했습니다.")
    }
  }

  return (
    <div>
      <h2>카테고리 및 상품 생성</h2>
      <div>
        <h3>카테고리 생성</h3>
        <form onSubmit={handleCategorySubmit}>
          <label>
            카테고리명:
            <input type="text" value={categoryName} onChange={handleCategoryNameChange} />
          </label>
          <button type="submit">카테고리 생성</button>
        </form>
      </div>
      <div>
        <h3>상품 생성</h3>
        <form onSubmit={handleProductSubmit}>
          <label>
            카테고리 선택:
            <select value={categoryId} onChange={handleCategoryChange}>
              <option value="">카테고리 선택</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            상품명:
            <input type="text" value={productName} onChange={handleProductNameChange} />
          </label>
          <br />
          <label>
            상품 설명:
            <input type="text" value={productDescription} onChange={handleProductDescriptionChange} />
          </label>
          <br />
          <label>
            가격:
            <input type="number" value={productPrice} onChange={handleProductPriceChange} />
          </label>
          <br />
          <button type="submit" disabled={!categoryId}>
            상품 생성
          </button>
        </form>
      </div>
      <p>{message}</p>
    </div>
  )
}

export default CreateCategoryAndProducts
