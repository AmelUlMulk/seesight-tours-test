import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';


export async function getStaticProps(){
    const client = new ApolloClient({
      uri:'https://boatapp.seesight-tours.com/console/',
      headers:{
        [String(process.env.REACT_APP_CLIENT_HEADER)]:
      String(process.env.REACT_APP_CLIENT_VALUE) ?? "",
      },
      cache:new InMemoryCache()
    })
  
     const {data}=await client.query({
      query: gql`
      query MyQuery {
        guide(id: "20", publicationState: LIVE) {
          id
          biography
          category
          first_name
          last_name
          position
          published_at
          updated_at
        }
      }
      
  `
    })
  
    console.log("data",data)
    return{
      props:{
        guides:data.guide
      }
    }
  }