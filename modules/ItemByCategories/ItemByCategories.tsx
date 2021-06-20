import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Product } from 'src/types/sanity-data';

interface Props {
  className?: string;
  products: Product[];
}

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    paddingTop: spacing(5),
    paddingBottom: spacing(5),
  },
  title: {
    textAlign: 'center',
  },
}));

const ItemByCategories: React.FC<Props> = ({ products }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4">BEST SELLER</Typography>
      {JSON.stringify(products)}
    </div>
  );
};

export default ItemByCategories;
