import { GPT_QUERY } from "./query";
const API_KEY = import.meta.env.VITE_OPENAI_KEY;
const GMAPS_API_KEY = import.meta.env.VITE_GMAPS_KEY;
const OPEN_WEATHER_KEY = import.meta.env.VITE_WEATHER_API;
export const WEATHER_API_ENDPOINT = (city) =>
  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPEN_WEATHER_KEY}`;
const GPT_API_ENDPOINT = "https://api.openai.com/v1/chat/completions";

// Google Places API
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

// GPT API
export async function getTravelPlan(
  durationValue,
  destinationName,
  setResponseMessage
) {
  try {
    const response = await fetch(GPT_API_ENDPOINT, {
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
            content: `Create a ${durationValue} day itinerary travel plan to ${destinationName} ${GPT_QUERY}`,
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

export const handleAPI = async (
  searchValue,
  durationValue,
  setDestinationName,
  setCityImage,
  setResponseMessage,
  setLoading,
  setErrorOccurred
) => {
  try {
    const destination = await getDestination(
      searchValue,
      setDestinationName,
      setCityImage
    );
    await getTravelPlan(durationValue, destination, setResponseMessage);
    setLoading(false);
  } catch (error) {
    console.error("Error called from handleAPI", error);
    setErrorOccurred(true);
    setLoading(false);
  }
};

// Weather API
export async function fetchWeatherForecast(city, days) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPEN_WEATHER_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    const forecast = [];

    for (let i = 0; i < days; i++) {
      const weather = data.list[i].weather[0].main;
      const temp = Math.round(data.list[i].main.temp - 273.15);
      const iconCode = data.list[i].weather[0].icon;
      const wind = data.list[i].wind.speed;
      forecast.push({ weather, temp, iconCode, wind });
    }

    return forecast;
  } catch (error) {
    console.error("Error fetching weather forecast:", error);
    throw error;
  }
}
