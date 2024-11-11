import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getQuote } from '../Action/action';
import moment from 'moment';
import { useNavigate } from 'react-router';
import sky from '../images/sky.jpeg'
import logout from '../images/logout.png'
import { LOGIN } from '../Constant/constant';

// Homepage to show all quotes created by user
const Homepage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const scroll = useRef()
  const { quoteData, loading } = useSelector(state => state.quoteData)
  const [page, setPage] = useState(0)
  const [allData, setAllData] = useState([])

  useEffect(() => {
    let debounceTimer;
    const handleScroll = () => {
      if (quoteData?.data?.data?.length > 0) {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10 && !loading) {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            setPage((prevPage) => prevPage + 20);
            setAllData((prevData) => [...prevData, ...quoteData.data.data])
          }, 200);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(debounceTimer);
    };
  }, [loading]);

  useEffect(() => {
    dispatch(getQuote(page))
  }, [page])

  useEffect(() => {
    if (page == 0)
      setAllData(quoteData?.data?.data)
  }, [quoteData])

  const handleLogout = () => {
    localStorage.setItem("token", null)
    navigate('/')
    dispatch({ type: LOGIN })
  }

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 w-[80%] mx-auto mt-4'>
        <button onClick={() => handleLogout()} className='fixed right-5 z-10 top-5 bg-gray-400 rounded pt-1 pb-1 px-3 text-white text-sm flex'><p className='my-auto'>Logout</p><img className='my-auto ml-2' width={'15px'} src={logout} /></button>
        {
          allData?.map((e) => {
            return <div ref={scroll}>
              <div className='relative mb-4'>
                <div className='bg-gray-200'><img className='h-[200px] mx-auto' src={e.mediaUrl ?? sky} /></div>
                <div className="absolute mx-auto w-[20%] inset-0 flex items-center justify-center">
                  <p className="drop-shadow-lg text-center bg-gray-500 bg-opacity-50 px-3 py-1 rounded-md text-white text-md font-bold">
                    {e.text.split(" ").length > 10
                      ? e.text.split(" ").slice(0, 10).join(" ") + "..."
                      : e.text}
                  </p>
                </div>
                <div className='flex justify-center mt-1'><p className='text-gray-600 text-sm'>{e.username}</p><p className='text-gray-600 text-sm'>{moment(e.createdAt).format('D MMM, YYYY')}</p></div>
              </div>
            </div>
          })
        }
      </div>
      <button onClick={() => navigate('/createQuote')} className='fixed bottom-5 right-5 bg-sky-600 py-2 px-4 rounded-lg z-10 text-white text-xl'>Create Quote</button>
    </>
  )
}

export default Homepage;
