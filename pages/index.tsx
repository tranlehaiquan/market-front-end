import { gql } from '@apollo/client';
import ProductItem from '@components/ProductItem';
import React from 'react';
import { Product } from 'src/types/sanity-data';
import Banner from '@components/Banner';
import { Container, Grid, makeStyles } from '@material-ui/core';
import ItemByCategories from 'modules/ItemByCategories';
import { addApolloState, initializeApollo } from 'lib/apolloClient';
import { QUERY_ALL_PRODUCT } from 'src/graphql/query';

interface ProductsData {
  allProduct: Product[];
}

const useStyles = makeStyles(({ spacing }) => ({
  main: {
    paddingTop: spacing(5),
    paddingBottom: spacing(5),
  },
}));

const Home: React.FC<{ data: ProductsData }> = ({ data }) => {
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

          <ItemByCategories products={[]} />
        </Container>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: QUERY_ALL_PRODUCT,
  });

  return addApolloState(apolloClient, {
    props: {
      data,
    },
    revalidate: 20,
  });
}

export default Home;
