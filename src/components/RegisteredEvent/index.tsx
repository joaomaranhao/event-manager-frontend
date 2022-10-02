import axios from 'axios';
import styles from './RegisteredEvent.module.css'

type EventProps = {
  id: string;
  title: string;
  description: string;
  date: string;
};

export const RegisteredEvent = (registeredEvent: EventProps) => {
  const formatedDate = new Date(registeredEvent.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  function deleteEvent() {
    axios.delete(`http://localhost:3333/api/event/${registeredEvent.id}`);
  }

  return (
    <div className={styles.registeredEvent}>
      <div className={styles.eventData}>
        <h3>{registeredEvent.title}</h3>
        <p>{registeredEvent.description}</p>
        <p>{formatedDate}</p>
      </div>
      <div className={styles.commands}>
        <button>View</button>
        <button>Edit</button>
        <button onClick={deleteEvent}>Delete</button>
      </div>
    </div>
  )
}