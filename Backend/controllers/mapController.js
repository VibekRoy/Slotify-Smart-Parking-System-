import axios from "axios";

export const getDistance = async (req, res) => {
  const { origins, destinations } = req.query;
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/distancematrix/json",
      {
        params: {
          origins,
          destinations,
          key: process.env.MAP_API_KEY,
          mode: "driving",
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
