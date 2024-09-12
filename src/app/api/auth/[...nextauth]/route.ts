import axiosInstance from "@/lib/axios";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Add this type declaration at the top of your file
declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			name?: string | null;
			email?: string | null;
			image?: string | null;
		};
	}
}

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}
				try {
					const response = await axiosInstance.post("/admin/auth/login", {
						email: credentials.email,
						password: credentials.password,
					});
					if (response.status === 200) {
						// Return a user object that NextAuth can use
						return { id: "1", email: credentials.email };
					}
				} catch (error) {
					return null;
				}
				return null;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.email = user.email;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.email = token.email as string;
			}
			return session;
		},
	},
	pages: {
		signIn: "/",
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
