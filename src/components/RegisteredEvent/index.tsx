import styles from './RegisteredEvent.module.css'

type EventProps = {
  id: string;
  title: string;
  description: string;
  date: string;
};

export const RegisteredEvent = (registeredEvent: EventProps) => {
  return (
    <div className={styles.registeredEvent}>
      <div className={styles.eventData}>
        <h3>{registeredEvent.title}</h3>
        <p>{registeredEvent.description}</p>
        <p>{registeredEvent.date}</p>
      </div>
      <div className={styles.commands}>
        <button>View</button>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  )
}