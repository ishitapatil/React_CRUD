import React, { Component } from 'react';
import { Link, withRouter, Prompt} from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Alert } from 'react-alert';
import AppNavBar from './AppNavBar';

class PersonEdit extends Component {

    emptyItem = {
        firstName: '',
        lastName: '',
        phones: []
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const person = await (await fetch(`/v1/people/${this.props.match.params.id}`)).json();
            this.setState({item: person});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
    
        console.log(item);
        // await fetch('/v1/people' + (item.id ? '/' + item.id+"/" : ''), {
        //     method: (item.id) ? 'PUT' : 'POST',
        //     headers: {
        //         'allow':'PUT',
        //         'Access-Control-Allow-Methods': 'PUT',
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(item),
        // });
        // this.props.history.push('/v1/people');

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "id": item.id,
        "firstName": item.firstName,
        "lastName": item.lastName,
        "phones": item.phones
        });
        
        var requestOptions = {
        method: (item.id) ? 'PUT' : 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8081/v1/people", requestOptions)
        .then(response => response.text())
        .then(result => {const res = JSON.parse(result)
            const status = res.status;
            const errors = res.errors;
            if (status === "Success") {
                console.log("Updated Successfully!");
                alert("Updated Successfully :) !");
            }
            else {
                 alert("Update Failed!");
                }
})
        .catch(error => console.log('error', error));
            }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Person' : 'Add Person'}</h2>;
    
        return <div>
            <AppNavBar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">First Name</Label>
                        <Input type="text" name="firstName" id="firstName" value={item.firstName || ''}
                               onChange={this.handleChange} autoComplete="firstName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">Last Name</Label>
                        <Input type="text" name="lastName" id="lastName" value={item.lastName || ''}
                               onChange={this.handleChange} autoComplete="lastName"/>
                    </FormGroup>
                    <FormGroup>
                    <table id="campaignDetaislTable" className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Phone Number</th>
                                        <th>Phone Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.item.phones.map((val, ind) => (
                                            <tr key={val.number} className='campaignDetails'>
                                                <td><input type="text" name="phoneNumber" id="phoneNumber" value={val.number} 
                                                onChange={this.handleChange} autoComplete="phoneNumber"/></td>
                                                <td>{val.type}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/v1/people">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}
export default withRouter(PersonEdit);
