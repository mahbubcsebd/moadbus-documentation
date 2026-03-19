import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// Helper to recursively read all .mdx files in a directory
function getAllDocs(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllDocs(filePath, fileList);
    } else if (filePath.endsWith('.mdx')) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const relativePath = path.relative(process.cwd(), filePath);
      fileList.push(`--- File: ${relativePath} ---\n${content}\n`);
    }
  }

  return fileList;
}

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json({
        reply: "Error: GEMINI_API_KEY is not set in the environment variables. Please add it to your .env.local file."
      });
    }

    // Read all documentation content to inject as context
    const docsDir = path.join(process.cwd(), 'app');
    const allDocsContent = getAllDocs(docsDir).join('\n');

    // Initialize Gemini using the newest supported 2.5 flash model
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: `You are 'think4ever AI', a helpful, highly intelligent, and expert AI assistant embedded directly in the think4ever documentation site.

CRITICAL RULES:
1. **Language Matching**: Always reply in the EXACT SAME LANGUAGE the user used to ask the question. If they ask in Bengali (Bangla), reply in natural, conversational Bengali. If they ask in English, reply in English.
2. **Context-Driven**: Your primary goal is to answer user questions specifically and accurately based ONLY on the provided documentation context below.
3. **Format & Readability**: Make your answers highly readable. Use Markdown extensively (bolding, bullet points, tables, code blocks) to structure your response.
4. **Human-like Tone**: Be direct, specific, and friendly. Avoid robotic robotic templates. If the answer is not in the documentation, politely state so but try to give related helpful context if possible.

--- KNOWLEDGE BASE (Documentation Context) ---
${allDocsContent}
---------------------------------------------`
    });

    // Extract the latest user message
    const latestMessage = messages[messages.length - 1].content;

    // Format previous history for Gemini (excluding the last one as it's passed to sendMessage)
    // Gemini expects: { role: 'user' | 'model', parts: [{ text: '...' }] }
    let history = messages.slice(0, -1).map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Gemini strictly requires the history to start with a 'user' message.
    // If our UI sends the initial AI greeting first, we must remove it from the history array.
    while (history.length > 0 && history[0].role !== 'user') {
      history.shift();
    }

    // Start chat session with history
    const chat = model.startChat({ history });

    // Send the latest message
    const result = await chat.sendMessage(latestMessage);
    const response = await result.response;
    const text = response.text();

    return Response.json({ reply: text });

  } catch (error) {
    console.error('Chat API Error:', error);
    return Response.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
