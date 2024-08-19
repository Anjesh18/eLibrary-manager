import React,{useState} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from "axios"
import { useNavigate, useParams} from 'react-router-dom'

function DeleteBook() {
  const {id}= useParams()
  const navigate= useNavigate()
  const [loading,setLoading]= useState(false)

  const handleDelete=async()=>{
    const response= await fetch(`http://localhost:5555/books/${id}`,{
      method:'DELETE'
    })
    const result= response.json()
    if(response.ok){
      setLoading(false)
      navigate('/')
    }
    else{
      setLoading(false)
      alert('Some error occured')
      console.log(response)
    }
  }
  return (
    <div className='p-4'>
     <BackButton/>
     <h1 className='text-3xl my-4 '>Delete Book</h1>
     {loading ? <Spinner/>:''}
     <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl p-8 mx-auto w-[600px]'>
     <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
     <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDelete}>Yes, Delete</button>
     </div>
    </div>
  )
}

export default DeleteBook
