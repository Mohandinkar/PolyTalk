
import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { useQueryClient } from '@tanstack/react-query';
import { signUp } from '../lib/api.js';

const useSignup = () => {
    const queryClient = useQueryClient();

    const {mutate, isPending, error} = useMutation({
        mutationFn:signUp,
        onSuccess:()=> queryClient.invalidateQueries({queryKey: ['authUser']}),
    });

    return {signUpMutation:mutate, isPending, error};
}

export default useSignup
