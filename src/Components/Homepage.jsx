import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getQuote } from '../Action/action';

const Homepage = () => {

  const dispatch = useDispatch()
  const {getQuoteData} = useSelector(state=>state.getQuoteData)

  useEffect(()=>{
    dispatch(getQuote())
  },[])

  return (
    <div>Homepage</div>
  )
}

export default Homepage;
