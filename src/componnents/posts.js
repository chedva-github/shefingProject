import React, { useState, useEffect } from 'react'
import { Button, Form, ListGroup } from 'react-bootstrap'

import { getPosts } from '.././crud'
import ModalPosts from './modalPost'

export default function Posts (props) {
  const [posts, setPosts] = useState()
  const [showAddPost, setShowAddPost] = useState(false)

  useEffect(async () => {
    let postsFromJson = await getPosts(props.id)
    setPosts(postsFromJson)
  }, [])

  const addPosts = () => {
    setShowAddPost(true)
  }
  const postToAdd = data => {
    setShowAddPost(false)

    setPosts([...posts, data])
  }

  return (
    <>
      {posts && (
        <div>
          <Form.Label column='sm'>Posts of user:</Form.Label>
          {posts.map((post, index) => {
            return <ListGroup.Item>{post.title}</ListGroup.Item>
          })}
          <div className='d-grid gap-2'>
            <Button variant='outline-secondary' size='sm' onClick={addPosts}>
              add post +
            </Button>
          </div>
          {showAddPost ? <ModalPosts id={props.id} postAdd={postToAdd} /> : ''}
        </div>
      )}
    </>
  )
}
