import React from 'react'
import UserLogin from '../components/UserLogin'
const Login = props => {
    console.log('from login page')
    console.log('props 😎 = ', props)
    console.log('props = ', props)

    return (
        <div>
            <UserLogin />
        </div>
    )
}

export default Login
