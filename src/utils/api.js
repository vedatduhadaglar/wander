const API_KEY = import.meta.env.VITE_OPENAI_KEY;
const GMAPS_API_KEY = import.meta.env.VITE_GMAPS_KEY;

export function getDestination(searchValue, setDestinationName, setImage) {
  return new Promise((resolve, reject) => {
    const request = {
      query: searchValue,
      fields: ["photos"],
      key: GMAPS_API_KEY,
    };

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const city = results[0]?.name;
        const photo = results[0]?.photos[0]?.getUrl();
        setDestinationName(city);
        setImage(photo || "");
        resolve(city);
      } else {
        reject(new Error("Failed to get destination."));
      }
    });
  });
}

export async function getTravelPlan(
  durationValue,
  destinationName,
  setResponseMessage
) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Create a ${durationValue} day itinerary travel plan to ${destinationName}. here is the example format i want: Day 1: Exploring the City, then put each activity in a new line. Here is the example format: "Day 1: Exploring the City (summary of the day)
- Start with a visit to the iconic Independence Square (Maidan Nezalezhnosti) and learn about its historical significance
- Take a stroll along Khreshchatyk Street, the main thoroughfare of Kyiv, and soak up the vibrant atmosphere
- Head to St. Sophia's Cathedral, a breathtaking UNESCO World Heritage Site with stunning mosaics and frescoes 
- Next up, explore the Golden Gate of Kyiv, an ancient fortification and gateway to the city 
- End the day with a leisurely walk in the beautiful Kyiv Botanical Garden 

Day 2: Cultural Immersion 
- Start the day with a visit to the National Museum of Ukraine, showcasing the rich history and culture of the country 
- Head to the legendary Kyiv Pechersk Lavra, a stunning monastery complex with cave churches, stunning architecture, and a beautiful view of the city 
- Enjoy a traditional Ukrainian lunch at a local restaurant 
- In the afternoon, explore the Andriyivskyi Uzviz, a charming cobblestone street lined with galleries, souvenir shops, and cafes 
- Wrap up the day with a performance at the National Opera of Ukraine, a beautiful building and a cultural institution of the city 
At the end do a budget estimation for based on accomodation, eating etc. Here is an example:
Budget Estimation
- Accommodation: On average, budget accommodation in Eskilstuna ranges from $60 to $100 per night.
- Eating: Budget around $20 to $40 per day for meals, including breakfast, lunch, and dinner.
- Activities: Entrance fees for museums and attractions range from $5 to $15 per person.
- Transportation: Public transportation within Eskilstuna is affordable, with single tickets costing around $2 to $5. Additional costs may be incurred for bike rentals and boat tours.
- Overall, a 3-day trip to Eskilstuna can be estimated to cost between $200 and $500, depending on your accommodation and dining preferences.
`,
          },
        ],
      }),
    });
    const data = await response.json();
    const message = data.choices[0].message.content;
    setResponseMessage(message);
  } catch (error) {
    console.error("Error fetching travel plan:", error);
    throw error;
  }
}

const console_easteregg = `                                                   88                        
                                                   88                        
                                                   88                        
8b      db      d8 ,adPPYYba, 8b,dPPYba,   ,adPPYb,88  ,adPPYba, 8b,dPPYba,  
\`8b    d88b    d8' ""     \`Y8 88P'   \`"8a a8"    \`Y88 a8P_____88 88P'   "Y8  
 \`8b  d8'\`8b  d8'  ,adPPPPP88 88       88 8b       88 8PP""""""" 88          
  \`8bd8'  \`8bd8'   88,    ,88 88       88 "8a,   ,d88 "8b,   ,aa 88          
    YP      YP     \`"8bbdP"Y8 88       88  \`"8bbdP"Y8  \`"Ybbd8"' 88"
`;

console.log(`%c${console_easteregg}`, "color: blue");
