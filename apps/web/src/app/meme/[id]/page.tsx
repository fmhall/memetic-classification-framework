"use client";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { orpc } from "@/utils/orpc";

interface MemeSection {
	title: string;
	data: Record<string, string>;
	description: string;
}

export default function MemePage() {
	const router = useRouter();
	const params = useParams();
	const memeId = Number.parseInt(params.id as string, 10);

	const {
		data: meme,
		isLoading,
		error,
	} = useQuery(orpc.getMeme.queryOptions({ input: { id: memeId } }));

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const memeSections: MemeSection[] = [
		{
			title: "Core Architecture",
			description: "The fundamental structure and elements of this meme",
			data:
				(meme?.data?.coreArchitecture as unknown as Record<string, string>) ||
				{},
		},
		{
			title: "Transmission Mechanisms",
			description: "How this meme spreads and propagates",
			data:
				(meme?.data?.transmissionMechanisms as unknown as Record<
					string,
					string
				>) || {},
		},
		{
			title: "Selection & Defense",
			description: "How this meme survives and resists counter-arguments",
			data:
				(meme?.data?.selectionDefense as unknown as Record<string, string>) ||
				{},
		},
		{
			title: "Evolution Pattern",
			description: "How this meme changes and adapts over time",
			data:
				(meme?.data?.evolutionPattern as unknown as Record<string, string>) ||
				{},
		},
		{
			title: "Social Network Effects",
			description: "How this meme affects social groups and relationships",
			data:
				(meme?.data?.socialNetworkEffects as unknown as Record<
					string,
					string
				>) || {},
		},
		{
			title: "Emotional Hooks",
			description: "The emotional mechanisms that make this meme compelling",
			data:
				(meme?.data?.emotionalHooks as unknown as Record<string, string>) || {},
		},
	];

	if (error) {
		return (
			<div className="container mx-auto max-w-4xl px-4 py-8">
				<Button variant="ghost" onClick={() => router.back()} className="mb-6">
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back
				</Button>
				<Card>
					<CardContent className="py-12 text-center">
						<p className="mb-4 text-muted-foreground">Meme not found</p>
						<Button onClick={() => router.push("/")}>Go Home</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="container mx-auto max-w-4xl px-4 py-8">
			{/* Back Button */}
			<Button variant="ghost" onClick={() => router.back()} className="mb-6">
				<ArrowLeft className="mr-2 h-4 w-4" />
				Back
			</Button>

			{isLoading ? (
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<Skeleton className="h-8 w-3/4" />
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-1/2" />
						</CardHeader>
					</Card>
					{Array.from({ length: 6 }, (_, i) => i).map((i) => (
						<Card key={i}>
							<CardHeader>
								<Skeleton className="h-6 w-1/2" />
								<Skeleton className="h-4 w-3/4" />
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-2/3" />
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			) : meme ? (
				<div className="space-y-6">
					{/* Header */}
					<Card>
						<CardHeader>
							<CardTitle className="text-3xl">{meme.title}</CardTitle>
							{meme.description && (
								<CardDescription className="text-lg">
									{meme.description}
								</CardDescription>
							)}
							<div className="flex items-center gap-4 text-muted-foreground text-sm">
								<div className="flex items-center gap-1">
									<Calendar className="h-4 w-4" />
									{formatDate(meme.createdAt.toString())}
								</div>
								{meme.createdBy && (
									<div className="flex items-center gap-1">
										<User className="h-4 w-4" />
										{meme.createdBy}
									</div>
								)}
							</div>
						</CardHeader>
					</Card>

					{/* Meme Analysis Sections */}
					{memeSections.map((section) => (
						<Card key={section.title}>
							<CardHeader>
								<CardTitle className="text-xl">{section.title}</CardTitle>
								<CardDescription>{section.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid gap-4 md:grid-cols-2">
									{Object.entries(section.data).map(([key, value]) => (
										<div key={key} className="space-y-2">
											<h4 className="font-medium text-muted-foreground text-sm uppercase tracking-wide">
												{key
													.replace(/([A-Z])/g, " $1")
													.replace(/^./, (str) => str.toUpperCase())}
											</h4>
											<p className="text-sm leading-relaxed">{value}</p>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			) : null}
		</div>
	);
}
