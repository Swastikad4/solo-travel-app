// Sample destination data so the app works without MongoDB
const destinations = {
  paris: {
    name: "Paris",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    description: "The City of Light captivates solo travelers with its romantic boulevards, world-class art, and charming cafés.",
    famousPlaces: [
      "Eiffel Tower",
      "Louvre Museum",
      "Notre-Dame Cathedral",
      "Montmartre & Sacré-Cœur",
      "Champs-Élysées",
      "Seine River Cruise"
    ],
    thingsToDo: [
      "Explore hidden bookshops in the Latin Quarter",
      "Enjoy a solo picnic at Luxembourg Gardens",
      "Visit the Musée d'Orsay for Impressionist art",
      "Wander through Le Marais neighborhood",
      "Try authentic croissants at a local boulangerie",
      "Take a day trip to Versailles"
    ],
    bestTime: "April to June & September to November",
    safetyRating: 4.2,
    soloScore: 9.1,
    avgBudget: "$80-150/day",
    language: "French",
    currency: "Euro (€)"
  },
  tokyo: {
    name: "Tokyo",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
    description: "A mesmerizing blend of ultra-modern technology and ancient traditions, perfect for adventurous solo travelers.",
    famousPlaces: [
      "Senso-ji Temple",
      "Shibuya Crossing",
      "Meiji Shrine",
      "Tokyo Skytree",
      "Tsukiji Outer Market",
      "Akihabara Electric Town"
    ],
    thingsToDo: [
      "Experience a traditional tea ceremony",
      "Explore Harajuku street fashion scene",
      "Eat ramen at a solo-friendly counter restaurant",
      "Visit the serene Shinjuku Gyoen Garden",
      "Take a day trip to Mount Fuji",
      "Discover hidden izakayas in Golden Gai"
    ],
    bestTime: "March to May & September to November",
    safetyRating: 4.9,
    soloScore: 9.5,
    avgBudget: "$70-130/day",
    language: "Japanese",
    currency: "Yen (¥)"
  },
  bali: {
    name: "Bali",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
    description: "Indonesia's paradise island offers solo travelers spiritual retreats, stunning beaches, and vibrant culture.",
    famousPlaces: [
      "Uluwatu Temple",
      "Tegallalang Rice Terraces",
      "Tanah Lot Temple",
      "Ubud Monkey Forest",
      "Seminyak Beach",
      "Mount Batur"
    ],
    thingsToDo: [
      "Join a sunrise hike on Mount Batur",
      "Take a yoga class in Ubud",
      "Surf the waves at Canggu Beach",
      "Visit the Tirta Empul water temple",
      "Explore Ubud's art galleries",
      "Enjoy a traditional Balinese massage"
    ],
    bestTime: "April to October",
    safetyRating: 4.0,
    soloScore: 8.8,
    avgBudget: "$30-70/day",
    language: "Indonesian",
    currency: "Rupiah (IDR)"
  },
  london: {
    name: "London",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
    description: "A cosmopolitan capital rich in history, culture, and endless solo exploration opportunities.",
    famousPlaces: [
      "Big Ben & Houses of Parliament",
      "Tower of London",
      "British Museum",
      "Buckingham Palace",
      "Camden Market",
      "The South Bank"
    ],
    thingsToDo: [
      "Walk along the South Bank at sunset",
      "Explore free museums in Kensington",
      "Have afternoon tea at a classic tea room",
      "Catch a show in the West End",
      "Browse Borough Market for street food",
      "Take a walking tour of Harry Potter filming locations"
    ],
    bestTime: "May to September",
    safetyRating: 4.3,
    soloScore: 9.0,
    avgBudget: "$90-170/day",
    language: "English",
    currency: "Pound Sterling (£)"
  },
  bangkok: {
    name: "Bangkok",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800",
    description: "Thailand's vibrant capital offers solo travelers incredible street food, ornate temples, and bustling nightlife.",
    famousPlaces: [
      "Grand Palace",
      "Wat Arun",
      "Chatuchak Weekend Market",
      "Khao San Road",
      "Wat Pho",
      "Jim Thompson House"
    ],
    thingsToDo: [
      "Take a long-tail boat through the canals",
      "Explore the street food scene on Yaowarat Road",
      "Get a traditional Thai massage",
      "Visit floating markets outside the city",
      "Take a cooking class",
      "Watch a Muay Thai fight"
    ],
    bestTime: "November to February",
    safetyRating: 3.8,
    soloScore: 8.5,
    avgBudget: "$25-55/day",
    language: "Thai",
    currency: "Baht (฿)"
  },
  iceland: {
    name: "Iceland",
    image: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800",
    description: "A land of fire and ice, Iceland is one of the safest and most awe-inspiring solo travel destinations on Earth.",
    famousPlaces: [
      "Blue Lagoon",
      "Golden Circle Route",
      "Jökulsárlón Glacier Lagoon",
      "Skógafoss Waterfall",
      "Reynisfjara Black Sand Beach",
      "Hallgrímskirkja Church"
    ],
    thingsToDo: [
      "Drive the Ring Road on a solo road trip",
      "Chase the Northern Lights",
      "Snorkel between tectonic plates at Silfra",
      "Hike on a glacier",
      "Soak in natural hot springs",
      "Whale watching from Húsavík"
    ],
    bestTime: "June to August (summer) or Sept to March (Northern Lights)",
    safetyRating: 4.9,
    soloScore: 9.3,
    avgBudget: "$120-200/day",
    language: "Icelandic",
    currency: "Króna (ISK)"
  }
};

const sampleTrips = {
  paris: [
    { _id: "t1", userId: "Solo Explorer", destination: "Paris", startDate: "2026-06-10", endDate: "2026-06-18", notes: "First time in Paris! Looking for museum buddies." },
    { _id: "t2", userId: "Wanderlust Amy", destination: "Paris", startDate: "2026-06-14", endDate: "2026-06-20", notes: "Foodie trip — let's explore bistros together!" },
    { _id: "t3", userId: "BackpackerJoe", destination: "Paris", startDate: "2026-07-01", endDate: "2026-07-10", notes: "Budget traveler, open to sharing tips." }
  ],
  tokyo: [
    { _id: "t4", userId: "TechNomad", destination: "Tokyo", startDate: "2026-05-15", endDate: "2026-05-25", notes: "Anime & tech enthusiast looking for travel mates." },
    { _id: "t5", userId: "ZenSeeker", destination: "Tokyo", startDate: "2026-05-20", endDate: "2026-05-30", notes: "Temple hopping and tea ceremonies." }
  ],
  bali: [
    { _id: "t6", userId: "YogaNomad", destination: "Bali", startDate: "2026-08-01", endDate: "2026-08-15", notes: "Yoga retreat in Ubud, anyone?" },
    { _id: "t7", userId: "SurfDude", destination: "Bali", startDate: "2026-08-05", endDate: "2026-08-12", notes: "Catching waves in Canggu!" }
  ],
  london: [
    { _id: "t8", userId: "HistoryBuff", destination: "London", startDate: "2026-07-10", endDate: "2026-07-20", notes: "Museum marathon planned!" }
  ],
  bangkok: [
    { _id: "t9", userId: "FoodieExplorer", destination: "Bangkok", startDate: "2026-09-01", endDate: "2026-09-10", notes: "Street food tour — who's in?" },
    { _id: "t10", userId: "TempleRunner", destination: "Bangkok", startDate: "2026-09-05", endDate: "2026-09-15", notes: "Exploring all the temples!" }
  ],
  iceland: [
    { _id: "t11", userId: "AuroraChaser", destination: "Iceland", startDate: "2026-10-01", endDate: "2026-10-10", notes: "Northern Lights road trip!" }
  ]
};

module.exports = { destinations, sampleTrips };
