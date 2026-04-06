import React from 'react'
import useGetSuggestedUsers from '../hooks/useGetSuggestedUsers'
import Feed from '@/features/feed/components/Feed'
import RightSidebar from '../components/Rightsidebar'

const Home = () => {

  useGetSuggestedUsers()

  return (
    <div className='flex'>
        <div className='flex-grow'>
          <Feed/>
        </div>
        <RightSidebar/>
    </div>
  )
}

export default Home