import axios from 'axios'
import Modal from 'react-modal'
import styles from './AddPersonToEventModal.module.css'
import {MouseEvent, useEffect, useState} from 'react'

interface ModalProps {
  isOpen: boolean
  onRequestClose: () => void
  style?: object
  persons: IPerson[]
  eventId: string
  personsOnEvent: IPerson[]
  setPersonsOnEvent: (persons: IPerson[]) => void
}

interface IPerson {
  name: string
  id: string
}

export const AddPersonToEventModal = ({ isOpen, onRequestClose, style, persons, eventId, personsOnEvent, setPersonsOnEvent}: ModalProps) => {
  useEffect(() => {
    axios.get(`http://localhost:3333/api/event/${eventId}/person`)
      .then(res => {
        setPersonsOnEvent(res.data)
      })
  }, [eventId, setPersonsOnEvent])

  function addPersonToEvent (personId: string) {
    axios.post(`http://localhost:3333/api/event/person/`, {
      personId: personId,
      eventId: eventId
    })

    axios.get(`http://localhost:3333/api/event/${eventId}/person`)
      .then(res => {
        setPersonsOnEvent(res.data)
      })

    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={style}
    >
      {persons.length > 0 ? persons.map(person => (
        <div key={person.id} className={styles.registeredEvent}>
        <div className={styles.eventData}>
          <p>{person.name}</p>
        </div>
        <div className={styles.commands}>
          <button onClick={() => addPersonToEvent(person.id)}>Add</button>
        </div>
      </div>
      )) : <p>There is no person registered in the app</p>}
    </Modal>
  )

}