import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import { createClient } from "redis";

dotenv.config();
const app = express();

const port = process.env.PORT || 3004;
const api = process.env.API_KEY;

// Connection of Redis
const redisClient = createClient({
  socket: {
    host: "localhost",
    port: 6379,
  },
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

// Connect to Redis
redisClient.connect().catch(console.error);

async function getWeather(a: string) {
  try {
    const cachedData = await redisClient.get("weather_condition");
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${api}&q=${a}&aqi=no`,
    );
    const condition = response.data.current.condition.text;

    await redisClient.set("weather_condition", JSON.stringify(condition), {
      EX: 10,
    });
    return condition;
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
