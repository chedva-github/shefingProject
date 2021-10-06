import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'

import { addPosts } from '.././crud'

export default function ModalPosts (props) {
  const [postToAdd, setPostToAdd] = useState({
    userId: '',
    title: '',
    body: ''
  })
  const [show, setShow] = useState(true)

  useEffect( () => {
    setShow(true)
  }, [])
  const handleInputChange = event => {
    let temp = postToAdd
    temp[event.target.name] = event.target.value
    temp['userId'] = props.id
    setPostToAdd(temp)
  }
  const handleSubmit = async event => {
    let res = await addPosts(postToAdd)
    props.postAdd(res)
    console.log(res)
    alert('fake save post')
    setShow(false)
  }

  return (
    <>
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label>
              post title:
              <input
                name='title'
                type='text'
                //   value={}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              post body:
              <input
                name='body'
                type='text'
                //   value={}
                onChange={handleInputChange}
              />
            </label>
            <label>
              submit:
              <input type='button' onClick={handleSubmit} value='Submit' />
            </label>
            <br />
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
