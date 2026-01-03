import { useQueryClient, useQuery} from '@tanstack/react-query';
import { useState } from 'react';
import { getUserFriends, getRecommandedUsers, getOutgoingFriendRequests } from '../lib/api.js';

const HomePage = () => {

  const queryClient = useQueryClient();

  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState([]);

  const {data: friends=[], isLoading: loadingFriends} = useQuery({
    queryKey:["friends"],
    queryFn: getUserFriends
  })

  const {data: recommandedUsers=[], isLoading: loadingUsers} = useQuery({
    queryKey:["users"],
    queryFn: getRecommandedUsers
  })
  
  const {data:outgoingFriendReqs} = useQuery({
    queryKey:["outgoing-friend-requests"],
    queryFn: getOutgoingFriendRequests,
  })

  return (
    <div>
      
    </div>
  )
}

export default HomePage
