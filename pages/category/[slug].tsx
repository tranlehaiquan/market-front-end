import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { addApolloState, initializeApollo } from 'lib/apolloClient';
import { gql } from '@apollo/client';
import { Category, Product } from 'src/types/sanity-data';
import Head from 'next/head';
import ProductItem from '@components/ProductItem';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { QUERY_ALL_PRODUCT } from 'src/graphql/query';
import Error from 'next/error';

const QUERY_CATEGORY_SLUG = gql`
  query ($slug: String) {
    allCategory(where: { slug: { current: { eq: $slug } } }) {
      title
      description
      slug {
        current
      }
    }
  }
`;

const QUERY_ALL_CATEGORY = gql`
  query data {
    allCategory {
      slug {
        _type
        current
      }
    }
  }
`;

interface Props {
  className?: string;
  products: Product[];
  category: Category;
}

const useStyles = makeStyles(({ spacing }) => ({
  main: {
    paddingTop: spacing(5),
    paddingBottom: spacing(5),
  },
  categoryInfo: {
    marginBottom: spacing(5),
  },
}));

const ProductDetail: React.FC<Props> = ({ products, category }) => {
  const classes = useStyles();

  if (isEmpty(category)) {
    return (
      <Error statusCode={404} />
    );
  }

  return (
    <>
      <Head>
        <title> Category {category.title} | Simple market</title>
      </Head>
      <div className={classes.main}>
        <Container>
          <div className={classes.categoryInfo}>
            <Typography variant="h4" component="h1">
              Category {category.title}
            </Typography>
            <Typography>{category.description}</Typography>
          </div>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid key={product._id} item md={4} xs={12}>
                <ProductItem {...product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();
  const { slug } = params as { slug: string };

  const categoryData = await apolloClient.query({
    query: QUERY_CATEGORY_SLUG,
    variables: {
      slug,
    },
  });

  // if category is empty
  if (!categoryData.data.allCategory.length) {
    return addApolloState(apolloClient, {
      props: {
        products: [],
        category: {},
      },
      revalidate: 60,
    });
  }

  const { data } = await apolloClient.query({
    query: QUERY_ALL_PRODUCT,
  });

  const products = data.allProduct.filter(({ categories }) => {
    if (categories.length) {
      return categories.some((category) => category.slug.current === slug);
    }
    return false;
  });

  return addApolloState(apolloClient, {
    props: {
      products,
      category: get(categoryData, 'data.allCategory[0]', {}),
    },
    revalidate: 20,
  });
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const { data, error } = await apolloClient.query({
    query: QUERY_ALL_CATEGORY,
  });

  return {
    paths: data.allCategory.map((category) => {
      return { params: { slug: category.slug.current } };
    }),
    fallback: 'blocking',
  };
};

export default ProductDetail;
