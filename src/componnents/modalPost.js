import React, { useState, useEffect } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
// import Modal from 'react-awesome-modal'

import { addPosts } from '.././crud'

export default function ModalPosts (props) {
  const [postToAdd, setPostToAdd] = useState({
    userId: '',
    title: '',
    body: ''
  })
  const [show, setShow] = useState(true)

  useEffect(() => {
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
  const closeModal = () => {
    setShow(false)
  }

  return (
    <>
      <Modal show={show}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Post title:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter post title'
                name='title'
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant='primary' type='button' onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
