"use client";

import { EchoProvider } from "@merit-systems/echo-react-sdk";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/utils/orpc";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
	const echoAppId = process.env.NEXT_PUBLIC_ECHO_APP_ID;

	if (!echoAppId) {
		console.warn(
			"NEXT_PUBLIC_ECHO_APP_ID not found. Add your Echo App ID to .env.local",
		);
	}

	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<QueryClientProvider client={queryClient}>
				{echoAppId ? (
					<EchoProvider config={{ appId: echoAppId }}>{children}</EchoProvider>
				) : (
					children
				)}
				<ReactQueryDevtools />
			</QueryClientProvider>
			<Toaster richColors />
		</ThemeProvider>
	);
}
