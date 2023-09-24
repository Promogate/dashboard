export type UserData = {
	id: string,
	email: string,
	name: string,
	created_at: string,
	user_profile: {
		id: string,
		store_image: string,
		store_name: string,
		role: string,
		user_id: string
	}
}