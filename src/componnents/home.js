import React, { useState, useRef, useEffect } from 'react'
import { Table, Form, Container } from 'react-bootstrap'

import { getUsers } from '.././crud'
import Posts from './posts'

export default function Home (props) {
  const [users, setUsers] = useState([])
  const [showPost, setShowPost] = useState(0)
  const [usersFilter, setUsersFilter] = useState([])

  useEffect(async () => {
    let usersFromJson = await getUsers()
    setUsers(usersFromJson)
    setUsersFilter(usersFromJson)
  }, [])

  const filter = e => {
    setUsers(usersFilter)
    setUsers(users =>
      users.filter(user => user[e.target.name].indexOf(e.target.value) !== -1)
    )
  }

  const selectOne = e => {
    setShowPost(e.target.name)
    if (!e.target.checked) setShowPost(0)
  }
  return (
    <>
      <Container>
        <div className='text  top-3 mt-5'>
          <h2>Home page</h2>
        </div>
        <div className='text  top-0 mt-5'>
          <Form.Label>Filter by user name </Form.Label>
          <Form.Control type='text' name='name' onChange={filter} />
          <br />
          <Form.Label>Filter by user email </Form.Label>
          <Form.Control type='text' name='email' onChange={filter} />
        </div>
        <Table striped bordered hover className='mt-5'>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Company Name</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.company.name}</td>
                      <td key={index}>
                        <Form.Check
                          key={index}
                          type='checkbox'
                          name={user.id}
                          onChange={e => selectOne(e)}
                        />
                      </td>
                    </tr>
                    {showPost == index + 1 ? <Posts id={user.id} /> : null}
                  </>
                )
              })}
          </tbody>
        </Table>
      </Container>
    </>
  )
}
