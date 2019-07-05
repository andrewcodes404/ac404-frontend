import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
        // renders the page and check for any styles and "collects" them
        const sheet = new ServerStyleSheet()
        const page = renderPage(App => props =>
            sheet.collectStyles(<App {...props} />)
        )
        // compile the styles and dump them on the page
        const styleTags = sheet.getStyleElement()
        return { ...page, styleTags }
    }

    render() {
        return (
            <html>
                <Head>{this.props.styleTags}</Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}
