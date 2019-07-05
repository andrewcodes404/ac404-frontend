import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import Error from '../lib/ErrorMessage'
import { CURRENT_USER_QUERY } from '../PageWrapper'
import styled from 'styled-components'

const Form = styled.form`
    border: 1px solid grey;
`

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            email
            name
        }
    }
`

class UserLogin extends Component {
    state = {
        name: '',
        password: '',
        email: '',
    }
    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        return (
            <Mutation
                mutation={SIGNIN_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
                {(login, { error, loading }) => (
                    <Form
                        method="post"
                        onSubmit={async e => {
                            e.preventDefault()
                            await login()
                            this.setState({ name: '', email: '', password: '' })
                            Router.push(`/control-panel`)
                        }}
                    >
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Sign into your account</h2>
                            <Error error={error} />
                            <label htmlFor="email">
                                Email
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    value={this.state.email}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <label htmlFor="password">
                                Password
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={this.state.password}
                                    onChange={this.saveToState}
                                />
                            </label>

                            <button type="submit">Sign In!</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        )
    }
}

export default UserLogin
