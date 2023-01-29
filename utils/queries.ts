import { gql } from "graphql-request";

export const queryCollections = () => gql`
  {
    collections(sort: ["rank:ASC"]) {
      data {
        id
        attributes {
          title
          description
          color
          card {
            data {
              attributes {
                alternativeText
                url
              }
            }
          }
          image {
            data {
              attributes {
                alternativeText
                url
              }
            }
          }
          rank
          slug
        }
      }
    }
  }
`;

export const queryProduct = (id: string) => gql`
  {
    product(id: "${id}") {
      data {
        id
        attributes {
          title
          designer
          description
          collection
          brand
          image {
            data {
              attributes {
                alternativeText
                url
              }
            }
          }
          rank
          slug
          collection {
            data {
              attributes {
                title
              }
            }
          }
          typology {
            data {
              attributes {
                title
              }
            }
          }
        }
      }
    }
  }
`;

export const queryProducts = (collection: string, typology: string) => gql`
  {
    products(
      filters: {
        and: [
          { collection: { slug: { eq: "${collection}" } } }
          { typology: { slug: { eq: "${typology}" } } }
        ]
      }
      sort: ["rank:ASC"]
    ) {
      data {
        id
        attributes {
          title
          designer
          description
          collection
          brand
          image {
            data {
              attributes {
                alternativeText
                url
              }
            }
          }
          rank
          slug
          collection {
            data {
              attributes {
                title
              }
            }
          }
          typology {
            data {
              attributes {
                title
              }
            }
          }
        }
      }
    }
  }
`;

export const queryTypologies = (collection: string) => gql`
  {
    typologies(
      filters: { collections: { slug: { contains: "${collection}" } } }
      sort: ["rank:ASC"]
    ) {
      data {
        id
        attributes {
          title
          image {
            data {
              attributes {
                alternativeText
                url
              }
            }
          }
          rank
          slug
          collections {
            data {
              attributes {
                title
              }
            }
          }
        }
      }
    }
  }
`;
