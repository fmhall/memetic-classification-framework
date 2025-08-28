// This route is no longer needed as we've migrated to Echo for AI calls
// The AI functionality is now handled client-side using the Echo SDK

// import { google } from "@ai-sdk/google";
// import { streamText, type UIMessage, convertToModelMessages } from "ai";

// export const maxDuration = 30;

// export async function POST(req: Request) {
// 	const { messages }: { messages: UIMessage[] } = await req.json();

// 	const result = streamText({
// 		model: google("gemini-2.0-flash"),
// 		messages: convertToModelMessages(messages),
// 	});

// 	return result.toUIMessageStreamResponse();
// }

export async function GET() {
	return new Response("AI functionality has been migrated to Echo SDK", {
		status: 200,
	});
}
