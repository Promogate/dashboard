import { OfferWithClicks } from "./offer-data";

export type DashboardData = {
	id: string,
	store_name: string,
	store_image: string,
	api_key: {
		id: string,
		key: string,
		created_at: string,
		expiration_date: string,
		user_profile_id: string
	},
	role: string,
	user_id: string,
	analytics: {
		_count: {
			offer_clicks: number,
			destination_clicks: number
		}
	},
	resources: {
		offers: OfferWithClicks[]
	}
}