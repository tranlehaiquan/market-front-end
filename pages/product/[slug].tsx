import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { addApolloState, initializeApollo } from 'lib/apolloClient';
import { gql } from '@apollo/client';
import { Product } from 'src/types/sanity-data';
import Head from 'next/head';
import Carousel from '@components/Carousel';
import BlockContent from '@sanity/block-content-to-react';
import PhotoSanity from '@components/PhotoSanity';
import Price from '@components/Price';
import Rating from '@components/Rating';

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
      body {
        _type
        _key
        enRaw
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

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    paddingTop: spacing(5),
    paddingBottom: spacing(5),
  },
  photo: {
    position: 'relative',
    paddingTop: '90%',
  },
  price: {
    marginTop: spacing(1),
    marginBottom: spacing(1),
  },
  productInfo: {
    backgroundColor: palette.grey[100],
    marginTop: spacing(3),
  },
  productInfoHeader: {
    padding: spacing(2, 3),
    borderBottom: `1px solid ${palette.grey[300]}`,
  },
  productInfoBody: {
    padding: spacing(1, 3),
  },
  rating: {
    marginTop: spacing(1),
    marginBottom: spacing(1),
  },
}));

const ProductDetail: React.FC<Props> = ({ data }) => {
  const classes = useStyles();
  const { images } = data;

  return (
    <>
      <Head>
        <title> {data.title} | Simple market</title>
      </Head>
      <div className={classes.root}>
        <Container>
          <Grid container spacing={4}>
            <Grid item md={5}>
              <Carousel>
                {images.map((image) => (
                  <div key={image._key} className={classes.photo}>
                    <PhotoSanity
                      image={image}
                      layout="fill"
                      objectFit="cover"
                      sizes="(max-width: 600px) 100vw, 600px"
                      alt={data.title}
                    />
                  </div>
                ))}
              </Carousel>
            </Grid>

            <Grid item md={7}>
              <Typography variant="h4" component="h1">
                {data.title}
              </Typography>
              <div>
                <Rating
                  className={classes.rating}
                  ratingAvg={5}
                  ratingTotal={20}
                />
              </div>
              <div className={classes.price}>
                <Price price={data.price} salePrice={data.salePrice} />
              </div>
            </Grid>
          </Grid>

          <div className={classes.productInfo}>
            <div className={classes.productInfoHeader}>
              <Typography variant="h5">Product Infomation</Typography>
            </div>
            <div className={classes.productInfoBody}>
              <Typography variant="body1">
                <BlockContent
                  renderContainerOnSingleChild
                  className="rc"
                  blocks={data.body.enRaw}
                />
              </Typography>
            </div>
          </div>
        </Container>
      </div>
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
    revalidate: 20,
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
