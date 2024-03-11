import React from 'react'
import './Login.css'
import { Button } from '@mui/material'
import { auth, provider } from './firestoreConfigs'
import { signInWithPopup } from 'firebase/auth'
import { useStateValue } from './DataProvider'
import { actionTypes } from './reducer'

function Login() {
  const [{}, dispatch] = useStateValue()


  const signIn = () => {
      signInWithPopup(auth, provider)
      .then(result => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      })
      .catch((error) => alert(error.message))
  }

  return (
    <div className='login'>
      <div className="login__container">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="" />
        <div className="login__text">
            <h1>Sign in to whatsapp</h1>
        </div>
        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  )
}

export default Login
