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
    // fetching the message data from database
      useEffect(() => {
        getMessages();
      }, []); 
      // sending messeges to database
      const addMessage = async (messagee) => {
          try {
            const response = await databases.createDocument(dbId,collId,ID.unique(),messagee);
            setMessage(prev  =>[response,...prev]);
          } catch (error) {
            console.log(error);
            
          }
      }
    // getting messeges from database
      const getMessages = async () => {
      const response = await  databases.listDocuments(dbId,collId
        ,[
          Query.orderDesc('$createdAt'),]
      );
      setMessage(response.documents);
      console.log(response.documents);
    };
    // deleting the messages 
    const handleDelete = async(id)=>{
      // deleting message on the basis of id
      await databases.deleteDocument(dbId,collId,id)
      // filtering the message state on the basis of Id 
      const updatedChat = message.filter((msg)=>msg.$id !==id);
      // updating the the message state
      setMessage(updatedChat);
    }
    const messageData = {
      // messages state
      message,
      setMessage,
      // function for handling messages
      getMessages,
      addMessage,
      handleDelete
    }
    return(
        <MessageContext.Provider value={messageData}>
            {children}
        </MessageContext.Provider>
    )
  }