import { useEffect, useState } from "react";
import cn from "classnames";

import styles from "./ButtonRandomMessages.module.css";
import {
  useStartAutoMessagesMutation,
  useStopAutoMessagesMutation,
} from "../../app/services/autoMessageApi";

const ChatComponent = () => {
  const [isAutoMessagesEnabled, setIsAutoMessagesEnabled] = useState(false);
  const [startAutoMessages] = useStartAutoMessagesMutation();
  const [stopAutoMessages] = useStopAutoMessagesMutation();

  const toggleAutoMessages = () => {
    if (isAutoMessagesEnabled) {
      setIsAutoMessagesEnabled(false);
    } else {
      setIsAutoMessagesEnabled(true);
    }
  };

  useEffect(() => {
    if (isAutoMessagesEnabled) {
      startAutoMessages();
    } else {
      stopAutoMessages();
    }
  }, [isAutoMessagesEnabled]);

  return (
    <div>
      <button
        className={cn(styles.autoMessageButton, {
          [styles.disabled]: isAutoMessagesEnabled,
        })}
        onClick={toggleAutoMessages}
      >
        {isAutoMessagesEnabled
          ? "Disable Auto Messages"
          : "Enable Auto Messages"}
      </button>
    </div>
  );
};

export default ChatComponent;
