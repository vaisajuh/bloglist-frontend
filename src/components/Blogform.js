import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleNewBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleNewBlog({ title, author, url, likes })
    setAuthor('')
    setLikes('')
    setTitle('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <h2>create a new blog</h2>
      <div>
        title
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          id='title-input'
        />
      </div>
      <div>
        author
        <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          id='author-input'
        />
      </div>
      <div>
        url
        <input
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          id='url-input'
        />
      </div>
      <div>
        likes
        <input
          value={likes}
          onChange={({ target }) => setLikes(target.value)}
          id='likes-input'
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
}


export default BlogForm