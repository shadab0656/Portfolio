// City landing pages for booking searches ("comedian for wedding in Gurugram", "stand-up comedian Noida" ...).
// Each city has its own copy and questions so the pages aren't near-duplicates of each other.
// Only list places Shadab actually takes bookings in.

export const cities = [
  {
    slug: "delhi",
    name: "Delhi",
    group: "ncr",
    state: "Delhi",
    headline: "Stand-up comedian for weddings and events in Delhi",
    intro: [
      "From farmhouse sangeets in Chhatarpur to hotel ballrooms in Aerocity, Delhi does its celebrations big. Shadab Hussain brings live stand-up that fits right into them: a set built around your crowd, so the jokes land with the cousins, the colleagues and the elders in the front row alike.",
      "With more than 2000 shows behind him, Shadab knows how an audience behaves at 10 pm on a wedding night versus 4 pm at an office party, and plans the set around that.",
    ],
    events: [
      ["Weddings and sangeets", "A comedy slot between the dances keeps the energy up and gives both families something to laugh about together."],
      ["Corporate nights", "Annual days, award nights and team dinners at venues across Central and South Delhi."],
      ["College fests", "Cultural fests and freshers' nights across the city's campuses."],
    ],
    areas: ["South Delhi", "Chhatarpur", "Aerocity", "Connaught Place", "Dwarka", "Vasant Kunj", "Rajouri Garden", "Pitampura", "Mayur Vihar"],
    faq: [
      ["Can Shadab perform at a farmhouse wedding in Delhi?", "Yes. Farmhouse sangeets and receptions in Chhatarpur, Mehrauli and along the Delhi border are a regular fit for a stand-up slot. Share the venue in the booking form."],
    ],
  },
  {
    slug: "gurugram",
    name: "Gurugram",
    alt: "Gurgaon",
    group: "ncr",
    state: "Haryana",
    headline: "Book a stand-up comedian in Gurugram (Gurgaon)",
    intro: [
      "Gurugram runs on offices, and offices need a break. Shadab Hussain is a stand-up comedian for corporate events in Gurugram: town halls that need an icebreaker, annual days, team offsites and Friday-evening office parties around Cyber City and Golf Course Road.",
      "He also performs at Gurugram weddings and private parties, where a live comedy set gives guests something to talk about besides the food.",
    ],
    events: [
      ["Corporate events", "Annual days, R&R nights, offsites and office parties. Tell him about the team and he'll keep the material work-friendly."],
      ["Weddings", "Sangeets and receptions at Gurugram's hotels and banquet halls."],
      ["Private parties", "Birthdays and house parties in condos and clubhouses across the city."],
    ],
    areas: ["Cyber City", "Golf Course Road", "Sohna Road", "MG Road", "Udyog Vihar", "Sector 29", "Golf Course Extension Road", "Manesar"],
    faq: [
      ["Can Shadab do a corporate offsite or office party in Gurugram?", "Yes. Mention the size of the team, the format (dinner, town hall, offsite) and anything to steer clear of, and the set is planned around it."],
    ],
  },
  {
    slug: "noida",
    name: "Noida",
    group: "ncr",
    state: "Uttar Pradesh",
    headline: "Stand-up comedian for college fests, corporate and weddings in Noida",
    intro: [
      "Noida mixes IT parks, university campuses and big-fat-wedding banquet halls, and Shadab Hussain plays all three. He started out on the college circuit, so a fest crowd in Noida is home ground.",
      "For companies in Sector 62, Sector 125 and along the Noida Expressway, he does team events and annual days. For families, he brings stand-up to sangeets and receptions.",
    ],
    events: [
      ["College fests", "Cultural fests, freshers' and farewells at Noida's universities and colleges."],
      ["Corporate events", "Team events and annual days for offices across Noida's IT and business hubs."],
      ["Weddings and sangeets", "A comedy set at banquet halls and hotels across the city."],
    ],
    areas: ["Sector 18", "Sector 62", "Noida Expressway", "Sector 125", "Film City", "Sector 50", "Sector 137"],
    faq: [
      ["Does Shadab perform at college fests in Noida?", "Yes. He began on the college circuit and won multiple college comedy competitions, so fests are a natural fit. Student organisers can send the fest dates through the booking form."],
    ],
  },
  {
    slug: "greater-noida",
    name: "Greater Noida",
    group: "ncr",
    state: "Uttar Pradesh",
    headline: "Book a comedian in Greater Noida for fests and celebrations",
    intro: [
      "Greater Noida is packed with campuses around Knowledge Park, and a fest without a comedy act feels incomplete. Shadab Hussain performs at college fests here, as well as at weddings and society events in Greater Noida West.",
      "Events along the Yamuna Expressway and around Pari Chowk are an easy drive from the rest of NCR.",
    ],
    events: [
      ["College fests", "Fests and cultural nights across Knowledge Park's universities and institutes."],
      ["Society and private events", "Festive evenings, society functions and birthday parties in Greater Noida West."],
      ["Weddings", "Sangeets and receptions at banquet halls and resorts in the area."],
    ],
    areas: ["Knowledge Park", "Pari Chowk", "Greater Noida West", "Alpha and Beta sectors", "Yamuna Expressway"],
    faq: [
      ["Can Shadab perform at a residential society event in Greater Noida West?", "Yes. Society festivals and community evenings work well for stand-up. Mention the expected audience size and the age mix when you book."],
    ],
  },
  {
    slug: "ghaziabad",
    name: "Ghaziabad",
    group: "ncr",
    state: "Uttar Pradesh",
    headline: "Stand-up comedian for weddings and parties in Ghaziabad",
    intro: [
      "Ghaziabad's wedding season fills the banquet halls of Raj Nagar and Indirapuram night after night. Shadab Hussain adds a live stand-up set to the celebration, written around the families in the room.",
      "He also does birthday parties, society events and corporate evenings across Indirapuram, Vaishali and Kaushambi.",
    ],
    events: [
      ["Weddings and sangeets", "A comedy slot at the sangeet or reception that gets both sides of the family laughing."],
      ["Birthdays and private parties", "Milestone birthdays and anniversaries at home, in clubhouses or at banquet venues."],
      ["Corporate events", "Office parties and annual days for teams based in Ghaziabad and East Delhi."],
    ],
    areas: ["Indirapuram", "Vaishali", "Kaushambi", "Raj Nagar", "Raj Nagar Extension", "Crossings Republik"],
    faq: [
      ["Can Shadab do a comedy set at a birthday or anniversary party in Ghaziabad?", "Yes. Private parties are a good fit for a short, personal set. Share a few details about the guest of honour and the guests, and the set can include them."],
    ],
  },
  {
    slug: "faridabad",
    name: "Faridabad",
    group: "ncr",
    state: "Haryana",
    headline: "Book a stand-up comedian in Faridabad",
    intro: [
      "From the resorts around Surajkund to banquet halls along the Mathura Road, Faridabad hosts plenty of weddings and corporate events. Shadab Hussain brings stand-up comedy to them, tuned to the crowd in front of him.",
      "He's also available for annual days and family days at Faridabad's offices and plants, where the audience ranges from interns to the founders' parents.",
    ],
    events: [
      ["Weddings", "Sangeets and receptions at Faridabad's resorts and banquet halls."],
      ["Corporate and family days", "Annual functions for offices and plants, where the jokes have to work for every age."],
      ["Private parties", "Birthdays and celebrations across the city's sectors."],
    ],
    areas: ["Surajkund", "Sector 15", "NIT Faridabad", "Greater Faridabad (Neharpar)", "Mathura Road", "Ballabgarh"],
    faq: [
      ["Can Shadab perform at a resort wedding near Surajkund?", "Yes. Resort weddings around Surajkund are an easy drive from the rest of NCR. Add the venue and the event date in the booking form."],
    ],
  },
  {
    slug: "meerut",
    name: "Meerut",
    group: "nearby",
    state: "Uttar Pradesh",
    headline: "Stand-up comedian for weddings and events in Meerut",
    intro: [
      "With the Delhi–Meerut Expressway, Meerut is close enough to book a Delhi NCR comedian without the long-trip hassle. Shadab Hussain performs at Meerut weddings, college fests and private celebrations.",
      "A wedding in Meerut usually means a big, lively family crowd. That's exactly the room his set is built for.",
    ],
    events: [
      ["Weddings and sangeets", "A stand-up set that keeps the whole baraat and ghar-waale laughing."],
      ["College fests", "Fests and cultural events at Meerut's universities and colleges."],
      ["Private parties", "Birthdays, anniversaries and family functions."],
    ],
    areas: ["Meerut Cantt", "Delhi Road", "Shastri Nagar", "Pallavpuram", "Modipuram"],
    faq: [
      ["Does Shadab travel from Delhi NCR to Meerut for events?", "Yes. Meerut is one of the nearby cities he takes bookings in. Travel is discussed along with the date and set details when you get in touch."],
    ],
  },
  {
    slug: "sonipat",
    name: "Sonipat",
    group: "nearby",
    state: "Haryana",
    headline: "Book a comedian in Sonipat for college fests and celebrations",
    intro: [
      "Sonipat's Education City is home to some of the region's best-known universities, and their fests draw big crowds. Shadab Hussain, who cut his teeth on the college comedy circuit, is a natural pick for a fest line-up.",
      "He also performs at weddings and private parties around Kundli, Murthal and the city.",
    ],
    events: [
      ["College fests", "Cultural fests and student events at the universities around Rai and Education City."],
      ["Weddings", "Sangeets and receptions in Sonipat and along the GT Road."],
      ["Private parties", "Birthdays and celebrations around the city."],
    ],
    areas: ["Education City (Rai)", "Kundli", "Murthal", "Sonipat city", "GT Road"],
    faq: [
      ["Can student organisers book Shadab for a university fest in Sonipat?", "Yes. Send the fest name, dates and the slot you have in mind through the booking form, and he'll reply about availability."],
    ],
  },
  {
    slug: "panipat",
    name: "Panipat",
    group: "nearby",
    state: "Haryana",
    headline: "Stand-up comedian for weddings and parties in Panipat",
    intro: [
      "Panipat weddings are big family affairs, and a stand-up set is a fresh addition to the usual line-up. Shadab Hussain performs in Panipat for sangeets, receptions and private celebrations.",
      "Companies and business families in the city can also book him for annual functions and dealer meets.",
    ],
    events: [
      ["Weddings and sangeets", "A live comedy slot for the sangeet or reception."],
      ["Corporate and dealer meets", "Annual functions and business events that need a lighter moment."],
      ["Private parties", "Milestone birthdays and anniversaries."],
    ],
    areas: ["Model Town", "GT Road", "Samalkha", "Panipat city"],
    faq: [
      ["Can Shadab perform at a dealer meet or business event in Panipat?", "Yes. Share the audience and the format, and the set is planned around them."],
    ],
  },
  {
    slug: "jaipur",
    name: "Jaipur",
    group: "nearby",
    state: "Rajasthan",
    headline: "Book a stand-up comedian for a destination wedding in Jaipur",
    intro: [
      "Jaipur is where Delhi NCR goes for a destination wedding, and a two- or three-day celebration needs more than one kind of entertainment. Shadab Hussain brings a stand-up set to Jaipur weddings, often as a welcome-night or sangeet act.",
      "He also performs for corporate offsites and conferences held at Jaipur's heritage hotels and resorts.",
    ],
    events: [
      ["Destination weddings", "A comedy set for the welcome dinner, mehendi evening or sangeet."],
      ["Corporate offsites", "Conference evenings and team retreats at Jaipur's resorts."],
      ["Private celebrations", "Milestone birthdays and anniversaries."],
    ],
    areas: ["Amer", "Delhi Road", "Ajmer Road", "C-Scheme", "Malviya Nagar", "Jagatpura"],
    faq: [
      ["Can Shadab perform at a destination wedding in Jaipur?", "Yes. Destination weddings in Jaipur are a good fit, especially for the welcome night or sangeet. Share the event schedule and venue so travel can be planned."],
    ],
  },
  {
    slug: "chandigarh",
    name: "Chandigarh",
    group: "nearby",
    state: "Chandigarh",
    headline: "Stand-up comedian for weddings and events in Chandigarh Tricity",
    intro: [
      "Chandigarh, Mohali and Panchkula love a good party, and Punjabi weddings set the bar high for entertainment. Shadab Hussain brings his stand-up set to Tricity weddings, corporate events and college fests.",
      "Whether it's a sangeet in Zirakpur or an annual day in Mohali's IT parks, the set is planned around the crowd.",
    ],
    events: [
      ["Weddings and sangeets", "A stand-up slot that holds its own next to the dhol."],
      ["Corporate events", "Annual days and team events for companies across Mohali and Chandigarh."],
      ["College fests", "Fests at the universities and colleges around the Tricity."],
    ],
    areas: ["Chandigarh", "Mohali", "Panchkula", "Zirakpur", "Kharar"],
    faq: [
      ["Does Shadab take bookings in Mohali and Panchkula too?", "Yes. Bookings cover the whole Tricity: Chandigarh, Mohali, Panchkula and nearby Zirakpur."],
    ],
  },
];

export const ncrCities = cities.filter((c) => c.group === "ncr");
export const nearbyCities = cities.filter((c) => c.group === "nearby");
export const getCity = (slug) => cities.find((c) => c.slug === slug);
export const cityPath = (c) => `/book-comedian/${c.slug}`;

// Booking questions shared by every city page (the city's own questions are added first)
export function cityFaq(city) {
  return [
    ...city.faq,
    [
      `How much does it cost to book Shadab Hussain in ${city.name}?`,
      `Fees depend on the date, the type of event, the set length and travel. Send your details through the booking form and Shadab will reply with availability and a quote for your ${city.name} event.`,
    ],
    [
      "How far in advance should I book?",
      "As early as you can, especially for dates in the wedding season. Weekend evenings get booked first, so get in touch as soon as you have a date.",
    ],
    [
      "How long is the set, and can it be adjusted?",
      "Set length is flexible and agreed when you book, based on your event's schedule and where the comedy slot sits in it.",
    ],
    [
      "Can the comedy be adapted to my audience?",
      "Yes. Mention who will be in the room (family, colleagues, students, mixed ages) when you book, and the set is planned around them.",
    ],
  ];
}

// Questions for the homepage FAQ
export const homeFaq = [
  [
    "How do I book Shadab Hussain for an event?",
    "Fill in the booking form on this page with your name, contact, event type, city and date. Shadab replies about availability and fees. You can also email jokekarshadab@gmail.com.",
  ],
  [
    "Which cities does Shadab Hussain perform in?",
    `Across Delhi NCR (Delhi, Gurugram, Noida, Greater Noida, Ghaziabad and Faridabad) and nearby cities including Meerut, Sonipat, Panipat, Jaipur and Chandigarh. For other cities, mention the location in the booking form.`,
  ],
  [
    "What kinds of events does he perform at?",
    "Weddings and sangeets, corporate events and annual days, college fests, birthdays and private parties.",
  ],
  [
    "How much does it cost to hire a stand-up comedian for a wedding or corporate event?",
    "Fees depend on the date, the city, the type of event, the set length and travel. Share your event details through the booking form to get a quote.",
  ],
  [
    "Can the set be adapted for a family or corporate audience?",
    "Yes. Tell him who will be in the audience when you book, whether that's three generations of family or a room full of colleagues, and the set is planned around them.",
  ],
  [
    "How early should I book for the wedding season?",
    "As early as possible. Weekend dates during the wedding season are the first to go, so send a request as soon as your date is fixed.",
  ],
];
