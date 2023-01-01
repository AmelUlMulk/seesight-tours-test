import { ApolloClient, InMemoryCache, ApolloProvider,HttpLink, gql } from '@apollo/client';


function createApolloClient(){
    return new ApolloClient({
        link: new HttpLink({uri:"https://boatapp.seesight-tours.com/console/"}),
        cache:new InMemoryCache(),
        defaultOptions:{
            watchQuery:{
                fetchPolicy:"cache-and-network",
            }
        }
    })
}
