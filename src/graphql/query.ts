import { gql } from '@apollo/client';

export const QUERY_ALL_PRODUCT = gql`
  query data {
    allProduct {
      _id
      title
      _createdAt
      _updatedAt
      price
      salePrice
      slug {
        current
      }
      categories {
        _id
        slug {
          current
        }
        title
        description
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
