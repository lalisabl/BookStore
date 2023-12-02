import React, { useEffect } from 'react'
import axios from 'axios';
export default function TryJs () {
  useEffect(() => {
    axios
      .post('http://localhost:5000/api/v1/users/register', {
        username: 'john1',
        email: 'john1@gmail.com',
        password: '1234',
        fullName: 'John Doe'
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
  }, [])
  return <div>try post</div>
}
