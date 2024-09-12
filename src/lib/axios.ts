import axios from "axios";
import { signOut } from "next-auth/react";

const axiosInstance = axios.create({
	baseURL: "https://dev.omniattention.com/api/v1",
	withCredentials: true, // This ensures cookies are sent with every request
});

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response && error.response.status === 401) {
			// Sign out the user and redirect to home page
			await signOut({ callbackUrl: "/" });
			console.log(error.response.data)
		}
		return Promise.reject(error);
	},
);

export default axiosInstance;
