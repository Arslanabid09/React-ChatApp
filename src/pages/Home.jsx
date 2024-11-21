import React, { useEffect, useState } from 'react';
import { useDatabase } from '../Context/DatabaseContext';
import { ID } from 'appwrite';
import { useAuth } from '../Context/AuthContext';

const Home = () => {
  const { message, addMessage, getMessages } = useDatabase();
  const {user} = useAuth();
  const [text, setText] = useState('');
  console.log(message);
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
  const handleMessages = async () => {
   if(text.length < 1 || text== ''){
    alert('Message cannot be empty')
   }else if(text.trim()){
    const message = {
      username: 'Your Name',
      body: text,
      user_id: ID.unique(),
    }
    await addMessage(message);
    setText('');
   }
  };


  return (
    <main className="bg-slate-800 text-white flex justify-center">
      <div className="w-full sm:w-2/3 lg:w-1/2 my-10 bg-slate-900 p-6 rounded-lg shadow-lg">
        {/* Main container */}
        <div className="relative mb-6"> {/* Text area container */}
          <textarea
            className="p-3 w-full font-semibold bg-black text-white resize-none rounded-md border-2 border-slate-600 focus:outline-none"
            placeholder="Say Something"
            onChange={(e) => setText(e.target.value)}
            value={text}
          ></textarea>
          {/* Send button */}
          {text.length > 0 && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-100 hover:bg-slate-200 font-semibold py-2 px-4 text-black rounded-md transition"
              onClick={handleMessages}
            >
              Send
            </button>
          )}
        </div>

        {/* Message box */}
        <div className="my-10 px-5 space-y-4 max-h-[400px] overflow-y-auto">
             {message && message.map((msg)=>(
               <div  key={msg.$id} className="space-y-3">
               <div className="flex justify-between items-center">
                 <h4 className="tracking-wider font-semibold">{msg.username|| 'Your Name'}</h4>
                 <p className="text-gray-400 font-medium text-sm">{ formatTime(msg.$createdAt)|| 'time'}</p>
               </div>
               <p className="bg-slate-100 inline-block rounded-md py-2 px-4 text-black font-semibold break-words sm:w-full md:w-auto max-w-[60%]">
                  { msg.body||'your text here'}
               </p>
             </div>
             ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
