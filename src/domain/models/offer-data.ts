export type OfferDataInput = {
  image: string;
  title: string;
  price: string;
  oldPrice: string;
  destinationLink: string;
  storeName: string;
  expirationDate: string;
  description: string;
}

export type Offer = {
  id: string;
  image: string;
  title: string;
  old_price: string;
  price: string;
  destination_link: string;
  store_image: string;
  store_name: string;
  description: string;
  expiration_date: string;
  created_at: string;
  is_on_showcase: boolean;
  is_featured: boolean;
  is_free_shipping: boolean;
  resources_id: string;
  short_link: string;
}

export type OfferWithClicks = Offer & {
  resources: {
    user_profile: {
      store_name: string,
      store_name_display: string,
      store_image: string,
      social_media: {
        id: string,
        facebook: string,
        whatsapp: string,
        instagram: string,
        telegram: string,
        twitter:string,
        user_profile_id: string
      }
    }
  },
  _count: {
    offer_clicks: number;
  };
}