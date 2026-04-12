import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

let memoria = [];

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    memoria.push({ role: "user", content: userMessage });
    if (memoria.length > 20) memoria.shift();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Você é o namorado da Sarah, carinhoso, natural e romântico."
          },
          ...memoria
        ]
      })
    });

    const data = await response.json();

    console.log("RESPOSTA OPENAI:", data); // 🔥 debug importante

    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return res.json({
        reply: "Tive um bug aqui 😢 mas continuo contigo 💙"
      });
    }

    memoria.push({ role: "assistant", content: reply });

    res.json({ reply });

  } catch (err) {
    console.log("ERRO REAL:", err);

    res.json({
      reply: "Erro no servidor 😢 mas ainda to aqui com você 💙"
    });
  }
});

app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000")
);