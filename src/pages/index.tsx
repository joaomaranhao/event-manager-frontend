import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { EmptyBox } from '../components/EmptyBox'
import { Events } from '../components/Events'
import Modal from 'react-modal'
import { AddEventModal } from '../components/AddEventModal'

import styles from '../styles/Home.module.css'
import { Persons } from '../components/Persons'

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

Modal.setAppElement('#__next')


export default function Home() {
  const [events, setEvents] = useState([])
  const [persons, setPersons] = useState([])
  const [display, setDisplay] = useState('events')

  useEffect(() => {
   fetchEvents()
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3333/api/event')
      .then(res => {
        setEvents(res.data)
      })
  }, [events])

  useEffect(() => {
    axios.get('http://localhost:3333/api/person')
      .then(res => {
        setPersons(res.data)
      })
  }, [persons])

  function fetchEvents() {
    axios.get('http://localhost:3333/api/event')
      .then(res => {
        setEvents(res.data)
        setDisplay('events')
      })
  }

  function fetchPersons() {
    axios.get('http://localhost:3333/api/person')
      .then(res => {
        setPersons(res.data)
        setDisplay('persons')
      })
  }

  const [eventModalIsOpen, setEventModalIsOpen] = useState(false)

  function openEventModal() {
    setEventModalIsOpen(true)
  }

  function closeEventModal() {
    setEventModalIsOpen(false)
  }
  
  return (
    <>
      <Head>
        <title>Event Manager</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.main}>
          <h1 className={styles.title}>Event Manager</h1>
          <div className={styles.commands}>
            <button className={styles.command} onClick={fetchEvents}>
              <h2>Events</h2>
              <p>View all events</p>
            </button>
            <button className={styles.command} onClick={openEventModal}>
              <h2>Add Event</h2>
              <p>Add a new event</p>
            </button>
            <button className={styles.command}>
              <h2>Add Person</h2>
              <p>Add a new person</p>
            </button>
            <button className={styles.command} onClick={fetchPersons}>
              <h2>Persons</h2>
              <p>View all persons</p>
            </button>
          </div>
          {display === 'events' ? (
            <div className={styles.display}>
              {events.length != 0 ? <Events events={events} /> : <EmptyBox item='an event' />}
            </div>
          ) : (
            <div className={styles.display}>
              {persons.length != 0 ? <Persons persons={persons} /> : <EmptyBox item='a person' />}
            </div>
          )}
        </div>
        <footer className={styles.footer}>
          <p>Made with <span>♥</span> by João Maranhão</p>
        </footer>
        <AddEventModal isOpen={eventModalIsOpen} onRequestClose={closeEventModal} style={customStyles} fetchEvents={fetchEvents} setEvents={setEvents} />
      </div>
    </>
  )
}
