import React, { useEffect, useState } from 'react';
import { useDatabase } from '../Context/DatabaseContext';
import { ID } from 'appwrite';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../Context/AuthContext';
import {BiTrash} from 'react-icons/bi';
// importing google fonts
const googleFont = `@import url('https://fonts.googleapis.com/css2?family=Anton&family=Archivo:ital,wght@0,100..900;1,100..900&family=Bebas+Neue&family=DynaPuff:wght@400..700&family=Faculty+Glyphic&family=Hubot+Sans:ital,wght@0,200..900;1,200..900&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Londrina+Sketch&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Oswald:wght@200..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Space+Grotesk:wght@300..700&family=Teko:wght@300..700&family=Tilt+Warp&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');`
const Home = () => {
  const { message, addMessage, getMessages,handleDelete } = useDatabase();
  // getting user from useAuth
  let {user} = useAuth();
  console.log(user.name);
  
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
      const payload = {
        username: user.name,
        user_id:user.$id,
        body:text,
      }
      addMessage(payload);
      setText('');
    }
  };
  return (
    <main className="text-white  ">
      <style>
        {googleFont}
      </style>
  <ToastContainer />
  <div className="w-full mx-auto sm:w-3/4  bg-gradient-to-br from-slate-800 via-gray-900 to-gray-800 p-3 mt-6 rounded-xl">
    {/* Main container */}
    <div className="flex gap-3 items-center  font-semibold bg-gradient-to-r from-gray-700 to-gray-800 text-white placeholder-gray-400 resize-none rounded-lg border-2 border-slate-700 ">
      {/* Text area container */}
      <textarea
        className=" w-full p-4 bg-transparent border-none outline-none resize-none"
        placeholder="Say something amazing..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      ></textarea>
      {/* Send button */}
      {text.length > 0 && (
        <button
          className="bg-white text-black px-5 py-2 font-semibold rounded-md mx-3"
          onClick={handleMessages}
        >
          Send
        </button>
      )}
    </div>

    {/* Message box */}
    <div className="my-3 px-3 max-h-[400px] overflow-y-auto bg-slate-800  p-2 rounded-lg shadow-inner">
      {message &&
        message.map((msg) => (
          <div key={msg.$id} className={`space-y- ${msg.user_id ===user.$id ? 'justify-start':'justify-end'}`}>
            <div className="">
              <p className="text-gray-400 text-center text-xs">{formatTime(msg.$createdAt).slice(0,11) || 'time'}</p>
            </div>
              <h4 className="tracking-wide font-bold text-blue-400">
                {msg.username || 'Your Name'}
              </h4>
            <div className="flex  items-start">
  <span className={`${msg.user_id ===user.$id ? 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 ':' bg-transparent border border-white text-white'}     py-1 px-5 font-medium shadow-lg break-words w-auto max-w-[70%]`} 
  style={{fontFamily:"Ubuntu, serif"}}
  >
    {msg.body}
    <p className="text-gray-400 mt-2 text-end text-xs">{formatTime(msg.$createdAt).slice(13) || 'time'}</p>
  </span>
  {/* this way everyone can del only their own msg */}
  {msg.user_id === user.$id && (
      <BiTrash
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
