import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Container, Typography } from '@material-ui/core';
import { addApolloState, initializeApollo } from 'lib/apolloClient';
import { gql } from '@apollo/client';
import { Product } from 'src/types/sanity-data';
import Head from 'next/head';

const QUERY = gql`
  query($slug: String) {
    allProduct(where: { slug: { current: { eq: $slug } } }) {
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

const QUERY_ALL_PRODUCT = gql`
  query data {
    allProduct {
      slug {
        current
      }
    }
  }
`;
interface Props {
  className?: string;
  data: Product;
}

const ProductDetail: React.FC<Props> = ({ data }) => {
  return (
    <>
      <Head>
        <title> {data.title} | Simple market</title>
      </Head>
      <Container>
        <Typography variant="h4" component="h1">
          {data.title}
        </Typography>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const { data, error } = await apolloClient.query({
    query: QUERY,
    variables: {
      slug: params.slug,
    },
  });

  return addApolloState(apolloClient, {
    props: {
      data: data.allProduct[0],
    },
    revalidate: 1,
  });
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const { data, error } = await apolloClient.query({
    query: QUERY_ALL_PRODUCT,
  });

  return {
    paths: data.allProduct.map(({ slug }) => {
      return { params: { slug: slug.current } };
    }),
    fallback: 'blocking',
  };
};

export default ProductDetail;
