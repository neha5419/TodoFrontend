import { create } from 'zustand'




const useStore = create((set) => ({
   isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  
   userId:null,
   isAuthenticated:false,
   setUserId:()=>()=>{
      const userId=localStorage.getItem("userId"
      );
      
   }
}))
export default useStore;