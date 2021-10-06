import React, { useState, useRef, useEffect } from 'react'
import { Table, Form } from 'react-bootstrap'

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

  const selectOne = id => {
    setShowPost(id)
  }
  return (
    <>
      <lable>Filter by user name </lable>
      <input type='text' name='name' onChange={filter} />
      <br />
      <lable>Filter by user email </lable>
      <input type='text' name='email' onChange={filter} />
      <h2>Users List</h2>
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
                        onChange={() => selectOne(user.id)}
                      />
                    </td>
                  </tr>
                  {showPost === index + 1 ? <Posts id={user.id} /> : null}
                </>
              )
            })}
        </tbody>
      </Table>
    </>
  )
}
