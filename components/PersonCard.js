  import React, { useState } from 'react'
  import Image from 'next/image'
  import Link from 'next/link'
  import { fetchPersonId } from '@/utils/person'
  import { useEffect } from 'react'
  const PersonCard = ({ item }) => {
    const [personId, setPersonId] = useState(null)
    useEffect(()=>{

      const getPersonID = async ()=>{
        try{
          console.log(item)
          // const res=await fetchPersonId({name:item.name})
          // console.log(res)
          setPersonId(item.id)
        }
        catch(error){
          console.log('Error fetching person:', error.message)
        }
      }

      getPersonID()
    },[])
    return (
      <Link href={personId ? `/person/${personId}-${encodeURIComponent(item.name)}` : '#'} passHref>
        <div className='w-[150px] h-[330px]'>
          <div className='w-[150px] h-[330px] '>
            <div className="poster w-[130px] h-[200px] rounded-full ">
              <Image alt="poster" className="rounded-xl object-cover" width={130} height={130} src={item.profile_path ? `https://image.tmdb.org/t/p/original/${item.profile_path}` : '/no-avatar.png'}></Image>
            </div>
            <div className="text mx-2 my-1 ">
              <div className='title font-bold overflow-auto text-white'>
                {item.name}
              </div>
              <div className='title text-gray-700 overflow-auto'>
                {item.character}
              </div>
            </div>
          </div>
        </div>
      </Link>
      
    )
  }

  export default PersonCard
