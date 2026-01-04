import { axiosInstance } from "./axios.js";

export const signUp = async(signUpData)=>{
      const res = await axiosInstance.post('/auth/signup', signUpData);

      return res.data;
}

export const login = async(loginData)=>{
      const res = await axiosInstance.post('/auth/login', loginData);
      return res.data;
}

export const logout = async()=>{
      const res = await axiosInstance.post('/auth/logout');
      return res.data;
}

export const getAuthUser = async()=>{
      try {
            const res = await axiosInstance.get('/auth/me');
            return res.data; 
      } catch (error) {
            console.error('Error fetching auth user:', error);
            return null;
      }
}

export const completeOnboarding = async(userData) => {
      const res = await axiosInstance.post('/auth/onboarding', userData);
      
      return res.data;
}

export const getUserFriends = async()=>{
      const res = await axiosInstance.get('/users/friend');
      return res.data;
}

export const getRecommandedUsers = async()=>{
      const res = await axiosInstance.get('/users');
      return res.data;
}

export const getOutgoingFriendRequests = async()=>{
      const res = await axiosInstance.get("/users/outgoing-friend-request");
      return res.data;
}

export const sendFriendRequest = async(userId)=>{
      const res = await axiosInstance.post(`/users/friend-request/${userId}`);
      return res.data;
}