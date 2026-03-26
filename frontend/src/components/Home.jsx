import React from 'react'
import Feed from './Feed'
import Rightsidebar from './Rightsidebar'
import { useSelector } from 'react-redux'
import useGetSuggestedUsers from '@/hook/useGetSuggestedUsers'

const Home = () => {

  useGetSuggestedUsers()
  const {user} = useSelector(store=>store.auth);  


  return (
    <div className='flex'>
        <div className='flex-grow'>
          <Feed/>
        </div>
        <Rightsidebar/>
    </div>
  )
}

export default Home