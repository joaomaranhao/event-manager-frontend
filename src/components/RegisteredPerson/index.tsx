import axios from 'axios';
import styles from './RegisteredPerson.module.css'

type Personprops = {
  id: string;
  name: string
};

export const RegisteredPerson = (registeredEvent: Personprops) => {
  function deletePerson() {
    axios.delete(`http://localhost:3333/api/person/${registeredEvent.id}`);
  }
  return (
    <div className={styles.registeredEvent}>
      <div className={styles.eventData}>
        <p>{registeredEvent.name}</p>
      </div>
      <div className={styles.commands}>
        <button>View</button>
        <button>Edit</button>
        <button onClick={deletePerson}>Delete</button>
      </div>
    </div>
  )
}