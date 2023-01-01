import { ApolloClient, InMemoryCache } from "@apollo/client";


const httpLink = new HttpLink({
    uri: String(process.env.REACT_APP_URI),
    headers: {
      [String(process.env.REACT_APP_CLIENT_HEADER)]:
        String(process.env.REACT_APP_CLIENT_VALUE) ?? "",
    },
  });
const client = new ApolloClient({
    uri: "https://boatapp.seesight-tours.com/console/",
    cache: new InMemoryCache(),
});

export default client;