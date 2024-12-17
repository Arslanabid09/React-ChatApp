import React, { useEffect, useState } from 'react';
import { ID, Query } from 'appwrite';
import { useAuth } from '../Context/AuthContext';
import { FiSend } from 'react-icons/fi';
import {FaTrash} from 'react-icons/fa';
import client, { collId, databases, dbId } from '../Appwrite/AppwriteConfig';
import { toast } from 'react-toastify';

const Home = () => {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch messages from the database
    getMessages();

    // Subscribe to real-time events
    const unsubscribe = client.subscribe(
      [`databases.${dbId}.collections.${collId}.documents`],
      (response) => {
        if (response.events.includes(`databases.*.collections.*.documents.*.create`)) {
          setMessages((prevChat) => [response.payload, ...prevChat]);
        }
        if (response.events.includes(`databases.*.collections.*.documents.*.delete`)) {
          setMessages((prevChat) =>
            prevChat.filter((msg) => msg.$id !== response.payload.$id)
          );
        }
      }
    );

    // Prevent memory leaks
    return () => {
      unsubscribe();
    };
  }, []);

  // Fetch messages
  const getMessages = async () => {
    try {
      const response = await databases.listDocuments(dbId, collId, [
        Query.orderDesc('$createdAt'),
        Query.limit(100),
      ]);
      setMessages(response.documents);
    } catch (error) {
      toast.error('Failed to fetch messages. Please try again later.');
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  // Handle message submission
  const handleSubmit = async () => {
    if (!text.trim()) return;

    const msgData = {
      username: user.name,
      user_id: user.$id,
      body: text,
    };

    try {
      await databases.createDocument(dbId, collId, ID.unique(), msgData);
      setText('');
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
    }
  };

  // Handle delete message
  const handleDelete = async (id) => {
    try {
      await databases.deleteDocument(dbId, collId, id);
    } catch (error) {
      toast.error('Failed to delete message. Please try again later.');
    }
  };

  return (
    <main className="text-white mt-1">
      {/* Input Section */}
      <section className="flex items-cente gap-x-4 px-4 border border-black bg-white text-black py-3 shadow-md">
        
        <textarea
          className="w-full border-none resize-none outline-none bg-transparent placeholder:text-black  text-base font-semibold"
          placeholder="Type something..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        {text.trim().length > 0 && (
          <FiSend
            className="text-black text-2xl mt-4 cursor-pointer  transition-colors"
            onClick={handleSubmit}
          />
        )}
      </section>

      {/* Messages Section */}
      <section className="px-10 mt-10 space-y-4">
        {loading ? (
          <p className="text-center text-gray-400">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-400">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.$id}
              className={`flex flex-col gap-y-1 ${
                msg.user_id === user.$id ? 'items-start' : 'items-end'
              }`}
            >
              {/* Username */}
              <p className="text-sm font-bold">{msg.username}</p>
              {/* Message Body */}
              <div className="flex gap-1">
                <p
                  className={`${
                    msg.user_id === user.$id
                      ? 'bg-white text-black'
                      : 'bg-black text-white'
                  } h-auto font-semibold max-w-md p-3 rounded-lg shadow-md break-words`}
                >
                  {msg.body}
                </p>
                {msg.user_id === user.$id && (
                  <FaTrash
                    className="text-xs cursor-pointer mt-1"
                    onClick={() => handleDelete(msg.$id)}
                  />
                )}
              </div>
              {/* Message Time */}
              {msg.$createdAt && (
                <time className="text-xs mt-1">
                  {new Date(msg.$createdAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </time>
              )}
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default Home;
