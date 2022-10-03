import axios from 'axios'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import styles from './ViewEventModal.module.css'

interface ModalProps {
  isOpen: boolean
  onRequestClose: () => void
  style?: object
  eventId: string
  title: string
  description: string
  date: string
}

interface IEvent {
  id: string
  title: string
  description: string
  date: string
}

interface IPerson {
  name: string
  id: string
}

export const ViewEventModal = ({ isOpen, onRequestClose, style, eventId, title, description, date}: ModalProps) => {
  const [personsOnEvent, setPersonsOnEvent] = useState<IPerson[]>([])

  useEffect(() => {
    axios.get(`http://localhost:3333/api/event/${eventId}/person`)
      .then(res => {
        setPersonsOnEvent(res.data)
      })
  }, [eventId])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={style}
    >
      <div className={styles.modalContainer}>
        <div className={styles.eventData}>
          <h2 className={styles.title}>{title}</h2>
          <div>
            <p>{description}</p>
            <p>{date}</p>
          </div>
          <button>Add Person</button>
        </div>
        <div className={styles.persons}>
          <h3>Persons registered on event:</h3>
          <div>
            {personsOnEvent.length > 0 ? personsOnEvent.map(person => (
              <div key={person.id}>
                <p>{person.name}</p>
              </div>
            )) : <p>No persons registered on this event</p>}
          </div>
        </div>
        <div>
          {personsOnEvent.map(person => (
            <div key={person.id}>
              <p>{person.name}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}