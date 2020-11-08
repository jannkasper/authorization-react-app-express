import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';
import { message, Button, Divider, Space} from 'antd';


class Dashboard extends Component {
    state = {
        response: '',
        post: '',
        responseToPost: '',
    };

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    handleLogout = async () => {
        await localStorage.removeItem('auth');
        this.props.handleLoggedIn();
        this.props.history.push('/');

    };

    handleAccess = async (accessType) => {
        let ww = localStorage.getItem('auth').toString();
        const response = await fetch(`/api/users/${accessType}`, {
            method: 'GET',
            headers: {
                'authorization' : localStorage.getItem('auth').toString()
            },
        });

        const text = await response.text();
        response.status === 200 ? message.success(text) : message.error(text);
    };

    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/world', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post: this.state.post }),
        });
        const body = await response.text();

        this.setState({ responseToPost: body });
    };

    render() {
        return (
            <div>
                <Space>
                    <Button onClick={() => this.handleAccess('authuseronly')}>User server access</Button>
                    <Button onClick={() => this.handleAccess('adminonly')}>Admin server access</Button>
                </Space>

                <Divider/>

                <p>{this.state.response}</p>
                <form onSubmit={this.handleSubmit}>
                    <p><strong>Post to Server:</strong></p>
                    <input
                    type="text"
                    value={this.state.post}
                    onChange={e => this.setState({ post: e.target.value })}
                    />
                    <button type="submit">Submit</button>
                </form>
                <p>{this.state.responseToPost}</p>

                <Divider/>
                <Button type="primary" onClick={this.handleLogout}>Logout</Button>
            </div>
        )
    }
}

export default withRouter(Dashboard)
