import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Error from '../lib/ErrorMessage'
import styled from 'styled-components'

const Form = styled.form`
    border: 1px solid grey;
`

const MUTATION_SIGNUP = gql`
    mutation MUTATION_SIGNUP(
        $email: String!
        $name: String!
        $password: String!
    ) {
        signup(email: $email, name: $name, password: $password) {
            id
            email
            name
        }
    }
`
class MutateCreateUser extends React.Component {
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
            <Mutation mutation={MUTATION_SIGNUP} variables={this.state}>
                {(signup, { error, loading }) => (
                    <Form
                        method="post"
                        onSubmit={async e => {
                            e.preventDefault()
                            await signup()
                            this.setState({ name: '', email: '', password: '' })
                        }}
                    >
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Sign Up for An Account</h2>
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
                            <label htmlFor="name">
                                Name
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="name"
                                    value={this.state.name}
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

                            <button type="submit">Sign Up!</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        )
    }
}

export default MutateCreateUser
