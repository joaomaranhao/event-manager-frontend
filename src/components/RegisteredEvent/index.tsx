import axios from 'axios';
import { useState } from 'react';
import { EditEventModal } from '../EditEventModal';
import { ViewEventModal } from '../ViewEventModal';
import styles from './RegisteredEvent.module.css'

type EventProps = {
  id: string;
  title: string;
  description: string;
  date: string;
  setEvents: (events: any) => void;
  persons: any;
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

export const RegisteredEvent = ({id, title, description, date, setEvents, persons}: EventProps) => {
  const [editEventModalIsOpen, setEditEventModalIsOpen] = useState(false)
  const [viewEventModalIsOpen, setViewEventModalIsOpen] = useState(false)

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

  function openViewEventModal() {
    setViewEventModalIsOpen(true)
  }

  function closeViewEventModal() {
    setViewEventModalIsOpen(false)
  }

  return (
    <div className={styles.registeredEvent}>
      <div className={styles.eventData}>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{formatedDate}</p>
      </div>
      <div className={styles.commands}>
        <button onClick={openViewEventModal}>View</button>
        <button onClick={openEditEventModal}>Edit</button>
        <button onClick={deleteEvent}>Delete</button>
      </div>
      <EditEventModal isOpen={editEventModalIsOpen} onRequestClose={closeEditEventModal} style={customStyles} eventId={id} setEvents={setEvents} />
      <ViewEventModal isOpen={viewEventModalIsOpen} onRequestClose={closeViewEventModal} style={customStyles} eventId={id} title={title} description={description} date={formatedDate} persons={persons} />
    </div>
  )
}