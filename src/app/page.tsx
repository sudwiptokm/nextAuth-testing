"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "../lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchLocations = async () => {
	const res = await axiosInstance.get("/admin/locations?search=grocer");
	return res.data;
};

export default function Home() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		try {
			const res = await axiosInstance.post("/admin/auth/login", { email, password });
			console.log({ res });

			// Manually set the session
			await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			// Redirect or update UI as needed
			router.push("/about");
		} catch (error) {
			console.error("Login failed", error);
			// Handle error (e.g., show an error message)
		}
	};

	// const { data, isLoading, error } = useQuery({
	// 	queryKey: ['locations', 'grocer'],
	// 	queryFn: fetchLocations,
	// 	staleTime: 5 * 60 * 1000, // 5 minutes
	// });

	// if (isLoading) return <p>Loading...</p>;
	// if (error) return <p>Error loading data</p>;

	// // Replace the fetchData function with a button that refetches the query
	// const refetchData = () => {
	// 	queryClient.invalidateQueries({ queryKey: ['locations', 'grocer'] });
	// };

	return (
		<div>
			<form
				action=""
				className="flex flex-col gap-2 max-w-md mx-auto mt-10"
				onSubmit={handleSubmit}
			>
				<input
					type="email"
					name="email"
					placeholder="Email"
					className="border border-gray-300 rounded-md p-2 text-black"
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					className="border border-gray-300 rounded-md p-2 text-black"
				/>
				<button type="submit">Submit</button>
				<Link href="/about">About</Link>
				{/* <button onClick={refetchData} type="button">
					Refetch Data
				</button> */}
			</form>
		</div>
	);
}
