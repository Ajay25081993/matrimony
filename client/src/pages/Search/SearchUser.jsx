import React from 'react'
import CriteriaForSearching from '../../components/Searching by criteria/CriteriaForSearching'
import Header from '../../components/Header/Header4'

const SearchUser = () => {
  return (
    <div className=' w-full '>
        <Header/>
        <div className='w-full  py-25'>
            <CriteriaForSearching/>
        </div>
        
    </div>
  )
}

export default SearchUser