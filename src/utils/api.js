const API_KEY = import.meta.env.VITE_API_KEY;
const GMAPS_API_KEY = import.meta.env.VITE_GMAPS_KEY;

export function getCityImage(searchValue, setFunction) {
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
      const photo = results[0]?.photos[0]?.getUrl();
      setFunction(photo || "");
    }
  });
}

export async function getTravelPlan(
  durationValue,
  searchValue,
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
            content: `Create a ${durationValue} day itinirary travel plan to ${searchValue}. At the end display a rough estimate of the expenses. here is the example format i want: Day 1: Exploring the City , then put each activity in a new line. Here is the example format: "Day 1: Exploring the City (summary of the day)
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
- Wrap up the day with a performance at the National Opera of Ukraine, a beautiful building and a cultural institution of the city \n
 Total Estimated Cost: 💲400`,
          },
        ],
      }),
    });
    const data = await response.json();
    const message = data.choices[0].message.content;
    setResponseMessage(message);
  } catch (error) {
    console.error("Error fetching travel plan:", error);
  }
}
