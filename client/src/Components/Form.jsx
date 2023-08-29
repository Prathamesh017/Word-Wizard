import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import firebaseApp from '../Firebase/firebase'
import { useDispatch } from 'react-redux'
import { setToken, authenicateUser, setData } from '../Store/authSlice'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import Loading from './spinner'
import { useNavigate } from 'react-router-dom'

function Form() {
  const googleProvider = new GoogleAuthProvider()
  const auth = getAuth(firebaseApp)
  const dispatch = new useDispatch()
  let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')
  const navigate = useNavigate()
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .matches(regex, 'Invalid Email'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
  })
  const [operations, setOperations] = useState({
    error: {
      status: false,
      message: null,
    },
    loading: false,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  function setErrors(status, message, loading = false) {
    setOperations((operations) => ({
      ...operations,
      error: { status: status, message: message },
      loading,
    }))
  }
  async function googleLogin() {
    try {
      setErrors(false, null, true)
      const data = await signInWithPopup(auth, googleProvider)
      if (data) {
        authenicate(data.user.accessToken, 'login')
      }
      return data
    } catch (error) {
      setErrors(true, error.message)
    }
  }

  async function loginUser(userinfo) {
    let { email, password } = userinfo
    try {
      setErrors(false, null, true)
      const data = await signInWithEmailAndPassword(auth, email, password)
      if (data) {
        authenicate(data.user.accessToken, 'login')
      }
    } catch (error) {
      setErrors(true, error.message)
      console.log(error.message)
    }
  }
  async function registerUser(userinfo) {
    try {
      setErrors(false, null, true)
      let { email, password } = userinfo
      const data = await createUserWithEmailAndPassword(auth, email, password)
      if (data) {
        authenicate(data.user.accessToken, 'register')
      }
    } catch (error) {
      setErrors(true, error.message)
      console.log(error)
    }
  }

  async function authenicate(token, endpoint) {
    try {
      dispatch(setToken({ payload: token }))
      const result = await dispatch(
        authenicateUser({ token, endpoint }),
      ).unwrap()
      dispatch(
        setData({
          user: {
            high_score: result.data.user.highscore,
            userId: result.data.user.userId,
          },
          wordsArr: result.data.word,
        }),
      )
      navigate(`/info/${result.data.user.userId}`)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-full  flex justify-center mt-10">
      <div className="form-container w-full md:w-1/3 ">
        <h1 className="text-center  text-xl lg:text-4xl">
          Welcome to <span className="color-yellow"> Word Wizard</span>
        </h1>
        <p className="text-center color-yellow">Can you Guess the Word ?</p>
        <div className="form mt-5 p-2">
          <div className="mb-3">
            <label>Email</label>
            <br></br>
            <input
              type="email"
              placeholder="enter email"
              className="w-full mt-2 p-1  border border-yellow-600 "
              {...register('email')}
            ></input>
            {errors.email && (
              <p className="text-red-700">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label>Password</label>
            <br></br>
            <input
              type="password"
              placeholder="enter password"
              className="w-full  p-1 mt-2  border border-yellow-600 "
              {...register('password')}
            ></input>
            {errors.password && (
              <p className="text-red-700">{errors.password.message}</p>
            )}
          </div>
          <div className="w-full  grid grid-cols-2 gap-x-2 ">
            <div className="mt-5">
              <button
                type="submit"
                className="bg-[#ffd700] w-full border text-black p-1 md:p-2"
                onClick={handleSubmit(loginUser)}
              >
                Login
              </button>
            </div>
            <div className="mt-5 w-full">
              <button
                type="submit"
                className="bg-[#ffd700] w-full text-black p-1 md:p-2"
                onClick={handleSubmit(registerUser)}
              >
                Register
              </button>
            </div>
          </div>
          <div className="mt-5">
            <button
              className="bg-[#4285F4] w-full text-black p-1 md:p-2"
              onClick={googleLogin}
            >
              Login With Google
            </button>
          </div>
          {operations.error.status && (
            <p className="text-red-700 mt-2 text-center">
              {operations.error.message}
            </p>
          )}
          {operations.loading && (
            <p className="text-center">
              <Loading></Loading>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Form
