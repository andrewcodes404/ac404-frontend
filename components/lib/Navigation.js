import React, { Fragment } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import SignOut from './signOut'

const Nav = styled.nav`
    background-color: salmon;
    margin-bottom: 30px;
`

const Menu = styled.div`
    color: white;
    font-size: 3rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    padding: 0px 10px;
    width: 90%;
    margin: 0 auto;

    p {
        cursor: pointer;
        margin-left: 30px;
        padding: 5px 10px;
        border: 1px solid black;
        background: lightgrey;
        color: black;
        &:hover {
            background: yellow;
        }
    }
`

const Navigation = props => (
    <Fragment>
        {props.loggedIn && (
            <Nav>
                <Menu>
                    <h3>Hi {props.loggedIn.name} 👋</h3>
                    <Link href={`/`}>
                        <p>Home</p>
                    </Link>
                    <Link href={`/control-panel`}>
                        <p>C-Panel</p>
                    </Link>
                    {/* <Link href={`/registerUser`}>
                        <p>
                           Register user
                        </p>
                    </Link> */}

                    <SignOut />
                </Menu>
            </Nav>
        )}
    </Fragment>
)

export default Navigation
