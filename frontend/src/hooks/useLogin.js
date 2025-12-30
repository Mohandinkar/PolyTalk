import React from 'react'
import {login} from '../lib/api.js'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useLogin = () => {
      const queryClient = useQueryClient();
    
      const {mutate, isPending, error} = useMutation({
        mutationFn : login,
        onSuccess:()=> queryClient.invalidateQueries({queryKey: ['authUser']})
      })
    
      return {loginMutation:mutate, isPending, error};
}

export default useLogin;
