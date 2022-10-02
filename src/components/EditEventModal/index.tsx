import axios from 'axios'
import Modal from 'react-modal'
import styles from './EditEventModal.module.css'

interface ModalProps {
  isOpen: boolean
  onRequestClose: () => void
  style?: object
  setEvents: (events: any) => void
  eventId: string
}

export const EditEventModal = ({ isOpen, onRequestClose, style, setEvents, eventId}: ModalProps) => {

  function handleAddEvent(e) {
    e.preventDefault()
    
    if (e.target.title.value) {
      axios.put(`http://localhost:3333/api/event/${eventId}`, {
        title: e.target.title.value
      })
    }

    if (e.target.description.value) {
      axios.put(`http://localhost:3333/api/event/${eventId}`, {
        description: e.target.description.value
      })
    }

    if (e.target.date.value) {
      axios.put(`http://localhost:3333/api/event/${eventId}`, {
        date: new Date(e.target.date.value).toISOString()
      })
    }

    axios.get('http://localhost:3333/api/event')
      .then(res => {
        setEvents(res.data)
      })
    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={style}
    >
      <h2 className={styles.title}>Add Event</h2>
      <form className={styles.form} onSubmit={handleAddEvent}>
        <div className={styles.item}>
          <label>Title</label>
          <input  name='title' type="text" />
        </div>
        <div className={styles.item}>
          <label>Description</label>
          <textarea  name='description'  />
        </div>
        <div className={styles.item}>
          <label>Date</label>
          <input  name='date' type="date" />
        </div>
        <button type='submit'>Add</button>
      </form>
    </Modal>
  )
}