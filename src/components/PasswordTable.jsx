import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'

/**
 *
 * @param {Array} passwordArray
 */
const copyContent = items => {
  // Clipboard
  // alert(items)
  navigator.clipboard.writeText(items)
  toast('Copied to clipboard! ', {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  })
}

const PasswordTable = ({
  passwordArray,
  setPasswordArray,
  form,
  setForm,
  isEditing,
  setIsEditing
}) => {
  if (passwordArray.length === 0) return <div>No passwords to show</div>

  const deletePassword = async _id => {
    let c = confirm('Are you sure you want to delete this password?')
    if (c) {
      setPasswordArray(passwordArray.filter(item => item._id != _id))
      const delReq = await fetch('http://localhost:3000/', {
        method: 'DELETE',
        body: JSON.stringify({ _id: _id }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      toast('Password deleted! ', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
    }
  }
  const editPassword = _id => {
    setForm(passwordArray.filter(item => item._id === _id)[0])
    setIsEditing({ isExist: true, _id: _id })
  }

  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      {/* toast */}
      <ToastContainer
        containerId='containerP'
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      {/* Same as */}
      <ToastContainer />

      <div className='overflow-auto '>
        <h2 className='font-bold text-xl'>Your Passwords are here</h2>
        <br />
        <table className='table-auto bg-pink-200 w-full container  rounded-lg overflow-hidden text-center '>
          <thead className='bg-pink-500 '>
            <tr className=''>
              <th className=''>Site</th>
              <th className=''>Username</th>
              <th className=''>Password</th>
              <th className=''>Actions</th>
            </tr>
          </thead>
          <tbody className=''>
            {passwordArray.map((item, index) => {
              return (
                <tr
                  key={item._id}
                  className='border-b-2 border-red-300 container '
                >
                  <td className=' border-r-2 border-purple-300 py-2 gap-2 overflow-auto   '>
                    <div className='div flex justify-between'>
                      <div className=''></div>
                      <a
                        href={item.site}
                        target='_blank'
                        className='break-words'
                      >
                        {item.site}
                      </a>
                      <div
                        className='cursor-pointer'
                        onClick={() => {
                          copyContent(item.site)
                        }}
                      >
                        <lord-icon
                          src='https://cdn.lordicon.com/rbbnmpcf.json'
                          trigger='hover'
                          style={{ width: '20px', height: '20px' }}
                        ></lord-icon>
                      </div>
                    </div>
                  </td>

                  <td className='border-r-2 border-purple-300 py-1 '>
                    <div className='div flex justify-between'>
                      <div className='blank'></div>
                      <div className='username'>{item.username}</div>
                      <div
                        className='cursor-pointer'
                        onClick={() => {
                          copyContent(item.username)
                        }}
                      >
                        <lord-icon
                          src='https://cdn.lordicon.com/rbbnmpcf.json'
                          trigger='hover'
                          style={{ width: '20px', height: '20px' }}
                        ></lord-icon>
                      </div>
                    </div>
                  </td>

                  <td className='  border-r-2 border-purple-300 py-2 gap-2  '>
                    <div className='div flex justify-between'>
                      <div className='div '></div>
                      <div className='div '>
                        {isVisible
                          ? item.password
                          : '*'.repeat(item.password.length)}
                      </div>
                      <div
                        className='cursor-pointer'
                        onClick={() => {
                          copyContent(item.password)
                        }}
                      >
                        <lord-icon
                          src='https://cdn.lordicon.com/rbbnmpcf.json'
                          trigger='hover'
                          style={{ width: '20px', height: '20px' }}
                        ></lord-icon>
                      </div>
                    </div>
                  </td>

                  <td className='  border-r-2 border-purple-300 py-2 gap-2 w-[10%] '>
                    <div className='div flex justify-center gap-1 invert'>
                      <span onClick={() => deletePassword(item._id)}>
                        <lord-icon
                          src='https://cdn.lordicon.com/vlnvqvew.json'
                          trigger='hover'
                          style={{ width: '20px', height: '20px' }}
                        ></lord-icon>
                      </span>
                      <span onClick={() => editPassword(item._id)}>
                        <lord-icon
                          src='https://cdn.lordicon.com/oqaajvyl.json'
                          trigger='hover'
                          style={{ width: '20px', height: '20px' }}
                        ></lord-icon>
                      </span>
                      <span
                        onClick={() => {
                          setIsVisible(!isVisible)
                        }}
                      >
                        <lord-icon
                          src='https://cdn.lordicon.com/ccrgnftl.json'
                          trigger='hover'
                          style={{ width: '20px', height: '20px' }}
                        ></lord-icon>
                      </span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default PasswordTable
