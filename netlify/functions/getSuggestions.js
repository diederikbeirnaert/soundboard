// netlify/functions/getSuggestions.js
export async function handler(event) {
  try {
    const HF_API_KEY = process.env.HF_API_KEY; // Uit Netlify environment variables
    const { sentence } = JSON.parse(event.body);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/distilgpt2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: sentence })
      }
    );

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
