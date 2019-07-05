import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Router from 'next/router'
import Error from '../lib/ErrorMessage'

const Form = styled.form`
    padding: 1rem;

    width: 600px;
    fieldset {
        display: flex;
        flex-direction: column;
        border-top-style: ridge;
        border-width: 6px;
    }

    label,
    textarea {
        padding: 10px;
    }

    label {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    input {
        margin-left: 10px;
        padding: 5px;
        width: 300px;
    }

    .thumb {
        width: 100px;
    }
`
const MUTATION_CREATE_PROJECT = gql`
    mutation MUTATION_CREATE_PROJECT(
        $name: String!
        $strapline: String!
        $websiteURL: String!
        $websiteImage: String!
        $brief: String!
        $process: String!
        $adobeUrl: String!
        $githubUrl: String!
        $cleanUrl: String!
    ) {
        createProject(
            name: $name
            strapline: $strapline
            websiteURL: $websiteURL
            websiteImage: $websiteImage
            brief: $brief
            process: $process
            adobeUrl: $adobeUrl
            githubUrl: $githubUrl
            cleanUrl: $cleanUrl
        ) {
            id
        }
    }
`

const initialState = {
    name: 'A great website',
    strapline: 'Oustanding in quality and bredth',
    websiteURL: 'https://website.com',

    brief:
        'Curabitur aliquet quam id dui posuere blandit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. ',
    process:
        'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. ',
    adobeUrl: 'https://website.com',
    githubUrl: 'https://website.com',
    cleanUrl: 'hmmm',
    websiteImage: 'x',
}

const blankState = {
    name: '',
    strapline: '',
    websiteURL: '',
    brief: '',
    process: '',
    adobeUrl: '',
    githubUrl: '',
    cleanUrl: '',
    websiteImage: '',
}

class addProject extends React.Component {
    constructor(props) {
        super(props)
        this.state = blankState
    }
    resetState() {
        this.setState(initialState)
    }

    handleChange = e => {
        const { name, type, value } = e.target
        const val = type === 'number' ? parseFloat(value) : value
        this.setState({ [name]: val })
    }

    handleChangeAndTrim = e => {
        ///remove spaces from title and use for urlSnippet
        const name = e.target.value
        let cleanUrl = name
            .trim()
            .split(' ')
            .join('-')
            .replace(/[^a-zA-Z0-9-_]/g, '')

        this.setState({ name, cleanUrl })
    }

    uploadFile = async e => {
        // console.log('uploading file...')
        // sort that image data out
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'ac404_react')

        //hit up the cloudinary API
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dcqi9fn2y/image/upload',
            {
                //this is a config arg so we want POST our data we just created
                method: 'POST',
                body: data,
            }
        )
        //parse the returning file to json
        const file = await res.json()
        // console.log(file)

        //put that response data into our state, ready to send with the mutation
        this.setState({
            websiteImage: file.secure_url,
        })
    }

    render() {
        console.table(this.props)

        return (
            <div>
                <Mutation
                    mutation={MUTATION_CREATE_PROJECT}
                    variables={this.state}
                >
                    {(createProject, { loading, error }) => (
                        <Form
                            onSubmit={async e => {
                                e.preventDefault()
                                const res = await createProject()
                                this.resetState()
                                Router.push(`/`)
                            }}
                        >
                            <Error error={error} />
                            <fieldset
                                disabled={loading}
                                araia-busy={loading.toString()}
                            >
                                <label htmlFor="name">
                                    Name
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="name"
                                        required
                                        value={this.state.name}
                                        onChange={this.handleChangeAndTrim}
                                    />
                                </label>

                                <label htmlFor="strapline">
                                    Strapline
                                    <textarea
                                        rows="2"
                                        cols="40"
                                        id="strapline"
                                        name="strapline"
                                        placeholder="strapline"
                                        required
                                        value={this.state.strapline}
                                        onChange={this.handleChange}
                                    />
                                </label>

                                <label htmlFor="websiteURL">
                                    Website URL
                                    <input
                                        type="url"
                                        id="websiteURL"
                                        name="websiteURL"
                                        placeholder="websiteURL"
                                        required
                                        value={this.state.websiteURL}
                                        onChange={this.handleChange}
                                    />
                                </label>

                                <label htmlFor="file">
                                    Website Image
                                    <input
                                        type="file"
                                        id="file"
                                        name="websiteImage"
                                        placeholder="Upload an image"
                                        required
                                        onChange={this.uploadFile}
                                    />
                                    {this.state.websiteImage.length > 1 && (
                                        <img
                                            className="thumb"
                                            width="200"
                                            src={this.state.websiteImage}
                                            alt="Upload Preview"
                                        />
                                    )}
                                </label>

                                <label htmlFor="brief">
                                    brief
                                    <textarea
                                        rows="4"
                                        cols="40"
                                        id="brief"
                                        name="brief"
                                        placeholder="brief"
                                        required
                                        value={this.state.brief}
                                        onChange={this.handleChange}
                                    />
                                </label>

                                <label htmlFor="process">
                                    process
                                    <textarea
                                        rows="4"
                                        cols="40"
                                        id="process"
                                        name="process"
                                        placeholder="process"
                                        required
                                        value={this.state.process}
                                        onChange={this.handleChange}
                                    />
                                </label>

                                <label htmlFor="adobeUrl">
                                    adobeUrl
                                    <input
                                        type="url"
                                        id="adobeUrl"
                                        name="adobeUrl"
                                        placeholder="adobeUrl"
                                        required
                                        value={this.state.adobeUrl}
                                        onChange={this.handleChange}
                                    />
                                </label>

                                <label htmlFor="githubUrl">
                                    githubUrl
                                    <input
                                        type="url"
                                        id="githubUrl"
                                        name="githubUrl"
                                        placeholder="githubUrl"
                                        required
                                        value={this.state.githubUrl}
                                        onChange={this.handleChange}
                                    />
                                </label>

                                <br />
                                <br />
                                <button type="submit">Submit</button>
                            </fieldset>
                        </Form>
                    )}
                </Mutation>
            </div>
        )
    }
}

export default addProject
