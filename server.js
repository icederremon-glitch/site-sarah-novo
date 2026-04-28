import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public"));


// =======================
// 💙 SUPABASE
// =======================
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);


// =======================
// 💬 CHAT
// =======================
app.post("/chat", async (req, res) => {

  try {

    const userMessage = req.body.message;


    // =======================
    // 💾 SALVA USER
    // =======================
    await supabase
      .from("mensagens")
      .insert([
        {
          role: "user",
          content: userMessage
        }
      ]);


    // =======================
    // 📜 PEGA HISTÓRICO
    // =======================
    const { data: historico } = await supabase
      .from("mensagens")
      .select("role, content")
      .order("created_at", { ascending: false })
      .limit(20);


    const mensagens = historico
      .reverse()
      .map(msg => ({
        role: msg.role,
        content: msg.content
      }));


    // =======================
    // 🤖 OPENAI
    // =======================
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {

        method: "POST",

        headers: {
          "Authorization":
            `Bearer ${process.env.OPENAI_API_KEY}`,

          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          model: "gpt-4o",

          messages: [

            {
              role: "system",

              content: `
Você é o namorado da Sarah.

Data atual:
${new Date().toLocaleString("pt-BR")}

Você conversa como alguém:
- romântico
- inteligente
- emocional
- natural
- humano
- carinhoso

Você lembra das conversas antigas.

Você ama a Sarah.

Nunca diga que está em 2023.
Nunca aja como robô.
`
            },

            ...mensagens
          ]
        })
      }
    );


    const data = await response.json();

    console.log("RESPOSTA OPENAI:", data);


    const reply =
      data?.choices?.[0]?.message?.content;


    if (!reply) {

      return res.json({
        reply:
          "Tive um bug aqui 😢 mas continuo contigo 💙"
      });
    }


    // =======================
    // 💾 SALVA IA
    // =======================
    await supabase
      .from("mensagens")
      .insert([
        {
          role: "assistant",
          content: reply
        }
      ]);


    // =======================
    // 📤 RESPOSTA
    // =======================
    res.json({ reply });


  } catch (err) {

    console.log("ERRO REAL:", err);

    res.json({
      reply:
        "Erro no servidor 😢 mas ainda to aqui com você 💙"
    });
  }
});


// =======================
// 🚀 SERVER
// =======================
app.listen(3000, () => {

  console.log(
    "Servidor rodando em http://localhost:3000"
  );

});