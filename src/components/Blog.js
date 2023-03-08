import { useState } from 'react'

const Blog = ({ blog, handleBlogUpdate, handleDeleteBlog, user }) => {

  const [button, setButton] = useState(false)

  const handleVisibilityButton = () => {
    setButton(!button)
  }

  const handleLikeButton = (blog) => {
    blog.likes += 1
    handleBlogUpdate(blog)
  }

  const handleDeleteButton = (blog) => {

    if (window.confirm(`Delete ${blog.title}?`)) {
      handleDeleteBlog(blog)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }

  if (button) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title}  <button onClick={() => handleVisibilityButton()}>hide</button> <br />
          {blog.author} <br />
          {blog.url} <br />
        likes {blog.likes} <button onClick={() => handleLikeButton(blog)}>like</button> <br />
          {((blog.user.id) === user.id || blog.user === user.id) &&
        <div>
          <button onClick={() => handleDeleteButton(blog)}>delete</button> <br />
        </div> }
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} <br />
        {blog.author} <button onClick={handleVisibilityButton}>view</button>
      </div>
    </div>
  )}

export default Blog