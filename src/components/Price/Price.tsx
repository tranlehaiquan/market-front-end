import { makeStyles } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';

interface Props {
  className?: string;
  price: number;
  salePrice?: number;
}

const useStyles = makeStyles(({ spacing, palette, typography }) => ({
  root: {
    fontSize: typography.pxToRem(16),
  },
  price: {
    color: palette.primary.main,
    fontWeight: 'bold',
    fontSize: typography.pxToRem(23),
    marginRight: spacing(0.5),
  },
  salePrice: {
    color: '#9098B1',
    textDecoration: 'line-through',
    marginRight: spacing(0.5),
  },
  percent: {
    color: '#FB7181',
    fontWeight: 'bold',
    fontSize: typography.pxToRem(18),
  },
}));

const Price: React.FC<Props> = ({ price, salePrice, className = '' }) => {
  const classes = useStyles();
  return (
    <div className={clsx(className, classes.root)}>
      Price: <span className={classes.price}>{salePrice || price}$</span>{' '}
      {salePrice && (
        <>
          <span className={classes.salePrice}>{price}$</span>{' '}
          <span className={classes.percent}>
            {Math.round(100 - (salePrice / price) * 100)}%
          </span>
        </>
      )}
    </div>
  );
};

export default Price;
