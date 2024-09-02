import { useEffect } from 'react';
import { API_URL } from '../constants';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { selectUser } from '../app/selects/userSelects';
import { toast } from 'react-toastify';
import { User } from '../app/types';
import { useLazyGetMessagesQuery } from '../app/services/messageApi';
import { selectChat } from '../app/selects/chatSelects';
import { useLazyGetChatsQuery } from '../app/services/chatApi';

const useSocket = () => {
  const user = useSelector(selectUser);
  const chat = useSelector(selectChat)
  const [triggerGetMessages] = useLazyGetMessagesQuery()
  const [triggerGetAllChats] = useLazyGetChatsQuery()

  useEffect(() => {
    if (user) {
      const socket = io(API_URL, {
        transports: ['websocket'],
      });

      socket.on('newMessage', async ({ message, sender }: { message: string, sender: User }) => {
        if (chat) await triggerGetMessages(chat._id)
        else await triggerGetAllChats()
        toast.success(`You have message from ${sender.fullName}. Message: "${message}"`)
      });

      socket.on('autoMessage', async ({ message, sender }: { message: string, sender: User }) => {
        if (chat) await triggerGetMessages(chat._id)
        else await triggerGetAllChats()
        toast.success(`You have message from ${sender.fullName}. Message: "${message}"`)
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user, chat]);

  return null;
};

export default useSocket;
