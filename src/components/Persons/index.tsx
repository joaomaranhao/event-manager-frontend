import { RegisteredPerson } from '../RegisteredPerson';
import styles from './Persons.module.css'

type RegisteredPerson = {
  id: string;
  name: string
};


type PersonsProps = {
  persons: RegisteredPerson[];
};

export const Persons = (persons: PersonsProps) => {
  return (
    <div className={styles.container}>
      <h2>Persons</h2>
      {persons.persons.map((registeredPerson) => (
        <RegisteredPerson key={registeredPerson.id} {...registeredPerson} />
      ))}
    </div>
  )
}