import { gql, useQuery } from "@apollo/client";
import { addApolloState, initializeApollo } from "lib/apolloClient";
import ProductItem from "@components/ProductItem";
import Container from "@material-ui/core/Container";
import React from "react";
import Grid from "@material-ui/core/Grid";
import { Product } from "src/types/sanity-data";

const QUERY = gql`
  query data {
    allProduct {
      _id
      title
      _createdAt
      _updatedAt
      price
      salePrice
      slug {
        current
      }
      images {
        _key
        _type
        asset {
          _id
          metadata {
            lqip
          }
        }
        hotspot {
          _type
          x
          y
          height
          width
        }
        crop {
          _type
          top
          bottom
          left
          right
        }
      }
    }
  }
`;

interface ProductsData {
  allProduct: Product[];
}

function Home() {
  const { data } = useQuery<ProductsData>(QUERY);

  return (
    <Container>
      <Grid container spacing={2}>
        {data.allProduct.map((product) => (
          <Grid key={product._id} item md={4} xs={12}>
            <ProductItem {...product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: QUERY,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
}

export default Home;
