interface CARDMEDIAINTERFACE {
    name: string;
    alt: string;
    url: string;
    fragment: string;
    type: string;
  }

  interface CITYINTERFACE {
    city: {
      cardMedia: CARDMEDIAINTERFACE;
      id: string;
      name: string;
      slug: string;
      cardSnippet: string;
    };
  }
  interface PRODUCTINTERFACE {
    id: string;
    name: string;
    slug: string;
    duration: string;
    price: string;
    cardMessage: string;
    cardSnippet: string;
    cardMedia: [CARDMEDIAINTERFACE];
    reviews: [
      {
        id: string;
        rating: number;
      }
    ];
  }
  interface AGGREGATEINTERFACE {
    aggregate: {
      count: number;
    };
  }
  interface PAGE_INFO_INTERFACE {
    header: string;
    subheader: string;
    pageTitle: string;
    slug: string;
    metaDescription: string;
    canonical: string;
  }
  interface ATTRACTION_INTERFACE {
    id: string;
    name: string;
    slug: string;
    cardSnippet: string;
    cardMedia: [CARDMEDIAINTERFACE];
    cardMediaAlt: [CARDMEDIAINTERFACE];
    city: [
      {
        id: string;
        name: string;
        slug: string;
      }
    ];
  }
  export type {
    CARDMEDIAINTERFACE,
    AGGREGATEINTERFACE,
    CITYINTERFACE,
    PRODUCTINTERFACE,
    PAGE_INFO_INTERFACE,
    ATTRACTION_INTERFACE,
  };
  