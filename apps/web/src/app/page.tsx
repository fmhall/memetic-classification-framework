"use client";
import { useEchoModelProviders } from "@merit-systems/echo-react-sdk";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { generateText } from "ai";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { orpc } from "@/utils/orpc";

export default function Home() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [memeInput, setMemeInput] = useState("");
	const [isCreating, setIsCreating] = useState(false);
	const inputId = useId();
	const { openai } = useEchoModelProviders();

	const handleGenerate = async (prompt: string) => {
		// Direct AI calls from the browser - no API keys needed!
		const { text } = await generateText({
			model: await openai("gpt-5"),
			prompt: prompt,
		});

		return text;
	};

	// Fetch all memes
	const { data: memes, isLoading } = useQuery(orpc.getMemes.queryOptions());

	// Create meme mutation
	const createMemeMutation = useMutation(
		orpc.createMeme.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["getMemes"] });
				setMemeInput("");
				toast.success("Meme created successfully!");
			},
			onError: (error) => {
				toast.error(`Failed to create meme: ${error.message}`);
			},
		}),
	);

	const handleCreateMeme = async () => {
		if (!memeInput.trim()) {
			toast.error("Please enter a meme concept");
			return;
		}

		setIsCreating(true);
		try {
			const prompt = `Create a detailed meme analysis for the concept: "${memeInput}". 

Return a JSON object with the following structure:
{
  "title": "Brief title for the meme",
  "description": "Short description of what this meme represents",
  "coreArchitecture": {
    "centralConcept": "The core idea or belief",
    "keyNarratives": "Main stories or examples that spread this meme",
    "invariantElements": "What stays consistent across variations",
    "example": "A concrete example"
  },
  "transmissionMechanisms": {
    "primaryVectors": "How this meme spreads",
    "requiredResources": "What's needed for transmission",
    "easeOfTransmission": "How easily it spreads",
    "example": "Example of transmission"
  },
  "selectionDefense": {
    "environmentalFactors": "Conditions that favor this meme",
    "defenseMechanisms": "How it resists counter-arguments",
    "competitiveAdvantages": "Why it beats other memes",
    "example": "Example of its defense"
  },
  "evolutionPattern": {
    "commonMutations": "How it changes over time",
    "adaptationCapabilities": "How it adapts to new contexts",
    "stabilityVolatility": "How stable vs changeable it is",
    "example": "Example of evolution"
  },
  "socialNetworkEffects": {
    "feedbackLoops": "How it reinforces itself",
    "groupIdentity": "How it creates group belonging",
    "statusDynamics": "How it affects social status",
    "example": "Example of social effects"
  },
  "emotionalHooks": {
    "primaryEmotions": "Main emotions it triggers",
    "rewardMechanisms": "How it rewards believers",
    "motivationStructures": "What drives people to adopt it",
    "example": "Example of emotional appeal"
  }
}

Make sure to provide thoughtful, detailed responses for each field.`;

			const response = await handleGenerate(prompt);

			// Extract JSON from the response
			const jsonMatch = response.match(/\{[\s\S]*\}/);
			if (!jsonMatch) {
				throw new Error("Could not extract JSON from AI response");
			}

			const memeData = JSON.parse(jsonMatch[0]);

			await createMemeMutation.mutateAsync({
				title: memeData.title,
				description: memeData.description,
				data: memeData,
			});
		} catch (error) {
			console.error("Error creating meme:", error);
			toast.error("Failed to create meme. Please try again.");
		} finally {
			setIsCreating(false);
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	return (
		<div className="container mx-auto max-w-4xl px-4 py-8">
			{/* Header */}
			<div className="mb-12 text-center">
				<h1 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-bold text-4xl text-transparent">
					Memes, Memes, Memes
				</h1>
				<p className="text-lg text-muted-foreground">
					Explore and create memetic analyses with AI
				</p>
			</div>

			{/* Create Meme Section */}
			<Card className="mb-12">
				<CardHeader>
					<CardTitle>Create New Meme Analysis</CardTitle>
					<CardDescription>
						Enter a concept and let AI create a detailed memetic analysis
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex gap-4">
						<div className="flex-1">
							<Label htmlFor={inputId} className="sr-only">
								Meme Concept
							</Label>
							<Input
								id={inputId}
								placeholder="Enter a concept (e.g., 'crypto', 'minimalism', 'hustle culture')"
								value={memeInput}
								onChange={(e) => setMemeInput(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter" && !isCreating) {
										handleCreateMeme();
									}
								}}
								disabled={isCreating}
							/>
						</div>
						<Button
							onClick={handleCreateMeme}
							disabled={isCreating || !memeInput.trim()}
						>
							{isCreating ? "Creating..." : "Create Meme"}
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Memes Grid */}
			<div className="mb-8">
				<h2 className="mb-6 font-semibold text-2xl">Recent Memes</h2>

				{isLoading ? (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{Array.from({ length: 6 }, (_, i) => i).map((i) => (
							<Card
								key={i}
								className="cursor-pointer transition-shadow hover:shadow-md"
							>
								<CardHeader>
									<Skeleton className="h-6 w-3/4" />
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-1/2" />
								</CardHeader>
							</Card>
						))}
					</div>
				) : memes && memes.length > 0 ? (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{memes.map((meme) => (
							<Card
								key={meme.id}
								className="cursor-pointer transition-shadow hover:shadow-md"
								onClick={() => router.push(`/meme/${meme.id}`)}
							>
								<CardHeader>
									<CardTitle className="text-lg">{meme.title}</CardTitle>
									{meme.description && (
										<CardDescription className="line-clamp-2">
											{meme.description}
										</CardDescription>
									)}
									<div className="text-muted-foreground text-sm">
										{formatDate(meme.createdAt.toString())}
									</div>
								</CardHeader>
							</Card>
						))}
					</div>
				) : (
					<Card>
						<CardContent className="py-12 text-center">
							<p className="mb-4 text-muted-foreground">No memes found</p>
							<p className="text-muted-foreground text-sm">
								Create your first meme analysis above!
							</p>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}
