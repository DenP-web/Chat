import Sidebar from "../../components/Sidebar";
import ChatContent from "../../components/ChatContent";
import { ModalProvider } from "../../context/ModalContext";
import Modal from "../../components/Modal";

const ChatPage = () => {
  return (
    <>
      <ModalProvider>
        <Sidebar />
        <ChatContent />
        <Modal />
      </ModalProvider>
    </>
  );
};

export default ChatPage;
