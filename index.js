const express = require("express");
const app = express();
const axios = require("axios");
const data = require("./data.json");
const cors = require("cors");
app.use(cors());

app.use(express.json());

// Define API endpoint
const API_ENDPOINT = "https://vistaar-api.tekdinext.com/cache/search";

// Route to handle user queries
app.post("/search", async (req, res) => {
  const userInput = req.body;
  console.log(userInput); // Assuming the frontend sends the entire query as JSON

  try {
    // Make request to API with userInput in the request body
    const response = await axios.post(API_ENDPOINT, userInput);
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//api to get dummy data.
//refer data.json file for dummy data
app.get("/data/:itemId", (req, res) => {
  const itemId = parseInt(req.params.itemId);

  // Find the item with the specified ID
  const item = data.items.find((item) => item.id === itemId);

  if (item) {
    // Prepare response object including item's content, images, videos, and links
    const responseData = {
      id: item.id,
      title: item.title,
      content: item.content || null,
      images: item.images || [],
      videos: item.videos || [],
      links: item.links || [],
    };

    res.json(responseData);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
