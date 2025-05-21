import { db } from './index';
import {
  memes,
  coreArchitecture,
  transmissionMechanisms,
  selectionDefense,
  evolutionPattern,
  socialNetworkEffects,
  emotionalHooks
} from './schema';

async function seed() {
  console.log('Seeding database...');

  // Clear existing data
  await db.delete(emotionalHooks);
  await db.delete(socialNetworkEffects);
  await db.delete(evolutionPattern);
  await db.delete(selectionDefense);
  await db.delete(transmissionMechanisms);
  await db.delete(coreArchitecture);
  await db.delete(memes);

  // Insert memes
  const missionaryReligions = await db.insert(memes).values({
    name: 'Missionary Religions',
    description: 'Religions that actively seek to convert non-believers to their faith.'
  }).returning().get();

  const capitalism = await db.insert(memes).values({
    name: 'Capitalism and Free Markets',
    description: 'Economic system based on private ownership and free market principles.'
  }).returning().get();

  const technoOptimism = await db.insert(memes).values({
    name: 'Techno-Optimism',
    description: 'Belief that technological progress is the primary driver of human flourishing.'
  }).returning().get();

  const strangeLoops = await db.insert(memes).values({
    name: 'Strange Loops',
    description: 'Systems that observe/refer to themselves creating meaningful paradoxes.'
  }).returning().get();

  // Insert core architecture
  await db.insert(coreArchitecture).values({
    memeId: missionaryReligions.id,
    centralConcept: "One's religion contains exclusive truth and path to salvation that must be shared",
    keyNarratives: "Stories of prophets, conversion tales, miraculous transformations",
    invariantElements: "Divine authority, universal applicability, moral imperative to spread",
    example: "Early Christian apostles spreading the gospel, facing persecution, yet converting entire regions"
  });

  await db.insert(coreArchitecture).values({
    memeId: capitalism.id,
    centralConcept: "Voluntary exchange and private property rights lead to optimal outcomes through market forces",
    keyNarratives: "Rags-to-riches stories, invisible hand metaphor, creative destruction driving progress",
    invariantElements: "Property rights, price signals, individual economic freedom",
    example: "The iPhone story - individual profit motive leading to revolutionary innovation benefiting society"
  });

  await db.insert(coreArchitecture).values({
    memeId: technoOptimism.id,
    centralConcept: "Technological progress is the primary driver of human flourishing and problem-solving",
    keyNarratives: "Moore's Law, falling costs of goods, exponential innovation curves, previous technology pessimism proven wrong",
    invariantElements: "Faith in human ingenuity, inevitability of progress, abundance through innovation",
    example: "Norman Borlaug's Green Revolution saving a billion lives despite Malthusian predictions"
  });

  await db.insert(coreArchitecture).values({
    memeId: strangeLoops.id,
    centralConcept: "Systems that observe/refer to themselves create meaningful paradoxes and loops that are fundamental to consciousness and meaning",
    keyNarratives: "Bach's musical canons, Escher's drawings, Gödel's incompleteness theorems",
    invariantElements: "The presence of hierarchy that somehow \"loops back\" to itself in an unexpected way",
    example: "A security camera showing its own feed on the monitor it's filming, creating an infinite regression"
  });

  // Insert transmission mechanisms
  await db.insert(transmissionMechanisms).values({
    memeId: missionaryReligions.id,
    primaryVectors: "Personal testimony, organized preaching, sacred texts, ritualistic practices",
    requiredResources: "Dedicated evangelists, meeting places, educational materials",
    easeOfTransmission: "Moderate complexity, but simplified through parables and personal narratives",
    example: "Mormon missionaries using a structured approach: initial contact, relationship building, staged revelations of doctrine"
  });

  await db.insert(transmissionMechanisms).values({
    memeId: capitalism.id,
    primaryVectors: "Economic education, business media, personal experience with markets",
    requiredResources: "Basic economic literacy, examples of market success",
    easeOfTransmission: "Complex in theory but reinforced by daily market interactions",
    example: "Children learning through simple activities like lemonade stands or trading cards"
  });

  await db.insert(transmissionMechanisms).values({
    memeId: technoOptimism.id,
    primaryVectors: "Tech success stories, startup culture, popular science communication, visible technological breakthroughs",
    requiredResources: "Examples of transformative technologies, historical progress data",
    easeOfTransmission: "High due to tangible benefits in everyday life",
    example: "Smartphone evolution demonstrating continuous improvement and expanded capabilities"
  });

  await db.insert(transmissionMechanisms).values({
    memeId: strangeLoops.id,
    primaryVectors: "Academic writing, popular science books, mathematical/philosophical discussions",
    requiredResources: "Significant cognitive bandwidth, familiarity with abstract thinking",
    easeOfTransmission: "Relatively difficult due to complexity, but made accessible through metaphors and examples",
    example: "Hofstadter's use of engaging analogies and puzzles to transmit complex mathematical concepts"
  });

  // Insert selection & defense
  await db.insert(selectionDefense).values({
    memeId: missionaryReligions.id,
    environmentalFactors: "Thrives during social upheaval, uncertainty, or cultural transitions",
    defenseMechanisms: "Faith-based epistemology, martyrdom narratives, prophecy fulfillment claims",
    competitiveAdvantage: "Offers comprehensive worldview, community support, eternal rewards",
    example: "Early Christianity absorbing pagan holidays while maintaining core doctrine, making transition easier for converts"
  });

  await db.insert(selectionDefense).values({
    memeId: capitalism.id,
    environmentalFactors: "Thrives in periods of technological innovation and visible prosperity",
    defenseMechanisms: "Attributes failures to government intervention (\"not real capitalism\")",
    competitiveAdvantage: "Aligns with observable patterns of innovation and wealth creation",
    example: "Soviet Union's collapse serving as powerful narrative against alternative systems"
  });

  await db.insert(selectionDefense).values({
    memeId: technoOptimism.id,
    environmentalFactors: "Thrives in periods of visible technological advancement",
    defenseMechanisms: "Points to historical track record of pessimists being wrong",
    competitiveAdvantage: "Offers actionable hope versus defensive pessimism",
    example: "COVID vaccine development speed countering general pessimism about pandemic response"
  });

  await db.insert(selectionDefense).values({
    memeId: strangeLoops.id,
    environmentalFactors: "Thrives in intellectual environments interested in consciousness, AI, mathematics",
    defenseMechanisms: "Its self-referential nature makes it resistant to reductionist criticism",
    competitiveAdvantage: "Provides a unified framework for understanding seemingly disparate phenomena",
    example: "When AI researchers try to disprove consciousness as \"just computation,\" the very act of making that argument becomes a strange loop"
  });

  // Insert evolution pattern
  await db.insert(evolutionPattern).values({
    memeId: missionaryReligions.id,
    mutations: "Denominational splits, cultural adaptations, modernization of practices",
    adaptation: "Incorporation of local customs, translation into new languages and contexts",
    stability: "Core salvation narrative remains while practices evolve",
    example: "Catholicism maintaining core doctrine while allowing indigenous practices in Latin America"
  });

  await db.insert(evolutionPattern).values({
    memeId: capitalism.id,
    mutations: "From mercantilism to industrial to digital/platform capitalism",
    adaptation: "Absorbing critiques through market-based solutions (e.g., intellectual property markets, prediction markets)",
    stability: "Core market mechanism persists while forms of capital/exchange evolve",
    example: "Evolution from physical markets to stock markets to cryptocurrency, each maintaining price discovery while expanding what can be traded"
  });

  await db.insert(evolutionPattern).values({
    memeId: technoOptimism.id,
    mutations: "From mechanical to digital to AI/biotech optimism",
    adaptation: "Absorbs new fields (nanotech, space, longevity) while maintaining core thesis",
    stability: "Progress narrative remains while specific technologies change",
    example: "Evolution from \"computers will augment humans\" to \"AI will augment humans\" - same optimistic frame, new technology"
  });

  await db.insert(evolutionPattern).values({
    memeId: strangeLoops.id,
    mutations: "From pure mathematics to cognitive science to AI theory",
    adaptation: "Has evolved to incorporate new discoveries in neuroscience and artificial intelligence",
    stability: "Core idea of self-reference remains stable while applications expand",
    example: "The concept has evolved from formal systems theory to discussions of artificial consciousness while maintaining its essential character"
  });

  // Insert social network effects
  await db.insert(socialNetworkEffects).values({
    memeId: missionaryReligions.id,
    feedbackLoops: "Converting families creates multi-generational commitment",
    groupIdentity: "Strong in-group bonding through shared beliefs and practices",
    statusDynamics: "Recognition for bringing new converts, leadership roles for effective evangelists",
    example: "Megachurches creating complete social ecosystems: schools, dating pools, business networks"
  });

  await db.insert(socialNetworkEffects).values({
    memeId: capitalism.id,
    feedbackLoops: "Success in capitalism increases belief in the system",
    groupIdentity: "Entrepreneur/investor culture, markets as moral framework",
    statusDynamics: "Wealth and business success as social proof of merit",
    example: "Silicon Valley culture where startup success confers both wealth and moral authority"
  });

  await db.insert(socialNetworkEffects).values({
    memeId: technoOptimism.id,
    feedbackLoops: "Tech success creates wealth which funds more tech development",
    groupIdentity: "Builder culture, solve-it-with-technology mindset",
    statusDynamics: "Being seen as a creator/innovator rather than critic/pessimist",
    example: "Silicon Valley's builder culture where technological solutions are the default answer"
  });

  await db.insert(socialNetworkEffects).values({
    memeId: strangeLoops.id,
    feedbackLoops: "Understanding strange loops often leads to seeing them everywhere, reinforcing the concept",
    groupIdentity: "Creates a shared vocabulary among cognitive scientists, philosophers, and mathematicians",
    statusDynamics: "Mastery of the concept signals intellectual sophistication",
    example: "Communities of Hofstadter readers who share and discuss examples of strange loops they encounter"
  });

  // Insert emotional hooks
  await db.insert(emotionalHooks).values({
    memeId: missionaryReligions.id,
    primaryEmotions: "Fear of damnation, joy of salvation, sense of purpose",
    rewardMechanisms: "Community acceptance, spiritual experiences, answered prayers",
    motivation: "Eternal life, divine approval, cosmic significance",
    example: "The intense emotional experience of \"being saved\" reinforcing belief and motivating evangelism"
  });

  await db.insert(emotionalHooks).values({
    memeId: capitalism.id,
    primaryEmotions: "Hope for personal success, pride in self-reliance, fear of alternatives",
    rewardMechanisms: "Material success, sense of earned achievement",
    motivation: "Personal enrichment aligned with social good",
    example: "Entrepreneur narratives combining personal gain with changing the world for better"
  });

  await db.insert(emotionalHooks).values({
    memeId: technoOptimism.id,
    primaryEmotions: "Wonder at possibilities, excitement about future, disdain for stagnation",
    rewardMechanisms: "Seeing predictions come true, participating in progress",
    motivation: "Being part of humanity's ascent, solving grand challenges",
    example: "SpaceX launches reigniting space age optimism and vision of multi-planetary humanity"
  });

  await db.insert(emotionalHooks).values({
    memeId: strangeLoops.id,
    primaryEmotions: "Wonder, intellectual excitement, the thrill of paradox",
    rewardMechanisms: "\"Aha!\" moments when recognizing new strange loops in unexpected places",
    motivation: "Desire to understand consciousness and self-awareness",
    example: "The profound satisfaction of recognizing how one's own understanding of strange loops is itself a strange loop"
  });

  console.log('Database seeded successfully!');
}

seed().catch(console.error);