import { gql } from "graphql-request";

const IMAGE_DATA_QUERY = `
  alternativeText
  url
  hash
  formats
`;

export const queryCollections = () => gql`
  {
    collections(sort: ["rank:ASC"], pagination: { pageSize: 50 }) {
      documentId
      titre
      description
      couleur
      image {
        ${IMAGE_DATA_QUERY}
      }
      rank
      slug
    }
  }
`;

export const queryCollectionSinglePage = () => gql`
  {
    hubDeCollection {
      documentId
      couleur
      sousTitre
      titre
    }
  }
`;

export const queryCollectionTitle = (slug: string) => gql`
  {
    collections(
      filters: { slug: { eq: "${slug}" } }
      pagination: { pageSize: 1 }
    ) {
      documentId
      titre
      slug
    }
  }
`;

export const queryProduct = (slug: string) => gql`
  {
    products(filters: { slug: { eq: "${slug}" } }, pagination: { pageSize: 1 }) {
      documentId
      titre
      designer
      description
      marque
      medias {
        ${IMAGE_DATA_QUERY}
      }
      image {
        ${IMAGE_DATA_QUERY}
      }
      rank
      slug
      collections {
        documentId
        titre
        slug
      }
      typologies {
        documentId
        titre
        slug
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
      documentId
      titre
      designer
      description
      marque
      image {
        ${IMAGE_DATA_QUERY}
      }
      rank
      slug
      collections {
        documentId
        titre
      }
      typologies {
        documentId
        titre
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
      documentId
      titre
      image {
        ${IMAGE_DATA_QUERY}
      }
      rank
      slug
      collections {
        documentId
        titre
      }
    }
  }
`;

export const queryTypologyTitle = (slug: string) => gql`
  {
    typologies(filters: { slug: { eq: "${slug}" } }, pagination: { pageSize: 1 }) {
      documentId
      titre
      slug
    }
  }
`;

const BRAND_DATA_QUERY = `
  documentId
  nom
  premium
  logo {
    ${IMAGE_DATA_QUERY}
  }
`;

export const queryAllBrands = () => gql`
  {
    brands(pagination: { pageSize: 200 }, sort: "nom:asc") {
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
  documentId
  titre
  description
  image {
    ${IMAGE_DATA_QUERY}
  }
  medias {
    ${IMAGE_DATA_QUERY}
  }
  couleur
  rank
  slug
  createdAt
`;

export const queryProjects = () => gql`
  {
    projects(pagination: { pageSize: 50 }, sort: ["rank:ASC"]) {
      ${PROJECT_DATA_QUERY}
    }
  }
`;

export const queryProject = (slug: string) => gql`
  {
    projects(filters: { slug: { eq: "${slug}" } }, pagination: { pageSize: 1 }) {
      ${PROJECT_DATA_QUERY}
    }
  }
`;

export const queryProjectSinglePage = () => gql`
  {
    hubDeRealisation {
      documentId
      couleur
      sousTitre
      titre
    }
  }
`;

const NEWS_DATA_QUERY = `
  documentId
  titre
  corps
  image {
    ${IMAGE_DATA_QUERY}
  }
  medias {
    ${IMAGE_DATA_QUERY}
  }
  rank
  slug
  createdAt
`;

export const queryNews = () => gql`
  {
    news(sort: ["rank:ASC"], pagination: { pageSize: 50 }) {
      ${NEWS_DATA_QUERY}
    }
  }
`;

export const querySingleNews = (slug: string) => gql`
  {
    news(filters: { slug: { eq: "${slug}" } }, pagination: { pageSize: 1 }) {
      ${NEWS_DATA_QUERY}
    }
  }
`;

export const queryNewsSinglePage = () => gql`
  {
    hubDActualite {
      documentId
      couleur
      sousTitre
      titre
    }
  }
`;

export const queryAboutSinglePage = () => gql`
  {
    quiSommesNous {
      documentId
      couleur
      description
      sousTitre
      titre
      trombinoscope {
        ${IMAGE_DATA_QUERY}
      }
    }
  }
`;

export const queryNavigation = () => gql`
  {
    navigation {
      documentId
      pastille {
        couleur
        titre
        url
        picto {
          url
          hash
          alternativeText
        }
      }
    }
  }
`;

export const queryContactSinglePage = () => gql`
  {
    contact {
      documentId
      couleur
      sousTitre
      titre
    }
  }
`;
