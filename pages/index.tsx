import { gql } from '@apollo/client';
import React from 'react';
import { Product } from 'src/types/sanity-data';
import { addApolloState, initializeApollo } from 'lib/apolloClient';
import { QUERY_ALL_PRODUCT } from 'src/graphql/query';

interface ProductsData {
  allProduct: Product[];
}

const Home: React.FC<{ data: ProductsData }> = ({ data }) => {
  return (
    <>
      {JSON.stringify(data)}
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
