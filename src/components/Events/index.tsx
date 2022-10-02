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
  setEvents: (events: any) => void;
};

export const Events = ({events, setEvents}: EventsProps) => {
  return (
    <div className={styles.container}>
      <h2>Events</h2>
      {events.map((registeredEvent) => (
        <RegisteredEvent setEvents={setEvents} key={registeredEvent.id} {...registeredEvent} />
      ))}
    </div>
  )
}