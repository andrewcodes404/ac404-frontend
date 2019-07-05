import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { CURRENT_USER_QUERY } from '../PageWrapper'
import Router from 'next/router'

const SIGN_OUT_MUTATION = gql`
    mutation SIGN_OUT_MUTATION {
        logout {
            message
        }
    }
`

const Signout = () => (
    <Mutation
        mutation={SIGN_OUT_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
        {logout => (
            <p
                onClick={async () => {
                    const res = await logout()

                    Router.push('/')
                }}
            >
                Sign Out
            </p>
        )}
    </Mutation>
)
export default Signout
