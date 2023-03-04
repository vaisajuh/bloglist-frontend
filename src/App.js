import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/Blogform'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    try {
      const user = await loginService.login(event)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)

    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogChange = (blogObject) => {
    try {
      blogService
        .addNewBlog(blogObject)
        .then(returnedBlog => {
          const newObject = {username: user.name, ...returnedBlog}
          setSuccessMessage(`a new blog: ${newObject.title} by ${newObject.author} added`)
          setBlogs(blogs.concat(newObject))
          blogFormRef.current.toggleVisibility()
        })
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Title or url can not be empty')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogUpdate = (blogObject) => {
    
    try {
      blogService
        .updateBlog(blogObject)
        .then(returnedBlog => {
          let modifiedBlogs = blogs.filter(function(blog) {
            return blog.id !== returnedBlog.id
          })
          returnedBlog.likes += 1
          setBlogs(modifiedBlogs.concat(returnedBlog))
        })
    } catch (error) {
      console.log(error)
    }
  }

  const  handleDeleteBlog = (blogObject) => {
    blogService
      .deleteBlog(blogObject)
      .then(returnedBlog => {
        let modifiedBlogs = blogs.filter(function(blog) {
          return blog.id !== blogObject.id
        })
        setBlogs(modifiedBlogs)
      })
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const sortedMap = blogs.sort((a,b)  => b.likes - a.likes)
  
  const GetBlogs = () => (
    <div>
      <h2>blogs</h2>
      {sortedMap.map(blog =>
        <Blog key={blog.id} blog={blog} handleBlogUpdate={handleBlogUpdate} handleDeleteBlog={handleDeleteBlog} user={user}/>
      )}
    </div>
  )

  const Message = () => {
    if (successMessage) {
      return <h2 style={{ color:"green" }}>{successMessage}</h2>
    }
    if (errorMessage) {
      return <h2 style={{ color:"red" }}>{errorMessage}</h2>
    }
  }

  const blogFormRef = useRef()

  return (
    <div>
      <h1>Blogs</h1>
      {Message()}
      {!user && 
        <div>
          <Togglable buttonLabel="login">
            <LoginForm
              handleLogin={handleLogin}
            />
          </Togglable>
        </div>}
      {user && <div>
        <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button></p>
          {GetBlogs()}
        </div>}
      {user &&
        <div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm
              handleBlogChange={handleBlogChange}
            />
          </Togglable>
        </div>}

    </div>
  )
}

export default App