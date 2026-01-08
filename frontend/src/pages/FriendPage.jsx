import React from 'react'
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserFriends } from '../lib/api.js';
import FriendCard from '../components/FriendCard.jsx';

const FriendPage = () => {

    const queryClient = useQueryClient();

    const {data:friends=[], isLoading:loadingFriends} = useQuery({
        querykey:["friends"],
        queryFn: getUserFriends
    })


  return (
    
    <div className='p-4 lg:p-8 sm:p-6'>
        <div className='container mx-auto mb-8'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
            </div>
        </div>

        {loadingFriends ? (
            <div className='flex justify-center p-y-12'>
            <span className='loading loading-spinner loading-lg'/> 
          </div>
        ):
            friends.length ===0 ? (
                <div className='text-2xl sm:text-3xl font-bold tracking-tight'>
                    You don't have any friends yet. Find language partners to connect with!
                </div>
            ):(
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>

                    {friends.map((friend)=>(
                        <FriendCard key={friend._id} friend={friend} />
                    ))}

                </div>
            )
        }
    </div>
  )
}

export default FriendPage
