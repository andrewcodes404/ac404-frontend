import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

// comps
import Meta from './lib/Meta'
import Navigation from './lib/Navigation'

const CURRENT_USER_QUERY = gql`
    query {
        user {
            id
            email
            name
            permissions
        }
    }
`

class PageWrapper extends React.Component {
    state = {
        loggedIn: false,
    }

    render() {
        // const user = true

        return (
            <div>
                {/* <User>
                    {({ data: { user } }) => {
                        console.log('user = ', user)

                        if (user) {
                            // this.setState({ loggedIn: me })
                            console.log('yes logged in')
                        }
                        return (
                           
                        )
                    }}
                </User> */}

                <Query query={CURRENT_USER_QUERY}>
                    {({ data: { user }, error, loading }) => {
                        if (loading) return <p>Loading...</p>
                        if (error) return <p>Error: {error.message}</p>

                        //don't use data.user as a bool ☠️
                        var loggedIn = false
                        user ? (loggedIn = true) : (loggedIn = false)
                        console.log('loggedIn = ', loggedIn)

                        return (
                            <div>
                                <Meta />
                                <Navigation loggedIn={loggedIn} />

                                {/* <div className="page-wrapper">
                                    {this.props.children}
                                </div> */}
                                <div className="page-wrapper">
                                    {React.Children.map(
                                        this.props.children,
                                        child =>
                                            React.cloneElement(child, {
                                                loggedIn,
                                            })
                                    )}
                                </div>
                            </div>
                        )
                    }}
                </Query>
            </div>
        )
    }
}

PageWrapper.propTypes = {
    children: PropTypes.node.isRequired,
}

export default PageWrapper
export { CURRENT_USER_QUERY }
