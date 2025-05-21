CREATE TABLE `core_architecture` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`meme_id` integer NOT NULL,
	`central_concept` text NOT NULL,
	`key_narratives` text NOT NULL,
	`invariant_elements` text NOT NULL,
	`example` text NOT NULL,
	FOREIGN KEY (`meme_id`) REFERENCES `memes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `emotional_hooks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`meme_id` integer NOT NULL,
	`primary_emotions` text NOT NULL,
	`reward_mechanisms` text NOT NULL,
	`motivation` text NOT NULL,
	`example` text NOT NULL,
	FOREIGN KEY (`meme_id`) REFERENCES `memes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `evolution_pattern` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`meme_id` integer NOT NULL,
	`mutations` text NOT NULL,
	`adaptation` text NOT NULL,
	`stability` text NOT NULL,
	`example` text NOT NULL,
	FOREIGN KEY (`meme_id`) REFERENCES `memes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `memes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `selection_defense` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`meme_id` integer NOT NULL,
	`environmental_factors` text NOT NULL,
	`defense_mechanisms` text NOT NULL,
	`competitive_advantage` text NOT NULL,
	`example` text NOT NULL,
	FOREIGN KEY (`meme_id`) REFERENCES `memes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `social_network_effects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`meme_id` integer NOT NULL,
	`feedback_loops` text NOT NULL,
	`group_identity` text NOT NULL,
	`status_dynamics` text NOT NULL,
	`example` text NOT NULL,
	FOREIGN KEY (`meme_id`) REFERENCES `memes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `transmission_mechanisms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`meme_id` integer NOT NULL,
	`primary_vectors` text NOT NULL,
	`required_resources` text NOT NULL,
	`ease_of_transmission` text NOT NULL,
	`example` text NOT NULL,
	FOREIGN KEY (`meme_id`) REFERENCES `memes`(`id`) ON UPDATE no action ON DELETE no action
);
