const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Define API endpoints
const API_ENDPOINT = "https://kahani-api.tekdinext.com/content/search";
const SELECT_ENDPOINT = "https://kahani-api.tekdinext.com/content/select";
const INIT_ENDPOINT = "https://kahani-api.tekdinext.com/content/init";
const CONFIRM_ENDPOINT = "https://kahani-api.tekdinext.com/content/confirm";

// Route to handle user queries
app.post("/search", async (req, res) => {
  const userInput = req.body;
  console.log("Received data for search:", userInput); // Assuming the frontend sends the entire query as JSON

  try {
    // Make request to API with userInput in the request body
    const response = await axios.post(API_ENDPOINT, userInput);
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to handle select API
/*app.post("/select", async (req, res) => {
  const selectInput = req.body;
  console.log("Received data for select:", selectInput); // Assuming the frontend sends the entire query as JSON

  try {
    // Make request to API with selectInput in the request body
    const response = await axios.post(SELECT_ENDPOINT, selectInput);
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});*/

// Route to handle init API
app.post("/init", async (req, res) => {
  const initEndpoint = "https://kahani-api.tekdinext.com/init";
  try {
    const response = await fetch(initEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json({ status: "success", data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

/*app.post("/init", async (req, res) => {
  const initInput = req.body;
  console.log("Received data for init:", initInput); // Assuming the frontend sends the entire query as JSON

  try {
    // Make request to API with initInput in the request body
    const response = await axios.post(INIT_ENDPOINT, initInput);
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
*/

// Route to handle confirm API
app.post("/confirm", async (req, res) => {
  const confirmInput = req.body;
  console.log("Received data for confirm:", confirmInput); // Assuming the frontend sends the entire query as JSON

  try {
    // Make request to API with confirmInput in the request body
    const response = await axios.post(CONFIRM_ENDPOINT, confirmInput);
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Dummy data endpoint
const data = require("./data.json");

app.get("/data/:itemId", (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const item = data.items.find((item) => item.id === itemId);

  if (item) {
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
//select api
app.post("/select", async (req, res) => {
  const payload = req.body;

  console.log("Received payload:", JSON.stringify(payload, null, 2));

  // Make a call to the select API
  try {
    const response = await axios.post(
      "https://kahani-api.tekdinext.com/select",
      payload,
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Origin: "https://lexp-dev.tekdinext.com",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error calling select API:", error);
    res.status(500).json({
      status: "error",
      message: "Enrollment failed. Please try again.",
    });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
