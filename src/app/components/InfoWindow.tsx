import { Contact } from './profile';

export default function InfoWindow(props: {
    username: string;
    contact: Contact;
    bio: string;
    position: { lat: number; lng: number };
    onClose: Function;
}) {
    return (
        // @ts-ignore
        <div position={props.position} onClose={props.onClose}>
            <p>{props.username}</p>
            <p>{JSON.stringify(props.contact)}</p>
            <p>{props.bio}</p>
            <button onClick={() => props.onClose()}>Close</button>
        </div>
    );
}
