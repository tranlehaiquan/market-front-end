import { gql, useQuery } from "@apollo/client";
import { addApolloState, initializeApollo } from "lib/apolloClient";
import ProductItem from "@components/ProductItem";
import React from "react";
import { Product } from "src/types/sanity-data";
import Banner from "@components/Banner";
import { Container, Grid, makeStyles } from "@material-ui/core";

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

const useStyles = makeStyles(({ spacing }) => ({
  main: {
    paddingTop: spacing(5),
    paddingBottom: spacing(5),
  },
}));

function Home() {
  const { data } = useQuery<ProductsData>(QUERY);
  const classes = useStyles();

  return (
    <>
      <Banner />
      <div className={classes.main}>
        <Container>
          <Grid container spacing={2}>
            {data.allProduct.map((product) => (
              <Grid key={product._id} item md={4} xs={12}>
                <ProductItem {...product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </>
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
