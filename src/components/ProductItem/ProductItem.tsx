import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { Product } from 'src/types/sanity-data';
import React from 'react';
import { useNextSanityImage } from 'next-sanity-image';
import client from 'sanity/client';
import Img from 'next/image';
import omit from 'lodash/omit';
import get from 'lodash/get';
import Link from 'next/link';

interface Props extends Product {
  className?: string;
}

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    border: '2px solid #F6F6F6',
    borderRadius: spacing(0.5),
    position: 'relative',
  },
  info: {
    padding: spacing(1.5),
    textAlign: 'center',
  },
  title: {
    color: '#223263',
    fontWeight: 'bold',
    lineHeight: '27px',
    textDecoration: 'none',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
  },
  price: {
    color: palette.primary.main,
    fontWeight: 'bold',
  },
  salePrice: {
    color: '#9098B1',
    fontWeight: 'bold',
    textDecoration: 'line-through',
  },
  percent: {
    color: '#FB7181',
    fontWeight: 'bold',
  },
}));

const ProductItem: React.FC<Props> = ({
  title,
  price,
  salePrice,
  images,
  slug,
}) => {
  const image = { ...images[0] };
  const imageProps = useNextSanityImage(client, omit(image));
  const classes = useStyles();
  const blurURL = get(image, 'asset.metadata.lqip', '');

  return (
    <div className={classes.root}>
      <div style={{ position: 'relative', paddingTop: '90%' }}>
        <Img
          src={imageProps.src}
          loader={imageProps.loader}
          layout="fill"
          objectFit="cover"
          sizes="(max-width: 600px) 100vw, 800px"
          placeholder="blur"
          blurDataURL={blurURL}
        />
      </div>
      <div className={classes.info}>
        <Link href={`/product/${slug.current}`} passHref>
          <Typography
            variant="h6"
            component="a"
            className={classes.title}
            title={title}
          >
            {title}
          </Typography>
        </Link>
        <Typography>
          <span className={classes.price}>{price}$</span>{' '}
          {salePrice && (
            <>
              <span className={classes.salePrice}>{salePrice}$</span>{' '}
              <span className={classes.percent}>
                {Math.round(100 - (salePrice / price) * 100)}%
              </span>
            </>
          )}
        </Typography>
      </div>
    </div>
  );
};

export default ProductItem;
