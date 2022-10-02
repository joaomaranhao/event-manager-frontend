import axios from 'axios';
import { useState } from 'react';
import { EditEventModal } from '../EditEventModal';
import styles from './RegisteredEvent.module.css'

type EventProps = {
  id: string;
  title: string;
  description: string;
  date: string;
  setEvents: (events: any) => void;
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

export const RegisteredEvent = ({id, title, description, date, setEvents}: EventProps) => {
  const [editEventModalIsOpen, setEditEventModalIsOpen] = useState(false)
  const formatedDate = new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  function deleteEvent() {
    axios.delete(`http://localhost:3333/api/event/${id}`);
  }

  function openEditEventModal() {
    setEditEventModalIsOpen(true)
  }

  function closeEditEventModal() {
    setEditEventModalIsOpen(false)
  }

  return (
    <div className={styles.registeredEvent}>
      <div className={styles.eventData}>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{formatedDate}</p>
      </div>
      <div className={styles.commands}>
        <button>View</button>
        <button onClick={openEditEventModal}>Edit</button>
        <button onClick={deleteEvent}>Delete</button>
      </div>
      <EditEventModal isOpen={editEventModalIsOpen} onRequestClose={closeEditEventModal} style={customStyles} eventId={id} setEvents={setEvents} />
    </div>
  )
}