import { RegisteredEvent } from "../RegisteredEvent";
import styles from './Events.module.css'

type RegisteredEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
};


type EventsProps = {
  events: RegisteredEvent[];
};

export const Events = (events: EventsProps) => {
  return (
    <div className={styles.container}>
      <h2>Events</h2>
      {events.events.map((registeredEvent) => (
        <RegisteredEvent key={registeredEvent.id} {...registeredEvent} />
      ))}
    </div>
  )
}