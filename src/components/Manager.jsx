import React, { useRef, useState, useEffect } from 'react'
import PasswordTable from './PasswordTable'
import { v4 as uuidv4 } from 'uuid'
import { ToastContainer, toast } from 'react-toastify'

const Manager = () => {
  const ref = useRef()
  const refPass = useRef()
  const [form, setForm] = useState({ site: '', username: '', password: '' })
  const [passwordArray, setPasswordArray] = useState([])
  const [isEditing, setIsEditing] = useState({ isExist: false, _id: '' })

  const getPasswords = async () => {
    let req = await fetch('http://localhost:3000/')
    let passwords = await req.json()
    setPasswordArray(passwords)
  }

  useEffect(() => {
    getPasswords()
    setIsEditing({ isExist: false, _id: '' })
  }, [])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const savePassword = async () => {
    if (form.password.length < 1) {
      toast('Password cannot be empty', {
        theme: 'dark'
      })
      return
    }
    if (form.site.length < 1 && form.username.length < 1) {
      toast("Site and Username can't be empty", {
        theme: 'dark'
      })
      return
    }

    if (isEditing.isExist) {
      await fetch('http://localhost:3000/', {
        method: 'DELETE',
        body: JSON.stringify({ _id: isEditing._id }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setPasswordArray(passwordArray.filter(item => item._id != isEditing._id))
      setIsEditing({ isExist: false, _id: '' })
    }

    const newFormReq = await fetch('http://localhost:3000/', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const newForm = await newFormReq.json()
    setPasswordArray(prevArr => [...prevArr, newForm])

    setForm({ site: '', username: '', password: '' })

    toast('Password saved! ', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    })
    // console.log([...passwordArray, form])
  }

  const showPass = () => {
    // alert('showPass')
    if (ref.current.src.includes('eye.png')) {
      ref.current.src = 'eyeCross.png'
      ref.current.className = 'w-7 cursor-pointer relative bottom-2 left-1'
      refPass.current.type = 'password'
    } else {
      ref.current.src = 'eye.png'
      ref.current.className = 'w-5 cursor-pointer '
      refPass.current.type = 'text'
    }
  }

  return (
    <>
      <ToastContainer
        containerId='containerM'
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />

      {/* BackGround */}
      <div className='absolute inset-0 -z-10 h-full w-fit bg-pink-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'></div>
      {/* Logo PassOP */}
      <div className='mainContainer mx-auto  p-4 md:w-[80%] m-4 rounded-xl flex flex-col items-center mb-14 break-words'>
        <h1 className='font-bold text-3xl mx-4'>
          <span className='text-red-700'>&lt;</span>Pass
          <span className='text-red-700'>OP/&gt;</span>
        </h1>
        <p className='mx-4'>Your Own Password Manager</p>
        {/* Site Input */}
        <div className='flex flex-col items-center gap-y-6 m-4 w-[80%]  '>
          <input
            className='w-[100%] border border-red-700 rounded-2xl h-8 p-2'
            type='text'
            name='site'
            value={form.site}
            onChange={handleChange}
            placeholder='Enter website URL'
          />
          {/* UserName and Password Inputs */}
          <div className=' flex flex-col gap-6 md:flex-row md:gap-8 md:m-0 w-[100%] justify-between'>
            <input
              className='border border-red-700  rounded-2xl  md:rounded-l-2xl h-8 md:w-[80%] p-2'
              type='text'
              name='username'
              value={form.username}
              onChange={handleChange}
              placeholder='Enter Username'
            />
            <div className='relative'>
              <input
                className='border border-red-700 rounded-2xl  md:rounded-l-2xl h-8 w-full p-2'
                type='password'
                name='password'
                value={form.password}
                onChange={handleChange}
                ref={refPass}
                placeholder='Enter Password'
              />
              <span className='absolute right-2 top-[10px] '>
                <img
                  className='w-7 cursor-pointer relative bottom-2 left-1 '
                  src='eyeCross.png'
                  alt='show'
                  onClick={showPass}
                  ref={ref}
                />
              </span>
            </div>
          </div>
          {/* Add Password Button */}
          <div className='containButtons flex'>
            <button
              className='flex items-center bg-orange-500 rounded-full w-fit p-2 gap-x-2 m-2 size-10 combined-hover-styles border-2 border-orange-800'
              onClick={savePassword}
              type='button'
            >
              <lord-icon
                src='https://cdn.lordicon.com/jgnvfzqg.json'
                trigger='hover'
              ></lord-icon>
              {isEditing.isExist ? (
                <div>Save Password</div>
              ) : (
                <div>Add Password</div>
              )}
            </button>
            {isEditing.isExist && (
              <button
                className='flex items-center bg-orange-500 rounded-full w-fit p-2 gap-x-2 m-2 size-10 combined-hover-styles border-2 border-orange-800'
                onClick={() => {
                  setIsEditing({ isExist: false, _id: '' })
                  setForm({ site: '', username: '', password: '' })
                }}
              >
                <lord-icon
                  src='https://cdn.lordicon.com/nqtddedc.json'
                  trigger='hover'
                  style={{ width: '25px', height: '25px' }}
                ></lord-icon>
                Cancel
              </button>
            )}
          </div>

          {/* Password Array */}
          <div className='w-full text-center'>
            <PasswordTable
              passwordArray={passwordArray}
              setPasswordArray={setPasswordArray}
              form={form}
              setForm={setForm}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Manager
