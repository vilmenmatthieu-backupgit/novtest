export default async function handler(req, res) {
  try {
    const { base64 } = await req.json(); // { base64: "..." }
    const r = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [
            { text: "Réponds UNIQUEMENT en JSON: {description, prix}." },
            { inlineData: { mimeType: "image/jpeg", data: base64 } }
          ]}]
        })
      }
    );
    const data = await r.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: "AI call failed" });
  }
}
