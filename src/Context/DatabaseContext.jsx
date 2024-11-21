import { createContext,useContext,useEffect,useState } from "react";
import { collId, databases, dbId } from "../Appwrite/AppwriteConfig";
import { ID, Query } from "appwrite";

 const MessageContext = createContext();

//  custom hook to get the context data
export const useDatabase = () => {
  return useContext(MessageContext);
};

//  context provider
  export const MessageProvider = ({ children }) => {
      const [message,setMessage] = useState([]);

      // sending messeges to database
      const addMessage = async (messagee) => {
          try {
            const response = await databases.createDocument(dbId,collId, ID.unique(),messagee);
            setMessage(prev  =>[response,...prev]);
          } catch (error) {
            console.log(error);
            
          }
      }
    // getting messeges from database
      const getMessages = async () => {
      const response = await  databases.listDocuments(dbId,collId
        ,[Query.orderDesc('$createdAt')]
      );
      setMessage(response.documents);
      console.log(response.documents);
      
    };

    return(
        <MessageContext.Provider value={{message,setMessage,getMessages,addMessage}}>
            {children}
        </MessageContext.Provider>
    )
  }