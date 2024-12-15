import { createContext ,useContext,useEffect,useState } from "react";
import { account } from "../Appwrite/AppwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";
import { toast } from "react-toastify";



// creating context 
// use of createContext: it is used to share data between components without the use of props in every level of component tree in simple words it is a global container store data 
 const AuthContext = createContext()

//  custom hook for handling data 
export const useAuth = ()=>{
    // useage: this way i can simplify the meathod of accessing data everyWhare. I don't need to write useContext(authContext) everyWhere
    return useContext(AuthContext);
}

// context Provider 
// useAge: this will wraps the app and provides the data (user,login,register etc)
export const AuthProvider = ({ children })=>{
  const [loading,setLoading] = useState(false);
  const [user,setUser] = useState(null);
  // use navigate to navigate the user  on the basis of condition
  const navigate = useNavigate();
  
  // getting user 
  
  const handleUser = async () => {
    setLoading(true);
    try {
      const response = await account.get();
      setUser(response);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    handleUser();
},[])

  // handling Login with appWrite
  const handleLogin = async(userData)=>{
      // createEmailPasswordSession: create a  session for user
      try {
           await account.createEmailPasswordSession(userData.email,userData.password);
          // storing the response in user
          const userDetails = await account.get();
      setUser(userDetails);
      } catch (error) {
        if(error.code == 401){
          toast.error("User does not Exist")
        }else{
        toast.error('something went wrong')
          console.error(error);
        }
      }
  }
  // handling signUp with appWrite
  const handleSignUp = async(userInfo)=>{
    try {
      // registering the user with appwrite
      await account.create(ID.unique(),userInfo.email,userInfo.password,userInfo.name)
      // creating a session for the registered user
      await account.createEmailPasswordSession(userInfo.email,userInfo.password);
      // getting the users details 
      const userData = account.get();
      console.log(userData);
      setUser(userData);
      navigate('/Room')
    } catch (error) {
      if(error.code == 409){
        toast.error('user already existes')
      }else{
        toast.error('something went wrong')
        console.error(error);
      }
      
    }
  }
  // handling Logout with appwrite
  const handleLogOut = async()=>{
    try {
     const response =  await account.deleteSession('current');
     if(response){
       setUser(null);
     }
      
    } catch (error) {
      toast.error("something went wrong")
      console.log(error);
      
    }
  }
  // this holds all the data like functions states etc 
  const AuthData = {
      // this holds data of user
      user,
      // these are functions to handle Auth
      handleLogin,
      handleSignUp,
      handleLogOut,
      handleUser
  }
 return(
     <AuthContext.Provider value={AuthData} >
      {/* this makes the data available for all the childs */}
      { loading? <p className="text-center text-white text-6xl  mt-60 font-extrabold">Loading...</p>:children}
  </AuthContext.Provider>
) 

}
