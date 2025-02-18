import React,{useState, useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
function EditBooks() {
  const [title,setTitle]= useState("")
  const [author,setAuthor]=useState("")
  const [publishYear,setPublishYear]= useState('')
  const [loading,setLoading]= useState(false)
  const navigate=useNavigate()
  const {id} =useParams()

  const getData=async()=>{
    const response= await fetch(`http://localhost:5555/books/${id}`)
    const result= await response.json()
    if(response.ok){
      setAuthor(result.author)
      setTitle(result.title)
      setPublishYear(result.publishYear)
      setLoading(false)
    }
    else{
      setLoading(false)
      alert("Some error occured")
    }
  }
  useEffect(()=>{
  getData()

  },[])
  const handleSaveBook=async()=>{
    const data={title,author,publishYear}
    setLoading(true)
     const response= await fetch(`http://localhost:5555/books/${id}`,{
      method:'PUT',
      body: JSON.stringify(data),
      headers:{
        "Content-Type":"application/json"
      }
     })
     const result=await response.json()
     if(!response.ok){
      console.log(result.error)
      return
     }
     if(response.ok){console.log(result)
      navigate('/')
     }
   }
  return (
  <div className='p-4'>
    <BackButton/>
    <h1 className='text-3xl my-4'>Edit Book</h1>
    {loading?(<Spinner/>):""}
    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Title</label>
        <input type='text'
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        className='border-2 border-gray-500 px-4 py-2 w-full'/>
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Author</label>
        <input type='text'
        value={author}
        onChange={(e)=>setAuthor(e.target.value)}
        className='border-2 border-gray-500 px-4 py-2 w-full'/>
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
        <input type='text'
        value={publishYear}
        onChange={(e)=>setPublishYear(e.target.value)}
        className='border-2 border-gray-500 px-4 py-2 w-full'/>
      </div>
    
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>Save</button>
      
    </div>
  </div>
  )
}

export default EditBooks
