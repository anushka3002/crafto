import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getQuote } from '../Action/action';
import moment from 'moment';
import { useNavigate } from 'react-router';
import sky from '../images/sky.jpeg'

const Homepage = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {quoteData} = useSelector(state=>state.quoteData)
  const [page, setPage] = useState(0)

  useEffect(()=>{
    dispatch(getQuote(page))
  },[page])

  const handlePrev = () =>{
    setPage(prev=>prev-1)
  }

  const handleNext = () =>{
    setPage(prev=>prev+1)
  }

  return (
    <>
    <div>Quotes</div>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-[80%] mx-auto'>
      {quoteData?.data?.data?.map((e)=>{
        return <div>
        <div className='relative mb-4'>
        <img className='h-[200px] mx-auto' src={e.mediaUrl ?? sky}/>
        <p className='w-[10%] drop-shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-wrap text-white text-xl font-bold'>{e.text}</p>
        <div className='flex justify-center mt-1'><p className='text-gray-600 text-sm'>{e.username}</p><p className='text-gray-600 text-sm'>{moment(e.createdAt).format('D MMM, YYYY')}</p></div>
        </div>
        </div>
      })}
    </div>
    <button onClick={handlePrev} className='fixed bottom-5 left-5 bg-gray-400 py-1 px-4 rounded-lg z-10 text-white text-md'>Prev</button>
    <button onClick={handleNext} className="fixed bottom-5 left-20 ml-2 bg-gray-400 py-1 px-4 rounded-lg z-10 text-white text-md">Next</button>
    <button onClick={()=>navigate('/createQuote')} className='fixed bottom-5 right-5 bg-sky-600 py-2 px-4 rounded-lg z-10 text-white text-xl'>Create Quote</button>
    </>
  )
}


export default Homepage;
