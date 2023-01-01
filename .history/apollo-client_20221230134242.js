import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://boatapp.seesight-tours.com/console/",
    cache: new InMemoryCache(),
});

export default client;