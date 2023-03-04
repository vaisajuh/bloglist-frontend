import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config = {
  headers: { Authorization: token },
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addNewBlog = async credentials => {
  config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, credentials, config)
  return request.then(response => response.data)
}

const updateBlog = async (blog) => {
  config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return request.then(response => response.data)
}

const deleteBlog = async (blog) => {
  config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${blog.id}`)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, addNewBlog, setToken, updateBlog, deleteBlog}