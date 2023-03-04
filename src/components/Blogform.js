import { useState } from 'react'

const BlogForm = ({handleBlogChange}) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [likes, setLikes] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        handleBlogChange({title, author, url, likes})
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
          />
        </div>
        <div>
        author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
        url
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
        likes
          <input
            value={likes}
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>  
      )
}

export default BlogForm