"use client";

import React from "react";
import axiosInstance from "../../lib/axios";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const fetchLocations = async () => {
	const res = await axiosInstance.get("/admin/locations?search=grocer");
	return res.data;
};

const Page = () => {
	const { data: session, status } = useSession();
	const { data, isLoading, error } = useQuery({
		queryKey: ['locations', 'grocer'],
		queryFn: fetchLocations,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});

	if (status === "loading" || isLoading) return <p>Loading...</p>;
	if (error) return <p>Error loading data</p>;

	return (
		<div>
			About Page
			<br />
			<Link href="/" className="text-blue-500">Home</Link>
			<div>
			{session?.user?.email} is Signed In
			</div>
			{/* Render your data here */}
			{JSON.stringify(data)}

		</div>
	);
};

export default Page;
