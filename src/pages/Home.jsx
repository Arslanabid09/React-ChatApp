import React, { useEffect, useState } from 'react';
import { useDatabase } from '../Context/DatabaseContext';
import { ID } from 'appwrite';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../Context/AuthContext';
import { FaTrash } from 'react-icons/fa';

const Home = () => {
  const { message, addMessage, getMessages,handleDelete } = useDatabase();
  // getting user from useAuth
  let {user} = useAuth();
 
  
  const [text, setText] = useState('');
  // Format time for messages
  const formatTime = (time) => {
    const date = new Date(time);
    let options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleTimeString('en-US', options);
  };
  
  // Fetch messages when the component mounts
  useEffect(() => {
    getMessages();
  }, []); 
  // Sending messages to the database
  const handleMessages =  () => {
   if(text.length < 1 || text== ''){
    toast.error('Message cannot be empty')
   }else if(text.trim()){
    const message = {
      username: user.name,
      body: text,
      user_id:user.$id,
    }
     addMessage(message);
    setText('');
   }
  };


  return (
    <main className="bg-gradient-to-br from-gray-800 via-slate-900 to-black min-h-screen text-white flex justify-center items-center">
  <ToastContainer />
  <div className="w-full sm:w-3/4 lg:w-1/2 my-10 bg-gradient-to-br from-slate-800 via-gray-900 to-gray-800 p-6 rounded-xl shadow-2xl">
    {/* Main container */}
    <div className="relative mb-6">
      {/* Text area container */}
      <textarea
        className="p-4 w-full font-semibold bg-gradient-to-r from-gray-700 to-gray-800 text-white placeholder-gray-400 resize-none rounded-lg border-2 border-slate-700 focus:border-blue-500 focus:ring focus:ring-blue-300 transition"
        placeholder="Say something amazing..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      ></textarea>
      {/* Send button */}
      {text.length > 0 && (
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-5 rounded-lg shadow-lg transition transform hover:scale-105"
          onClick={handleMessages}
        >
          Send
        </button>
      )}
    </div>

    {/* Message box */}
    <div className="my-10 px-5 space-y-6 max-h-[400px] overflow-y-auto bg-slate-800 bg-opacity-80 p-4 rounded-lg shadow-inner">
      {message &&
        message.map((msg) => (
          <div key={msg.$id} className={`space-y-3 ${msg.user_id ===user.$id ? 'justify-start':'justify-end'}`}>
            <div className="flex justify-between items-center">
              <h4 className="tracking-wide font-bold text-blue-400">
                {msg.username || 'Your Name'}
              </h4>
              <p className="text-gray-400 text-xs">{formatTime(msg.$createdAt) || 'time'}</p>
            </div>
            <div className="flex justify-between items-center">
  <span className={"bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 inline-block rounded-xl py-2 px-5 font-medium shadow-lg break-words w-auto max-w-[70%]"}>
    {msg.body}
  </span>
  {/* this way everyone can del only their own msg */}
  {msg.user_id === user.$id && (
      <FaTrash
      onClick={() => handleDelete(msg.$id)}
      className="hover:text-red-600 cursor-pointer duration-300 ml-2"
    />
  )}
</div>

          </div>
        ))}
    </div>
  </div>
</main>

  );
};

export default Home;
