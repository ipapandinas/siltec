import { gql } from "graphql-request";

export const queryCollections = () => gql`
  {
    collections(sort: ["rank:ASC"]) {
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
    collections(filters: { slug: { eq: "${slug}" } }, pagination: {pageSize: 1}) {
      data {
        attributes {
          titre
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
          picto {
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
          document {
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
                titre
                slug
              }
            }
          }
          typology {
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
          { collection: { slug: { eq: "${collection}" } } }
          { typology: { slug: { eq: "${typology}" } } }
        ]
      }
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
          collection {
            data {
              attributes {
                titre
              }
            }
          }
          typology {
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
      vedette
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
    brands {
      ${BRAND_DATA_QUERY}
    }
  }
`;

export const queryFeaturedBrands = () => gql`
  {
    brands(filters: { vedette: { eq: true } }) {
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
    projects(sort: ["rank:ASC"]) {
      ${PROJECT_DATA_QUERY}
    }
  }
`;

export const queryProject = (id: string) => gql`
  {
    project(id: "${id}") {
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
    news(sort: ["rank:ASC"]) {
      ${NEWS_DATA_QUERY}
    }
  }
`;

export const querySingleNews = (id: string) => gql`
  {
    new(id: "${id}") {
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
