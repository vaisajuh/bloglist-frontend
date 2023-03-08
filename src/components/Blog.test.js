import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  id: 1,
  title: 'kirja testaamisesta',
  author: 'testaaja',
  url: 'www.jees.org',
  likes: 0,
  user: 1
}


test('renders content', () => {

  const { container } = render(<Blog key={blog.id} blog={blog} />)

  const div = container.querySelector('.blog')

  screen.debug()

  expect(div).toHaveTextContent(
    'kirja testaamisesta'
  )
})

test('view button works', async () => {
  const mockHandler = jest.fn()
  const { container } = render(<Blog key={blog.id} blog={blog} user={mockHandler}/>)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  const div = container.querySelector('.blog')
  await user.click(button)

  screen.debug()

  expect(div).toHaveTextContent(
    'www.jees.org'
  )
})

test('like button works', async () => {
  const mockHandler = jest.fn()
  render(<Blog key={blog.id} blog={blog} user={mockHandler} handleBlogUpdate={mockHandler}/>)
  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  screen.debug()
  expect(mockHandler.mock.calls).toHaveLength(
    2
  )
})