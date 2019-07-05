import React from 'react'
import AddProject from '../components/AddProject'
import Router from 'next/router'
import PropTypes from 'prop-types'
class ControlPanel extends React.Component {
    componentDidMount() {
        if (!this.props.loggedIn) {
            Router.push(`/`)
        }
    }

    render() {
        console.log('this.props.loggedIn = ', this.props.loggedIn)
        return (
            <div>
                {!this.props.loggedIn ? (
                    <div>
                        <p>re-routing</p>
                    </div>
                ) : (
                    <div>
                        <AddProject />
                    </div>
                )}
            </div>
        )
    }
}
ControlPanel.propTypes = {
    loggedIn: PropTypes.bool,
}

export default ControlPanel
