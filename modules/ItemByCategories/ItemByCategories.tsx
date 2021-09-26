import React from 'react';
import { Product } from 'src/types/sanity-data';

interface Props {
  className?: string;
  products: Product[];
}

const ItemByCategories: React.FC<Props> = ({ products }) => {
  return (
    <div>
      <p>BEST SELLER</p>
      {JSON.stringify(products)}
    </div>
  );
};

export default ItemByCategories;
