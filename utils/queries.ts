import { gql } from "graphql-request";

export const queryCollections = () => gql`
  {
    collections(sort: ["rank:ASC"], pagination: { pageSize: 50 }) {
      data {
        id
        attributes {
          titre
          description
          couleur
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

export const queryCollectionSinglePage = () => gql`
  {
    hubDeCollection {
      data {
        attributes {
          couleur
          sousTitre
          titre
        }
      }
    }
  }
`;

export const queryCollectionTitle = (slug: string) => gql`
  {
    collections(
      filters: { slug: { eq: "${slug}" } }
      pagination: {pageSize: 1}
    ) {
      data {
        attributes {
          titre
          slug
        }
      }
    }
  }
`;

export const queryProduct = (slug: string) => gql`
  {
    products(filters: { slug: { eq: "${slug}" } }) {
      data {
        id
        attributes {
          titre
          designer
          description
          marque
          medias {
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
          collections {
            data {
              attributes {
                titre
                slug
              }
            }
          }
          typologies {
            data {
              attributes {
                titre
                slug
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
          { collections: { slug: { eq: "${collection}" } } }
          { typologies: { slug: { eq: "${typology}" } } }
        ]
      }
      pagination: { pageSize: 50 }
      sort: ["rank:ASC"]
    ) {
      data {
        id
        attributes {
          titre
          designer
          description
          marque
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
                titre
              }
            }
          }
          typologies {
            data {
              attributes {
                titre
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
      pagination: { pageSize: 50 }
      sort: ["rank:ASC"]
    ) {
      data {
        id
        attributes {
          titre
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
                titre
              }
            }
          }
        }
      }
    }
  }
`;

export const queryTypologyTitle = (slug: string) => gql`
  {
    typologies(filters: { slug: { eq: "${slug}" } }, pagination: {pageSize: 1}) {
      data {
        attributes {
          titre
          slug
        }
      }
    }
  }
`;

const BRAND_DATA_QUERY = `
  data {
    id
    attributes {
      nom
      premium
      logo {
        data {
          attributes {
            alternativeText
            url
          }
        }
      }
    }
  }
`;

export const queryAllBrands = () => gql`
  {
    brands(
      pagination: { pageSize: 200 }
      sort: "nom:asc"
    ) {
      ${BRAND_DATA_QUERY}
    }
  }
`;

export const queryFeaturedBrands = () => gql`
  {
    brands(
      filters: { premium: { eq: true } }
      pagination: { pageSize: 50 }
      sort: "nom:asc"
    ) {
      ${BRAND_DATA_QUERY}
    }
  }
`;

const PROJECT_DATA_QUERY = `
  data {
    id
    attributes {
      titre
      description
      image {
        data {
          attributes {
            alternativeText
            url
          }
        }
      }
      medias {
        data {
          attributes {
            alternativeText
            url
          }
        }
      }
      couleur
      rank
      slug
      createdAt
    }
  }
`;

export const queryProjects = () => gql`
  {
    projects(
      pagination: { pageSize: 50 }
      sort: ["rank:ASC"]
    ) {
      ${PROJECT_DATA_QUERY}
    }
  }
`;

export const queryProject = (slug: string) => gql`
  {
    projects(filters: { slug: { eq: "${slug}" } }) {
      ${PROJECT_DATA_QUERY}
    }
  }
`;

export const queryProjectSinglePage = () => gql`
  {
    hubDeRealisation {
      data {
        attributes {
          couleur
          sousTitre
          titre
        }
      }
    }
  }
`;

const NEWS_DATA_QUERY = `
  data {
    id
    attributes {
      titre
      corps
      image {
        data {
          attributes {
            alternativeText
            url
          }
        }
      }
      medias {
        data {
          attributes {
            alternativeText
            url
          }
        }
      }
      rank
      slug
      createdAt
    }
  }
`;

export const queryNews = () => gql`
  {
    news(
      sort: ["rank:ASC"]
      pagination: { pageSize: 50 }
    ) {
      ${NEWS_DATA_QUERY}
    }
  }
`;

export const querySingleNews = (slug: string) => gql`
  {
    news(filters: { slug: { eq: "${slug}" } }) {
      ${NEWS_DATA_QUERY}
    }
  }
`;

export const queryNewsSinglePage = () => gql`
  {
    hubDActualite {
      data {
        attributes {
          couleur
          sousTitre
          titre
        }
      }
    }
  }
`;

export const queryAboutSinglePage = () => gql`
  {
    quiSommesNous {
      data {
        attributes {
          couleur
          description
          sousTitre
          titre
          trombinoscope {
            data {
              attributes {
                alternativeText
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const queryNavigation = () => gql`
  {
    navigation {
      data {
        attributes {
          pastille {
            couleur
            titre
            url
            picto {
              data {
                attributes {
                  alternativeText
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;
