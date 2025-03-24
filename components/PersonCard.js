import React from 'react'
import Image from 'next/image'

const PersonCard = ({ item }) => {
  return (
    <div className='w-[150px] h-[330px]'>
      <div className='w-[150px] h-[330px] '>
        <div className="poster w-[130px] h-[200px] rounded-full ">
          <Image alt="poster" className="rounded-xl object-cover" width={130} height={130} src={item.profile_path ? `https://image.tmdb.org/t/p/original/${item.profile_path}` : '/no-avatar.png'}></Image>
        </div>
        <div className="text mx-2 my-1 ">
          <div className='title font-bold overflow-auto'>
            {item.name}
          </div>
          <div className='title text-gray-700 overflow-auto'>
            {item.character}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonCard
