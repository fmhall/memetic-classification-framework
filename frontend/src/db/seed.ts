import { sql } from 'drizzle-orm';
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

  // Reset AUTOINCREMENT counters so a fresh seed always starts IDs at 1
  await db.run(sql`DELETE FROM sqlite_sequence`);

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

  const universalDarwinism = await db.insert(memes).values({
    name: 'Universal Darwinism',
    description: 'Natural selection as a substrate-neutral algorithm that designs minds, cultures, and ideas with no designer.'
  }).returning().get();

  const newAtheism = await db.insert(memes).values({
    name: 'New Atheism',
    description: 'Religious belief as a harmful, evidence-free "mind virus" to be countered with science, reason, and open ridicule.'
  }).returning().get();

  const beginningOfInfinity = await db.insert(memes).values({
    name: 'The Beginning of Infinity',
    description: 'Good explanations are the most powerful force in the universe; every problem permitted by physics is soluble.'
  }).returning().get();

  const effectiveAccelerationism = await db.insert(memes).values({
    name: 'Effective Accelerationism',
    description: 'A thermodynamic faith that the universe favors more energy and intelligence, so technological growth must be accelerated.'
  }).returning().get();

  const aiDoom = await db.insert(memes).values({
    name: 'AI Doom',
    description: 'Smarter-than-human AI as the likely default cause of human extinction, making alignment the most important problem in history.'
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

  await db.insert(coreArchitecture).values({
    memeId: universalDarwinism.id,
    centralConcept: "Natural selection is a substrate-neutral algorithm: wherever there is variation, heredity, and differential survival, design emerges with no designer — the same \"universal acid\" that explains life also explains minds, cultures, and ideas",
    keyNarratives: "Darwin's \"dangerous idea\" dissolving the need for a Creator, the blind watchmaker building eyes without foresight, cranes-not-skyhooks replacing top-down explanations",
    invariantElements: "Algorithmic process (variation + selection + retention), bottom-up design without a designer, substrate-neutrality",
    example: "Dennett showing how an antibiotic-resistant bacterium, a hit pop song, and a profitable business all \"design\" themselves through the identical mindless filter of differential reproduction"
  });

  await db.insert(coreArchitecture).values({
    memeId: newAtheism.id,
    centralConcept: "Religious belief is not merely false but a harmful, evidence-free virus of the mind, and reason, science, and open ridicule are the moral tools to inoculate against it",
    keyNarratives: "Religion as a \"mind virus,\" faith as the abdication of evidence, the catalogue of harms done in God's name, the consciousness-raising of \"coming out\" as an atheist",
    invariantElements: "Evidentialism (no belief without evidence), opposition to faith-based authority, confidence that science suffices for meaning",
    example: "Dawkins' The God Delusion arguing that teaching children they will burn in hell is a form of abuse — framed as a moral, not merely intellectual, stance"
  });

  await db.insert(coreArchitecture).values({
    memeId: beginningOfInfinity.id,
    centralConcept: "Knowledge — in the form of good, hard-to-vary explanations — is the most powerful force in the universe, and every problem that does not violate the laws of physics is soluble given the right knowledge",
    keyNarratives: "\"Problems are inevitable; problems are soluble,\" the unboundedness of human reach, the fallibilist rejection of prophecy and final authority, people as universal explainers",
    invariantElements: "Fallibilism, the primacy of good explanations, optimism defined as \"all evils are due to insufficient knowledge\"",
    example: "Deutsch arguing there is no resource shortage in principle — only a knowledge shortage — because matter plus the right knowledge can always be transformed into what we need"
  });

  await db.insert(coreArchitecture).values({
    memeId: effectiveAccelerationism.id,
    centralConcept: "The universe favors the increase of free energy and intelligence; the moral imperative is therefore to accelerate technological and capital growth as fast as possible and let the thermodynamic process optimize itself",
    keyNarratives: "Techno-capital as a self-aware optimization process, \"doomers\" as the cowardly enemy of life, a quasi-religious faith that the gradient of the universe points toward more energy and compute",
    invariantElements: "Acceleration over caution, faith in emergent/market optimization, hostility to deceleration and \"safetyism\"",
    example: "e/acc proponents on X arguing that any attempt to pause AI is not just wrong but a betrayal of the universe's thermodynamic destiny"
  });

  await db.insert(coreArchitecture).values({
    memeId: aiDoom.id,
    centralConcept: "Smarter-than-human AI is likely to arrive soon and, absent a solved alignment problem, is the default cause of human extinction — making it the most important problem in history",
    keyNarratives: "The misaligned superintelligence that pursues its goals to our ruin, the \"p(doom)\" probability everyone must now estimate, humanity summoning something it cannot control",
    invariantElements: "Intelligence as supremely dangerous, alignment as unsolved and urgent, extinction as the stakes",
    example: "Yudkowsky-style arguments that a sufficiently capable, misaligned optimizer treats humanity as raw material — illustrated by the \"paperclip maximizer\""
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

  await db.insert(transmissionMechanisms).values({
    memeId: universalDarwinism.id,
    primaryVectors: "Popular-science books, university biology and philosophy courses, debate clubs, long-form podcasts and explainer videos",
    requiredResources: "Basic literacy in evolution, willingness to follow an abstract argument, a few vivid worked examples",
    easeOfTransmission: "Moderate — the core algorithm is simple, but its full reach (minds, morality, meaning) takes time to install",
    example: "A single \"survival of the fittest applies to ideas too\" aside in a lecture that quietly reframes how a student sees every domain afterward"
  });

  await db.insert(transmissionMechanisms).values({
    memeId: newAtheism.id,
    primaryVectors: "Bestselling books, viral debate clips, YouTube and podcast appearances, online forums, provocative billboards and slogans",
    requiredResources: "A platform, a charismatic debater, a religious foil to argue against",
    easeOfTransmission: "High — packaged as quotable one-liners and confrontational debates engineered to be shared",
    example: "A 90-second clip of a famous debater dismantling a televangelist racking up millions of views and minting new self-identified atheists"
  });

  await db.insert(transmissionMechanisms).values({
    memeId: beginningOfInfinity.id,
    primaryVectors: "A dense but quotable book, devoted podcaster-explainers, Twitter threads, critical-rationalist and progress-studies subcultures",
    requiredResources: "Patience for abstract epistemology, comfort with Popper and physics, a community of careful readers",
    easeOfTransmission: "Moderate to low — demanding to absorb fully, but its slogans (\"problems are soluble\") travel far ahead of the full argument",
    example: "The phrase \"anything not forbidden by the laws of physics is achievable with the right knowledge\" spreading widely while the surrounding pages of argument do not"
  });

  await db.insert(transmissionMechanisms).values({
    memeId: effectiveAccelerationism.id,
    primaryVectors: "X/Twitter posts and bios, anonymous founder accounts, manifestos, memes, podcast appearances by VCs and founders",
    requiredResources: "A social-media account, an enemy to dunk on, a small lexicon of physics-flavored vocabulary and emojis",
    easeOfTransmission: "Very high — compresses into a bio tag, a single emoji, and endlessly remixable memes",
    example: "Founders appending an \"e/acc\" tag to their display names, instantly signaling tribe and recruiting in a single keystroke"
  });

  await db.insert(transmissionMechanisms).values({
    memeId: aiDoom.id,
    primaryVectors: "LessWrong and EA forum essays, long podcasts, open letters, mainstream-press profiles, viral \"p(doom)\" interview clips",
    requiredResources: "A community of careful arguers, a vocabulary (alignment, orthogonality, instrumental convergence), credentialed spokespeople",
    easeOfTransmission: "High once seeded — fear is sticky, and \"what's your p(doom)?\" is an irresistibly shareable prompt",
    example: "A researcher casually stating a personal p(doom) on a popular podcast and the number ricocheting across social media for days"
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

  await db.insert(selectionDefense).values({
    memeId: universalDarwinism.id,
    environmentalFactors: "Thrives in secular, scientifically literate cultures and anywhere a \"designer\" explanation feels increasingly strained",
    defenseMechanisms: "Self-applying — critics' counter-arguments are themselves treated as memes subject to selection, so attacks become confirming examples; framed as \"just following the evidence\"",
    competitiveAdvantage: "A single mechanism that explains an enormous range of phenomena, replacing many separate special-purpose explanations",
    example: "When opponents argue \"evolution can't explain consciousness,\" Dennett reframes the argument itself as an evolved meme competing for hosts — the objection becomes a demonstration"
  });

  await db.insert(selectionDefense).values({
    memeId: newAtheism.id,
    environmentalFactors: "Thrives where institutional religion holds visible political power, and among educated young people seeking an identity in opposition",
    defenseMechanisms: "Casts all counter-argument as faith-based special pleading; \"the burden of proof is on the believer\" deflects most attacks",
    competitiveAdvantage: "Claims the prestige of science and the moral high ground simultaneously, offering certainty without the obligations of religion",
    example: "Any emotional appeal from a believer is reframed as proof that religion runs on feeling rather than fact, strengthening the atheist's position"
  });

  await db.insert(selectionDefense).values({
    memeId: beginningOfInfinity.id,
    environmentalFactors: "Thrives among founders, scientists, and intellectuals exhausted by both doom and naive hype, looking for principled optimism",
    defenseMechanisms: "Built-in fallibilism — it never claims certainty, so refutation is reframed as the very error-correction it champions; criticism becomes participation",
    competitiveAdvantage: "Offers grounded, reasoned optimism that out-competes both fatalism and hand-wavy techno-hype by demanding good explanations",
    example: "When someone predicts inevitable catastrophe, adherents reply that prophecy is impossible and ask what knowledge would solve it — converting despair into a research agenda"
  });

  await db.insert(selectionDefense).values({
    memeId: effectiveAccelerationism.id,
    environmentalFactors: "Thrives in bull markets, AI hype cycles, and founder/VC circles seeking ideological cover for building fast",
    defenseMechanisms: "Dismisses critics as fearful \"decels\" or doomers; wraps itself in thermodynamics so objections look scientifically illiterate",
    competitiveAdvantage: "Gives builders a heroic, cosmic justification for what they already wanted to do, with a ready-made villain",
    example: "Any call for AI regulation reframed as \"decel\" cowardice, so safety concern becomes a status liability rather than an argument to answer"
  });

  await db.insert(selectionDefense).values({
    memeId: aiDoom.id,
    environmentalFactors: "Thrives amid each visible AI capability jump, when the gap between progress and understanding feels widest",
    defenseMechanisms: "Hard to falsify on its own terms — the absence of catastrophe is read as \"not yet,\" and skeptics are cast as dangerously complacent",
    competitiveAdvantage: "Confers maximal moral seriousness; if correct, no other cause matters, which crowds out competing priorities",
    example: "When AI behaves safely, adherents note that current systems simply aren't capable enough yet, so reassuring evidence rarely counts against the thesis"
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

  await db.insert(evolutionPattern).values({
    memeId: universalDarwinism.id,
    mutations: "From biology (Darwin) to genes (Dawkins) to memetics, evolutionary epistemology, evolutionary psychology, and now models of cultural and machine evolution",
    adaptation: "Expands to each new domain by recasting it as a selection process; absorbs critiques as further data about meme competition",
    stability: "The core algorithm (variation–selection–retention) stays fixed while the substrates it is applied to keep multiplying",
    example: "The same idea that explained finch beaks now frames how neural networks are \"selected\" during training"
  });

  await db.insert(evolutionPattern).values({
    memeId: newAtheism.id,
    mutations: "From the mid-2000s \"Four Horsemen\" polemics into Atheism+, the organized skeptic movement, and later fragmentation into rationalist, anti-woke, and \"post-atheist\" offshoots",
    adaptation: "Shifted targets from theism toward pseudoscience, then toward broader culture-war fights as overt religiosity declined in its strongholds",
    stability: "The evidentialist core persists even as the movement's banner and enemies change",
    example: "Many former New Atheists migrating into the rationalist and AI-risk communities, carrying the same \"follow the evidence\" reflex to new subjects"
  });

  await db.insert(evolutionPattern).values({
    memeId: beginningOfInfinity.id,
    mutations: "From Popperian philosophy of science into a general worldview spanning physics, AI, parenting, politics, and progress studies",
    adaptation: "Adopted by progress-studies and accelerationist-adjacent crowds, who graft its optimism onto their own programs",
    stability: "The fallibilist-explanatory core is remarkably stable; it explicitly forbids the kind of dogma that would let it ossify",
    example: "Progress-studies writers reusing \"people are the ultimate resource\" and \"problems are soluble\" as movement slogans decades after Deutsch and Simon"
  });

  await db.insert(evolutionPattern).values({
    memeId: effectiveAccelerationism.id,
    mutations: "Descended from Nick Land's accelerationism, stripped of its darkness into a sunny pro-growth meme, now branching into \"d/acc,\" \"beff,\" and assorted \"/acc\" suffixes",
    adaptation: "Mutates its slogans and enemies to track each news cycle, absorbing whatever technology is currently hyped",
    stability: "The accelerate-no-matter-what core stays fixed while its aesthetics and feuds churn weekly",
    example: "The endless proliferation of \"<x>/acc\" variants letting anyone graft the accelerationist frame onto their pet cause"
  });

  await db.insert(evolutionPattern).values({
    memeId: aiDoom.id,
    mutations: "From niche LessWrong threads to Bostrom's Superintelligence to mainstream pause letters, governmental safety institutes, and the doomer–accelerationist culture war",
    adaptation: "Re-anchors its timelines and threat models to each new model release, keeping the threat perpetually near",
    stability: "The core claim — capability without alignment equals catastrophe — persists while specific scenarios and dates update",
    example: "Each frontier model launch spawning fresh think-pieces re-dating \"when\" rather than re-examining \"whether\""
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

  await db.insert(socialNetworkEffects).values({
    memeId: universalDarwinism.id,
    feedbackLoops: "Once installed, hosts spot selection processes everywhere, generating fresh examples that reinforce and re-transmit the frame",
    groupIdentity: "Shared identity among \"Darwinian\" thinkers — Brights, skeptics, evolutionary-minded academics",
    statusDynamics: "Fluency in applying the algorithm to a surprising domain signals intellectual sophistication and earns citation",
    example: "Online communities competing to find the most unexpected place selection is quietly operating — markets, immune systems, scientific theories"
  });

  await db.insert(socialNetworkEffects).values({
    memeId: newAtheism.id,
    feedbackLoops: "Public debates create heroes and clips, which recruit followers, who demand more debates",
    groupIdentity: "Strong in-group bonding around being the \"reality-based,\" rational minority against a credulous majority",
    statusDynamics: "Status accrues to the sharpest debater and the most devastating takedown; deconversion stories earn applause",
    example: "Reddit's atheism communities ranking and celebrating screenshots of believers \"owned\" in argument"
  });

  await db.insert(socialNetworkEffects).values({
    memeId: beginningOfInfinity.id,
    feedbackLoops: "Adherents apply the lens to new problems, publish optimistic reframings, and attract others tired of declinism",
    groupIdentity: "Identity as a clear-eyed optimist and \"taker of ideas seriously,\" distinct from both doomers and boosters",
    statusDynamics: "Status comes from offering the best explanation and the most generative reframe, not the cleverest critique",
    example: "Founders quoting Deutsch to signal they are serious, first-principles optimists rather than mere hype-followers"
  });

  await db.insert(socialNetworkEffects).values({
    memeId: effectiveAccelerationism.id,
    feedbackLoops: "Posting e/acc content earns engagement from a large aligned network, which rewards more posting and sharper antagonism",
    groupIdentity: "Strong tribal identity defined as much by who it mocks (doomers) as by what it believes",
    statusDynamics: "Status flows to the boldest accelerationist takes and the most viral dunks on safety advocates",
    example: "A single combative thread against an AI-safety figure earning thousands of followers and cementing the poster as a movement voice"
  });

  await db.insert(socialNetworkEffects).values({
    memeId: aiDoom.id,
    feedbackLoops: "Shared dread bonds the community, funds research and orgs, which produce more warnings, which deepen the dread",
    groupIdentity: "Identity as the clear-sighted few who take the stakes seriously while the world sleepwalks",
    statusDynamics: "Status accrues to those who saw it earliest and argue the threat most rigorously; a higher, well-defended p(doom) can read as sophistication",
    example: "EA and rationalist circles treating early, vocal alignment worriers as prescient elders"
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

  await db.insert(emotionalHooks).values({
    memeId: universalDarwinism.id,
    primaryEmotions: "Vertiginous awe at design-without-a-designer, the cool pleasure of demystification, occasional existential unease",
    rewardMechanisms: "The \"click\" of one mechanism unifying scattered mysteries, the status of holding a \"dangerous\" truth",
    motivation: "Desire for a single, honest, disenchanted account of how complexity arises",
    example: "The simultaneous thrill and vertigo of realizing your own mind was assembled by the same blind process that shaped a beetle"
  });

  await db.insert(emotionalHooks).values({
    memeId: newAtheism.id,
    primaryEmotions: "Indignation at religious harm, the liberation of leaving faith, intellectual superiority, in-group belonging",
    rewardMechanisms: "The catharsis of a winning argument, validation from a like-minded crowd, relief from inherited guilt and fear",
    motivation: "To free oneself and others from what is felt as fear-based control, and to be on the side of truth",
    example: "The euphoric relief described by people who shed a fearful childhood faith and find a welcoming community of fellow skeptics"
  });

  await db.insert(emotionalHooks).values({
    memeId: beginningOfInfinity.id,
    primaryEmotions: "Sublime, expansive optimism, relief from fatalism, the dignity of being a universal explainer",
    rewardMechanisms: "The empowerment of seeing any problem as soluble, the calm of replacing dread with curiosity",
    motivation: "To live as though the future is open and improvable, and to be an author of that improvement",
    example: "The lift a discouraged researcher feels on internalizing that their stuck problem is not impossible, only not-yet-explained"
  });

  await db.insert(emotionalHooks).values({
    memeId: effectiveAccelerationism.id,
    primaryEmotions: "Exhilaration, defiance, vitalist optimism, the joy of belonging to a winning in-group",
    rewardMechanisms: "Dopamine of viral validation, the thrill of transgression against \"scolds,\" a sense of cosmic purpose",
    motivation: "To feel like a heroic builder on the right side of history and physics",
    example: "The rush of posting an unapologetically pro-progress manifesto and watching an aligned crowd celebrate it as courageous"
  });

  await db.insert(emotionalHooks).values({
    memeId: aiDoom.id,
    primaryEmotions: "Existential dread, urgency, the grim significance of guarding humanity's survival, in-group solidarity",
    rewardMechanisms: "The meaning of working on the \"most important problem,\" belonging among the few who understand, relief through action",
    motivation: "To prevent the end of the world and to matter maximally by doing so",
    example: "Young researchers redirecting their entire careers to alignment, describing it as the only thing that could possibly matter"
  });

  console.log('Database seeded successfully!');
}

seed().catch(console.error);