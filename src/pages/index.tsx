import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { EmptyBox } from '../components/EmptyBox'
import { Events } from '../components/Events'
import Modal from 'react-modal'
import { AddEventModal } from '../components/AddEventModal'

import styles from '../styles/Home.module.css'

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

  useEffect(() => {
   fetchEvents()
  }, [])

  useEffect(() => {
    fetchEvents()
  }, [events])

  function fetchEvents() {
    axios.get('http://localhost:3333/api/event')
      .then(res => {
        setEvents(res.data)
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
            <button className={styles.command}>
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
            <button className={styles.command}>
              <h2>Persons</h2>
              <p>View all persons</p>
            </button>
          </div>
          <div className={styles.display}>
            {events.length != 0 ? <Events events={events} /> : <EmptyBox />}
          </div>
        </div>
        <footer className={styles.footer}>
          <p>Made with <span>♥</span> by João Maranhão</p>
        </footer>
        <AddEventModal isOpen={eventModalIsOpen} onRequestClose={closeEventModal} style={customStyles} fetchEvents={fetchEvents} />
      </div>
    </>
  )
}
