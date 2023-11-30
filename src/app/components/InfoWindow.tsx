import { Contact } from './profile';
import styles from '../page.module.css';

export default function InfoWindow(props: {
    username: string;
    contact: Contact;
    bio: string;
    position: { lat: number; lng: number };
    onClose: Function;
}) {
    return (
        // @ts-ignore
        <div
            position={props.position}
            onClose={props.onClose}
            id={styles.infoWindow}
        >
            <p>{props.username}</p>
            <p>{JSON.stringify(props.contact)}</p>
            <p>{props.bio}</p>
            <button onClick={() => props.onClose()}>Close</button>
        </div>
    );
}
