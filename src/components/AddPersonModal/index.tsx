import axios from 'axios'
import Modal from 'react-modal'
import styles from './AddPersonModal.module.css'

interface ModalProps {
  isOpen: boolean
  onRequestClose: () => void
  style?: object
  setPersons: (persons: any) => void
}

interface IPerson {
  name: string
}

export const AddPersonModal = ({ isOpen, onRequestClose, style, setPersons}: ModalProps) => {

  function addPerson(person: IPerson) {
    axios.post('http://localhost:3333/api/person', {
      name: person.name
    })
  }

  function handleAddEvent(e) {
    e.preventDefault()
    
    const name = e.target.name.value

    const person = {
      name
    }

    addPerson(person)
    axios.get('http://localhost:3333/api/person')
      .then(res => {
        setPersons(res.data)
      })
    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={style}
    >
      <h2 className={styles.title}>Add Person</h2>
      <form className={styles.form} onSubmit={handleAddEvent}>
        <div className={styles.item}>
          <label>Name</label>
          <input required name='name' type="text" />
        </div>
        <button type='submit'>Add</button>
      </form>
    </Modal>
  )
}