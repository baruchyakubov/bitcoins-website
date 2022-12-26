import { Component } from 'react'
import { Link } from "react-router-dom"

export class ContactFilter extends Component {
    state = {
        filterBy: null
    }


    componentDidMount() {
        const { filterBy } = this.props
        this.setState({ filterBy: { ...filterBy } })
    }

    handleChange = ({ target }) => {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break
            default:
                break;
        }


        this.setState(
            prevState => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
            () => this.props.onChangeFilter({ ...this.state.filterBy })
        )

    }

    render() {
        const { filterBy } = this.state
        if (!filterBy) return <div>Loading...</div>
        const { txt } = filterBy
        return (
            <section className='filter-section'>
                <form className='contact-filter'>
                    <input onChange={this.handleChange} value={txt} type="text" name="txt" id="txt" placeholder='Search' />
                </form>
                <Link to="/contact/edit"><button>Add Contact</button></Link>
            </section>

        )
    }
}