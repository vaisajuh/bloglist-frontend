import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blogform from './Blogform'

test('Callback fuction with correct inputs', async () => {

  const user = userEvent.setup()
  const createBlog = jest.fn()

  const { container } = render(<Blogform handleNewBlog={createBlog} />)

  const title = container.querySelector('#title-input')
  const author = container.querySelector('#author-input')
  const url = container.querySelector('#url-input')
  const likes = container.querySelector('#likes-input')

  const sendButton = screen.getByText('create')

  await user.type(title, 'testi-kirja')
  await user.type(author, 'testaaja')
  await user.type(url, 'www.testi.com')
  await user.type(likes, '1')

  await user.click(sendButton)

  screen.debug()

  expect(createBlog.mock.calls[0][0].title).toBe('testi-kirja')
  expect(createBlog.mock.calls[0][0].author).toBe('testaaja')
  expect(createBlog.mock.calls[0][0].url).toBe('www.testi.com')
  expect(createBlog.mock.calls[0][0].likes).toBe('1')

})
