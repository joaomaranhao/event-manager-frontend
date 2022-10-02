import axios from 'axios'
import Modal from 'react-modal'
import styles from './AddEventModal.module.css'

interface ModalProps {
  isOpen: boolean
  onRequestClose: () => void
  style?: object
  setEvents: (events: any) => void
}

interface IEvent {
  title: string
  description: string
  date: string
}

export const AddEventModal = ({ isOpen, onRequestClose, style, setEvents}: ModalProps) => {

  function addEvent(event: IEvent) {
    axios.post('http://localhost:3333/api/event', {
      title: event.title,
      description: event.description,
      date: event.date
    })
  }

  function handleAddEvent(e) {
    e.preventDefault()
    
    const title = e.target.title.value
    const description = e.target.description.value
    const date = e.target.date.value

    const event = {
      title,
      description,
      date: new Date(date).toISOString()
    }

    addEvent(event)
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
          <input required name='title' type="text" />
        </div>
        <div className={styles.item}>
          <label>Description</label>
          <textarea required name='description'  />
        </div>
        <div className={styles.item}>
          <label>Date</label>
          <input required name='date' type="date" />
        </div>
        <button type='submit'>Add</button>
      </form>
    </Modal>
  )
}