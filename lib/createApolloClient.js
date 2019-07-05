// HOC  that will expose apollo client via a prop that help server side rendering
import withApollo from 'next-with-apollo'

// a small package with all the best bits we need from apollo
import ApolloClient from 'apollo-boost'

// where is the Yoga API - don't put anything in here that shouldn't be public!
const devPrismaEndpoint = `http://localhost:4000`
const prodPrismaEndpoint = `https://andrewcodes404-dc940f87fd.herokuapp.com/andrewcodes404-db/prod`

function createClient({ headers }) {
    return new ApolloClient({
        //setting the url we can change for prod
        uri:
            process.env.NODE_ENV === 'development'
                ? devPrismaEndpoint
                : prodPrismaEndpoint,
        request: operation => {
            operation.setContext({
                fetchOptions: {
                    //can transport cookies
                    credentials: 'include',
                },
                headers,
            })
        },
    })
}

export default withApollo(createClient)
