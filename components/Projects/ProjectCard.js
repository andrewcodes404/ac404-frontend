import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// import Router from 'next/router'

const Card = styled.div`
    width: 49%;
    height: 350px;
    margin-bottom: 30px;
    position: relative;
    cursor: pointer;

    .overlay {
        p {
            font-weight: bold;
        }

        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 1;
        height: 20px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* background: yellow; */

        transition: height 0.5s;
    }
    &:hover .overlay {
        /* background: pink; */
        transition: height 0.5s;
        height: 100%;
        background-color: rgba(255, 165, 0, 0.75);
    }

    &:hover .image-wrapper {
        filter: grayscale(100%) contrast(200%);
    }

    .image-wrapper {
        cursor: pointer;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        transition: 0.4s;
        img {
            object-fit: cover;
            height: 100%;
        }
    }
`

const handleClick = id => {
    alert(id)
    console.log('id = ', id)
    // Router.push(`/project/${id}`)
}

const ProjectCard = ({ project: { id, name, strapline, websiteImage } }) => {
    return (
        <Card>
            <div
                className="overlay"
                onClick={() => {
                    handleClick(id)
                }}
            >
                <p>{name}</p>
                <p>{strapline}</p>
            </div>
            <div className="image-wrapper">
                <img src={websiteImage} alt="" />
            </div>
        </Card>
    )
}

ProjectCard.propTypes = {
    project: PropTypes.object,
}
export default ProjectCard
