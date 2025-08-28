# Memes Database Setup

This document explains how to set up and use the memes database functionality.

## Database Schema

The memes are stored in a PostgreSQL table with the following structure:

- `id`: Auto-incrementing primary key
- `title`: The name of the meme
- `description`: Optional description
- `data`: JSON blob containing the full meme classification data
- `createdAt`: Timestamp when the meme was created
- `updatedAt`: Timestamp when the meme was last updated
- `createdBy`: Optional reference to the user who created it

## TypeScript Types

The meme data follows a structured format with 6 main categories:

1. **Core Architecture**: Central concept, key narratives, invariant elements
2. **Transmission Mechanisms**: Spread vectors, required resources, ease of transmission
3. **Selection & Defense**: Environmental factors, defense mechanisms, competitive advantages
4. **Evolution Pattern**: Common mutations, adaptation capabilities, stability
5. **Social Network Effects**: Feedback loops, group identity, status dynamics
6. **Emotional Hooks**: Primary emotions, reward mechanisms, motivation structures

Each category has 3 fields with descriptions and examples.

## JSON Files

The memes are stored as JSON files in the `/memes` directory:

- `missionary-religions.json`
- `capitalism-free-markets.json`
- `techno-optimism.json`
- `strange-loops.json`

## Database Operations

### Push Schema Changes
```bash
bun db:push
```

### Seed the Database with Memes
```bash
bun db:seed-memes
```

### Open Database Studio
```bash
bun db:studio
```

## Usage

1. First, make sure your database is set up and the schema is pushed:
   ```bash
   bun db:push
   ```

2. Seed the database with the example memes:
   ```bash
   bun db:seed-memes
   ```

3. The script will:
   - Read all JSON files from the `/memes` directory
   - Check if each meme already exists in the database
   - Insert new memes and skip existing ones
   - Provide detailed logging of the process

## Adding New Memes

To add new memes:

1. Create a new JSON file in the `/memes` directory following the established structure
2. Run the seed script again: `bun db:seed-memes`
3. The script will automatically detect and add only the new memes

## Database Access

The meme schema and types are exported from `@/db` and can be used throughout the application:

```typescript
import { db, meme, type MemeData, type Meme } from "@/db";

// Query all memes
const allMemes = await db.query.meme.findMany();

// Query specific meme
const specificMeme = await db.query.meme.findFirst({
  where: (meme, { eq }) => eq(meme.title, "Techno-Optimism"),
});

// Insert new meme
await db.insert(meme).values({
  title: "New Meme",
  description: "Description",
  data: memeData,
});
```
