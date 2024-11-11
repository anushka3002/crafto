import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getQuote } from '../Action/action';
import moment from 'moment';
import { useNavigate } from 'react-router';
import sky from '../images/sky.jpeg'

const Homepage = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const scroll = useRef()
  const {quoteData, loading} = useSelector(state=>state.quoteData)
  const [page, setPage] = useState(0)
  const [allData, setAllData] = useState([])

  useEffect(() => {
    let debounceTimer;
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10 && !loading) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          setPage((prevPage) => prevPage + 20);
          setAllData((prevData) => [...prevData, ...quoteData.data.data])
        }, 200);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(debounceTimer); 
    };
  }, [loading]);

  useEffect(()=>{
    dispatch(getQuote(page))
  },[page])

  useEffect(()=>{
    if(page == 0)
    setAllData(quoteData?.data?.data)
  },[quoteData])

  return (
    <>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 w-[80%] mx-auto mt-4'>
      {
        allData?.map((e)=>{
          return <div ref={scroll}>
          <div className='relative mb-4'>
          <div className='bg-gray-200'><img className='h-[200px] mx-auto' src={e.mediaUrl ?? sky}/></div>
          <p className='w-[10%] drop-shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-wrap text-white text-xl font-bold'>{e.text}</p>
          <div className='flex justify-center mt-1'><p className='text-gray-600 text-sm'>{e.username}</p><p className='text-gray-600 text-sm'>{moment(e.createdAt).format('D MMM, YYYY')}</p></div>
          </div>
          </div>
        })
      }
    </div>
    <button onClick={()=>navigate('/createQuote')} className='fixed bottom-5 right-5 bg-sky-600 py-2 px-4 rounded-lg z-10 text-white text-xl'>Create Quote</button>
    </>
  )
}

export default Homepage;
