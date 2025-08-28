"use client";

import {
	EchoSignIn,
	useEcho,
	useEchoModelProviders,
} from "@merit-systems/echo-react-sdk";
import { streamText } from "ai";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
	id: string;
	role: "user" | "assistant";
	content: string;
}

export default function AIPage() {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const { isAuthenticated, user, balance } = useEcho();
	const { openai } = useEchoModelProviders();
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const text = input.trim();
		if (!text || isLoading || !isAuthenticated) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			role: "user",
			content: text,
		};

		const assistantMessage: Message = {
			id: (Date.now() + 1).toString(),
			role: "assistant",
			content: "",
		};

		setMessages((prev) => [...prev, userMessage, assistantMessage]);
		setInput("");
		setIsLoading(true);

		try {
			const { textStream } = await streamText({
				model: await openai("gpt-4o-mini"),
				messages: [
					...messages.map((msg) => ({
						role: msg.role,
						content: msg.content,
					})),
					{ role: "user", content: text },
				],
			});

			let fullText = "";
			for await (const chunk of textStream) {
				fullText += chunk;
				setMessages((prev) => {
					const newMessages = [...prev];
					const lastMessage = newMessages[newMessages.length - 1];
					if (lastMessage && lastMessage.role === "assistant") {
						lastMessage.content = fullText;
					}
					return newMessages;
				});
			}
		} catch (error) {
			console.error("Error generating response:", error);
			setMessages((prev) => {
				const newMessages = [...prev];
				const lastMessage = newMessages[newMessages.length - 1];
				if (lastMessage && lastMessage.role === "assistant") {
					lastMessage.content =
						"Sorry, I encountered an error. Please try again.";
				}
				return newMessages;
			});
		} finally {
			setIsLoading(false);
		}
	};

	if (!isAuthenticated) {
		return (
			<div className="flex h-full flex-col items-center justify-center space-y-4 p-4">
				<div className="text-center">
					<h2 className="mb-2 font-semibold text-xl">Sign in to continue</h2>
					<p className="mb-4 text-muted-foreground">
						You need to sign in with Echo to use AI features
					</p>
					<EchoSignIn />
				</div>
			</div>
		);
	}

	return (
		<div className="mx-auto grid w-full grid-rows-[auto_1fr_auto] overflow-hidden p-4">
			{/* User info header */}
			<div className="mb-4 border-b pb-2">
				<div className="flex items-center justify-between text-sm">
					<span>Welcome, {user?.name || user?.email}!</span>
					<span>Balance: ${balance?.balance || 0}</span>
				</div>
			</div>

			{/* Messages */}
			<div className="space-y-4 overflow-y-auto pb-4">
				{messages.length === 0 ? (
					<div className="mt-8 text-center text-muted-foreground">
						Ask me anything to get started!
					</div>
				) : (
					messages.map((message) => (
						<div
							key={message.id}
							className={`rounded-lg p-3 ${
								message.role === "user"
									? "ml-8 bg-primary/10"
									: "mr-8 bg-secondary/20"
							}`}
						>
							<p className="mb-1 font-semibold text-sm">
								{message.role === "user" ? "You" : "AI Assistant"}
							</p>
							<div className="whitespace-pre-wrap">{message.content}</div>
						</div>
					))
				)}
				{isLoading && (
					<div className="mr-8 rounded-lg bg-secondary/20 p-3">
						<p className="mb-1 font-semibold text-sm">AI Assistant</p>
						<div className="text-muted-foreground">Thinking...</div>
					</div>
				)}
				<div ref={messagesEndRef} />
			</div>

			{/* Input form */}
			<form
				onSubmit={handleSubmit}
				className="flex w-full items-center space-x-2 border-t pt-2"
			>
				<Input
					name="prompt"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Type your message..."
					className="flex-1"
					autoComplete="off"
					autoFocus
					disabled={isLoading}
				/>
				<Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
					<Send size={18} />
				</Button>
			</form>
		</div>
	);
}
