import { createContext, useContext, useEffect, useState } from "react";
import { databases, account } from "../Appwrite/AppwriteConfig";
import { ID } from "appwrite";


const AuthContext = createContext();

// custom hook to handle data
export const useAuth = () => useContext(AuthContext);

// context provider 
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // handle sign in
  const handleLogin = async (email, password) => {
    try {
      const response = await account.createEmailPasswordSession(email, password);
      return response; // Return the response
    } catch (error) {
      console.error('Error during account creation:', error); // Log the error for debugging
      return null;
    }
  }
  // handle sign up
  const handleSignUp = async (email, password, Name) => {
    try {
      const response = await account.create(ID.unique(), email, password, Name);
      return response; // Return the response
    } catch (error) {
      console.error('Error during account creation:', error); // Log the error for debugging
      return null;
    }
  };


  // getting user data
  const getUser = async () => {
    // try {
    //     const response = await account.get();
    //     setUser(response);
    // } catch (error) {
    //     console.log(`Error is in AuthContext:${error}`);

    // }
  }
  // useEffect to run the function
  useEffect(() => {
    getUser();
  }, [])

  return <AuthContext.Provider value={{handleLogin,handleSignUp, setUser, user }}>
    {children}
  </AuthContext.Provider>
}
