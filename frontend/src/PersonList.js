
import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Alert } from 'react-alert';
import AppNavBar from './AppNavBar';
import { Link } from 'react-router-dom';

class PersonList extends Component {

    constructor(props) {
        super(props);
        this.state = { people: [], phones: [] };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/v1/people')
            .then(response => response.json())
            .then(data => this.setState({ people: data }));
    }

    async remove(id) {
        await fetch(`/v1/people/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedPeople = [...this.state.people].filter(i => i.id !== id);
            this.setState({ people: updatedPeople });
            alert("Person Details Deleted.");
        });
    }

    render() {
        const { people, isLoading } = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const personList = people.map(person => {
            return <tr key={person.id}>
                <td style={{ whiteSpace: 'nowrap' }}>{person.firstName}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{person.lastName}</td>
                <td style={{ whiteSpace: 'nowrap' }}><td>{JSON.stringify(person.phones[0])}</td>
                                                    <td>{JSON.stringify(person.phones[1])}</td>
                                                    <td>{JSON.stringify(person.phones[2])}</td></td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/v1/people" + person.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(person.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavBar />
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to={"/v1/people" + 'new'}>Add Person</Button>
                    </div>
                    <h3>People</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="30%">First Name</th>
                                <th width="30%">Last Name</th>
                                <th width="30%">Phone Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {personList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
export default PersonList;