import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();

const port = process.env.PORT || 3004;
const api = process.env.API_KEY;

async function getWeather(a: string) {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${api}&q=${a}&aqi=no`,
    );
    return {
      Condition: response.data.current.condition.text,
      Temperature: response.data.current.temp_c,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

app.get("/:id", async (req, res) => {
  try {
    const weather = await getWeather(req.params.id);
    res.json(weather);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
