import React from 'react';
import { defaultSerializers } from '@sanity/block-content-to-react';

const heading = ['h1', 'h2', 'h3', 'h4', 'h5'];

export const serializers = {
  types: {
    block: (props) => {
      const { style = 'normal' } = props.node;

      // build our mock header styles
      if (heading.includes(style)) {
        return <p>{props.children}</p>;
      }

      // handle all other blocks with the default serializer
      return defaultSerializers.types.block(props);
    },
    horizontalRule: function Hr() {
      return <hr />;
    },
  },
};
