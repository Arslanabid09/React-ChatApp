import React, { useEffect, useState } from 'react';
import { ID, Query } from 'appwrite';
import { useAuth } from '../Context/AuthContext';
import { FiSend } from 'react-icons/fi';
import { FaSmile, FaTrash } from 'react-icons/fa';
import client, {collId, databases, dbId } from '../Appwrite/AppwriteConfig';


const Home = () => {
  let { user } = useAuth();
//  state for textArea
  const [text, setText] = useState('');
  // state to store and map the messages
  const [messages, setMessages] = useState([]);
  // useEffect to fetch the messages from database
  useEffect(()=>{
    getMessages()
      // adding realTime Events
      // subscribe is used listens for real-time changes in the specified collection and triggers the callback on update.
     const unsubscribe =   client.subscribe([`databases.${dbId}.collections.${collId}.documents`], response => {
        // Callback will be executed on changes for documents A and all files.
        if(response.events.includes(`databases.*.collections.*.documents.*.create`)){
          setMessages((prevChat) => [response.payload, ...prevChat]);
          console.log('realTime Event created');
        }
        if(response.events.includes(`databases.*.collections.*.documents.*.delete`)){
          setMessages((prevChat)=> prevChat.filter((msg)=> msg.$id !== response.payload.$id))
          console.log('delete event created');
          
        }
    });

    // returning it to prevent the memory leakage
    return ()=>{
      unsubscribe();
    }
  },[])
// sending messages 
 const handleSubmit = async()=>{
  // Object to store message data, including username, user ID, and message text.
  const msgData = {
    username:user.name,
    user_id:user.$id,
    body:text
  }
  // createDocument is used to create a doc
       const response = await databases.createDocument(dbId,collId,ID.unique(),msgData);
      //  setMessages((prev)=> [response,...prev])
       setText('');
 }
//  getting messages from database
const getMessages = async()=>{
  // listDocuments is used to list all documents
    const response = await databases.listDocuments(dbId,collId,[
      // Query.orderDesc('$createdAt') is used to sort the documents in descending order of their creation time.
      Query.orderDesc('$createdAt'),
      // Query.limit(100) is used to limit the number of documents to 100.
      Query.limit(100)  
    ]);
    // storing response in messages state
    setMessages(response.documents);
    console.log(response.documents);
}
  // deleting the messages on the basis of id 
  const handleDelete = async(id)=>{
    // deleteDocument is used to delete a single document 
        await databases.deleteDocument(dbId,collId,id);
        // setMessages((prevChat)=> prevChat.filter(msg => msg.$id !==id ));
  }
  return (
    <main className="text-white my-20 px-4">
      {/* Input Section as Fixed Footer */}
      <section className=" flex items-center gap-x-4 px-4 bg-blue-400 py-3 rounded-t-md shadow-md">
        <FaSmile className="text-black/60 text-xl cursor-pointer hover:text-black transition-colors" />
        <textarea
          className="w-full border-none resize-none outline-none bg-transparent placeholder:text-black/70 text-black text-base font-semibold rounded-md"
          placeholder="Type something..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        {text.trim().length > 0 && (
          <FiSend
            className="text-black/60 text-2xl cursor-pointer hover:text-black transition-colors"
            onClick={handleSubmit}
          />
        )}
      </section>
      {/* Messages Section */}
      <section className="px-10 mt-10  space-y-4">
        {messages &&
          messages.map((msg) => (
            <div key={msg.$id} className={`flex flex-col  gap-y-1 ${msg.user_id === user.$id? 'items-start': 'items-end'} `}>
              {/* Username */}
              <p className="text-sm font-bold">{msg.username}</p>
              {/* Message Body */}
              <div className="flex gap-1">
                <p className={ `${msg.user_id === user.$id? "bg-white text-black":" bg-black text-white"} h-auto font-semibold max-w-md p-3 rounded-lg shadow-md break-words`}>{msg.body}</p>
                {msg.user_id === user.$id && (
                  <FaTrash className='text-xs cursor-pointer mt-1' 
                  onClick={()=> handleDelete(msg.$id)}
                  />
                )}
              </div>
              
              {/* Message Time */}
              {msg.$createdAt && (
                <time
                  className="text-xs mt-1  "
                >
                  {new Date(msg.$createdAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </time>
              )}
            </div>
          ))}
      </section>

      
    </main>
  );
};

export default Home;