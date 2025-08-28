"use client";
import { EchoSignIn, useEcho } from "@merit-systems/echo-react-sdk";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

export default function Header() {
	const { isAuthenticated, user, balance, signOut } = useEcho();
	const links = [
		{ to: "/", label: "Home" },
		{ to: "/dashboard", label: "Dashboard" },
	] as const;

	return (
		<div>
			<div className="flex flex-row items-center justify-between px-2 py-1">
				<nav className="flex gap-4 text-lg">
					{links.map(({ to, label }) => {
						return (
							<Link key={to} href={to}>
								{label}
							</Link>
						);
					})}
				</nav>
				<div className="flex items-center gap-2">
					{isAuthenticated ? (
						<div className="flex items-center gap-2 text-sm">
							<span>Hi, {user?.name || user?.email}</span>
							<span className="text-muted-foreground">
								Balance: ${balance?.balance || 0}
							</span>
							<button
								type="button"
								onClick={signOut}
								className="text-muted-foreground hover:text-foreground"
							>
								Sign out
							</button>
						</div>
					) : (
						<EchoSignIn />
					)}
					<ModeToggle />
					<UserMenu />
				</div>
			</div>
			<hr />
		</div>
	);
}
