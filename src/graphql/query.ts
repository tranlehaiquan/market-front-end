import { gql } from '@apollo/client';

export const QUERY_ALL_PRODUCT = gql`
  query data {
  }
`;

export const GENERAL_SETTING = gql`
  query data {
    GeneralSettings(id: "generalSettings") {
      siteURL
    }
  }
`;

