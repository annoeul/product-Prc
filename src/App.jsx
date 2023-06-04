import React, { useState, useEffect } from "react"
import * as api from "./apis"

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
      const data = await api.fetchCategories()
      setCategories(data)
    } catch (error) {
      console.error(error)
      setMessage(error.message)
    }
  }

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value)
  }

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value
    setCategoryId(categoryId)
  }

  const handleCategorySubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await api.createCategory(categoryName)
      console.log(response)
      setMessage("카테고리가 생성되었습니다.")
      setCategoryName("")
      fetchCategories()
    } catch (error) {
      console.error(error)
      setMessage(error.message)
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

  const handleProductSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await api.createProduct(productName, productDescription, productPrice, categoryId)
      console.log(response)
      setMessage("상품이 생성되었습니다.")
      setProductName("")
      setProductDescription("")
      setProductPrice("")
    } catch (error) {
      console.error(error)
      setMessage(error.message)
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
