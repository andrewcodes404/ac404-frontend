import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import ProjectCard from './ProjectCard'

const Blurb = styled.div`
    /* border: 1px solid grey; */
`
const ProjectsStyled = styled.div`
    display: flex;
    flex-wrap: wrap;

    justify-content: space-between;
`

const QUERY_ALL_PROJECTS = gql`
    query QUERY_ALL_PROJECTS {
        projects {
            id
            name
            strapline
            websiteURL
            websiteImage
            brief
            process
            adobeUrl
            githubUrl
        }
    }
`

class Projects extends React.Component {
    render() {
        return (
            <div>
                <Blurb>
                    <h1>andrewcodes404</h1>
                    <h3>
                        Proin eget tortor risus. Vivamus magna justo, lacinia
                        eget consectetur sed, convallis at tellus. Curabitur non
                        nulla sit amet nisl tempus convallis quis ac lectus.
                        Donec sollicitudin molestie malesuada. Quisque velit
                        nisi, pretium ut lacinia in, elementum id enim.
                    </h3>
                </Blurb>
                <Query query={QUERY_ALL_PROJECTS}>
                    {({ data, error, loading }) => {
                        if (loading) return <p>Loading...</p>
                        if (error) return <p>Error: {error.message}</p>
                        return (
                            <ProjectsStyled>
                                {data.projects.map(project => (
                                    <ProjectCard
                                        project={project}
                                        key={project.id}
                                    />
                                ))}
                            </ProjectsStyled>
                        )
                    }}
                </Query>
            </div>
        )
    }
}

export default Projects
