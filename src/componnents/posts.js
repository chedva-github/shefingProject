import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

import { getPosts } from '.././crud'
import ModalPosts from './modalPost'

export default function Posts (props) {
  const [posts, setPosts] = useState([])
  const [showAddPost, setShowAddPost] = useState(false)

  useEffect(async () => {
    let postsFromJson = await getPosts(props.id)
    setPosts(postsFromJson)
  }, [])

  const addPosts =  () => {
    setShowAddPost(true)
  }
  const postToAdd =  data => {
    setPosts([...posts, data])
  }

  return (
    <>
      <div>
        <lable>Posts of user </lable>
        {posts &&
          posts.map((post, index) => {
            return <li>{post.title}</li>
          })}
        <Button variant='outline-secondary' onClick={addPosts}>
          add post
        </Button>
        {showAddPost ? <ModalPosts id={props.id} postAdd={postToAdd} /> : ''}
      </div>
    </>
  )
}
