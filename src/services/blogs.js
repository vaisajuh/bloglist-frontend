import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addNewBlog = async credentials => {
  const request = axios.post(baseUrl, credentials, config)
  return request.then(response => response.data)
}

const updateBlog = async (blog) => {
  const request = axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return request.then(response => response.data)
}

const deleteBlog = async (blog) => {
  const request = axios.delete(`${baseUrl}/${blog.id}`)
  return request.then(response => response.data)
}

export default { getAll, addNewBlog, setToken, updateBlog, deleteBlog }