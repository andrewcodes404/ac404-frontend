import React from 'react'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import apolloClient from '../lib/createApolloClient'
import { ThemeProvider } from 'styled-components'

//Style
import theme from '../style/theme'
import GlobalStyle from '../style/globalStyle'

// Comps
import PageWrapper from '../components/PageWrapper'

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {}
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        // this exposes the query to the user
        pageProps.query = ctx.query
        return { pageProps }
    }
    render() {
        const { Component, apollo, pageProps } = this.props
        return (
            <Container>
                <ApolloProvider client={apollo}>
                    <ThemeProvider theme={theme}>
                        <PageWrapper>
                            <GlobalStyle />
                            <Component {...pageProps} />
                        </PageWrapper>
                    </ThemeProvider>
                </ApolloProvider>
            </Container>
        )
    }
}
//wrapp the app with the apollo client
export default apolloClient(MyApp)
