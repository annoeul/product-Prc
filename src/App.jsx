import React, { useState } from "react"
import axios from "axios"

function CreateCategory() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post("http://localhost:9090/categories", {
        name: name,
      })

      // 응답 데이터 확인
      console.log(response.data)

      setMessage("카테고리가 생성되었습니다.")
    } catch (error) {
      // 에러 처리
      console.error(error)
      setMessage("카테고리 생성에 실패했습니다.")
    }
  }

  return (
    <div>
      <h2>카테고리 생성</h2>
      <form onSubmit={handleSubmit}>
        <label>
          카테고리명:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <button type="submit">생성</button>
      </form>
      <p>{message}</p>
    </div>
  )
}

export default CreateCategory
