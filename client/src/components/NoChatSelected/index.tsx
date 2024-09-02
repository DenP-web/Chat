import styles from './NoChatSelected.module.css';


const NoChatSelected  = () => {
  return (
    <div className={styles.noChatSelected}>
      <h2>No Chat Selected</h2>
      <p>Please select a chat from the list on the left to start messaging.</p>
    </div>
  )
}

export default NoChatSelected 
