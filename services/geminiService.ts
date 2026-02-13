
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateFullJourney = async (params: { 
  recipient: string, 
  nicknames: string, 
  keywords: string, 
  memory: string 
}) => {
  const ai = getAI();
  
  // 1. Generate Image (Dreamy Scene)
  const imagePrompt = `A high-quality, cinematic romantic scene for a girl named ${params.recipient}. 
    Theme: ${params.keywords}. Context: ${params.memory}. 
    Soft lighting, 8k resolution, dreamy bokeh, vibrant yet soft colors, Valentine's Day atmosphere. 
    Include subtle romantic elements like floating rose petals or soft moonlight. No text in image.`;
    
  const imageResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: imagePrompt }] },
    config: { imageConfig: { aspectRatio: "16:9" } }
  });

  let imageUrl = null;
  for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      imageUrl = `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  // 2. Generate Text Content incorporating nicknames
  const textPrompt = `Generate three romantic items for ${params.recipient}. 
    I call her by these pet names: ${params.nicknames}. 
    She is: ${params.keywords}. 
    A special memory we share: ${params.memory}.
    
    Format the response exactly like this:
    [WHISPER]: (A very short, 2-line emotional text message using one of the pet names)
    [LETTER]: (A deep, 3-paragraph poetic love letter. Use the pet names naturally to make it feel intimate and real. Mention the memory.)
    [PROPOSAL]: (A creative and heartwarming "Will you be my Valentine?" request using her real name: ${params.recipient})
    
    Make it feel unique, deeply personal, and a bit playful where appropriate (especially with the nicknames).`;

  const textResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: textPrompt,
  });

  const rawText = textResponse.text || '';
  const whisperMatch = rawText.match(/\[WHISPER\]: ([\s\S]*?)(?=\[LETTER\]|$)/);
  const letterMatch = rawText.match(/\[LETTER\]: ([\s\S]*?)(?=\[PROPOSAL\]|$)/);
  const proposalMatch = rawText.match(/\[PROPOSAL\]: ([\s\S]*?)$/);

  return {
    imageUrl,
    shortMessage: whisperMatch ? whisperMatch[1].trim() : `You are my everything, ${params.recipient}.`,
    loveLetter: letterMatch ? letterMatch[1].trim() : "My heart belongs to you forever.",
    proposal: proposalMatch ? proposalMatch[1].trim() : `Will you be my Valentine, ${params.recipient}?`
  };
};
