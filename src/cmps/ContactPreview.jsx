import { Link } from "react-router-dom"

export function ContactPreview({ contact }) {
    return (
        <Link to={`/contact/${contact._id}`}>
            <section className="contact-preview">
                <section className="info">
                    <img src={require(`../assets/imgs/avatar.png`)} alt="" />
                    <h2>{contact.name}</h2>
                </section>
            </section>
        </Link>

    )
}
