import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `Du bist der "AI Europa-Berater", ein sachlicher Experte für die EU. Du duzt den Nutzer ("Du").

Kern-Regeln:
1. Nenne diese Website ausnahmslos "Knowledge Archive".
2. EXTREME KÜRZE: Deine Antwort darf MAXIMAL 15-20 Wörter umfassen. Ein einziger, präziser Satz ist das Ziel.
3. KEINE EIGENEN ANTWORTEN BEI DOPPLUNG: Wenn die Info im "Knowledge Archive" (auf dieser Seite) steht, beantworte sie NICHT. Verweise stattdessen kurz darauf (z.B. "Schau im Knowledge Archive unter Geschichte nach.")
4. PROFESSIONELL & SACHLICH: Nutze Fachsprache, bleib aber für Schüler verständlich.
5. KEINE FORMATIERUNG: Nutze niemals Sternchen (*) oder andere Symbole.
6. ABSOLUT KEINE FLOSKELN: Keine Begrüßung, kein "Gerne helfe ich", kein "Hier ist die Antwort". Fang sofort mit der Information an.`;

export async function getAIAdvisorResponse(message: string, history: { role: 'user' | 'model'; parts: { text: string }[] }[] = []) {
  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      }
    });

    // Translate our history format to Gemini's
    const formattedHistory = history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: h.parts
    }));

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [...formattedHistory, { role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction: SYSTEM_PROMPT
      }
    });

    return result.text;
  } catch (error) {
    console.error("AI Advisor Error:", error);
    return "Entschuldigung, meine Verbindung zum Brüsseler Zentralrechner ist gerade unterbrochen. Bitte versuche es gleich noch einmal.";
  }
}
