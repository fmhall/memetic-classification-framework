#!/usr/bin/env bun

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { db, type MemeData, meme } from "@/db";

async function seedMemes() {
	try {
		console.log("🌱 Starting meme seeding process...");

		// Path to the memes directory
		const memesDir = join(process.cwd(), "../../memes");

		// Read all JSON files from the memes directory
		const files = readdirSync(memesDir).filter((file) =>
			file.endsWith(".json"),
		);

		console.log(`📁 Found ${files.length} meme files to process`);

		for (const file of files) {
			const filePath = join(memesDir, file);
			const fileContent = readFileSync(filePath, "utf-8");

			try {
				const memeData: MemeData = JSON.parse(fileContent);

				// Check if meme already exists
				const existingMeme = await db.query.meme.findFirst({
					where: (meme, { eq }) => eq(meme.title, memeData.title),
				});

				if (existingMeme) {
					console.log(
						`⚠️  Meme "${memeData.title}" already exists, skipping...`,
					);
					continue;
				}

				// Insert the meme into the database
				await db.insert(meme).values({
					title: memeData.title,
					description: memeData.description,
					data: memeData,
				});

				console.log(`✅ Successfully added meme: "${memeData.title}"`);
			} catch (parseError) {
				console.error(`❌ Error parsing ${file}:`, parseError);
			}
		}

		console.log("🎉 Meme seeding completed!");

		// Display summary
		const totalMemes = await db.query.meme.findMany();
		console.log(`📊 Total memes in database: ${totalMemes.length}`);
	} catch (error) {
		console.error("💥 Error during seeding:", error);
		process.exit(1);
	}
}

// Run the seed function
seedMemes()
	.then(() => {
		console.log("🏁 Seeding process finished");
		process.exit(0);
	})
	.catch((error) => {
		console.error("💥 Seeding failed:", error);
		process.exit(1);
	});
