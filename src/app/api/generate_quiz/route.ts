import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
const pdfParse = require('pdf-parse');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

// Function to extract text from PDF using pdf-parse
async function extractTextFromPDF(file: File) {
  const buffer = await file.arrayBuffer();
  const data = new Uint8Array(buffer);

  // Convert Uint8Array to Buffer explicitly
  const pdfBuffer = Buffer.from(data);

  // Parse the PDF
  const pdfData = await pdfParse(pdfBuffer);

  // Extract text from the PDF
  return pdfData.text.trim();
}

// System prompt for generating the quiz
const systemPrompt = `
The user will provide some text extracted from a PDF. Please generate a multiple-choice quiz based on the content of the text.
Each question should have one correct answer and three incorrect answers. Output the quiz in JSON format.

EXAMPLE OUTPUT:
{
    "quizName": "english quiz",
    "quiz": [
        {
            "question": "Which is the highest mountain in the world?",
            "options": ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
            "correct_answer": "Mount Everest"
        },
        {
            "question": "Which is the longest river in the world?",
            "options": ["Nile River", "Amazon River", "Yangtze River", "Mississippi River"],
            "correct_answer": "Nile River"
        }
    ]
}

IMPORTANT: The response must be in JSON format.
`;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file || file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Please upload a valid PDF file.' },
        { status: 400 }
      );
    }

    // Step 1: Extract text from the uploaded PDF
    const pdfText = await extractTextFromPDF(file);

    // Step 2: Prepare the prompt for OpenAI API
    const userPrompt = `Generate in French a multiple-choice quiz with a minimum of 15 questions based on the following text:\n\n${pdfText}`;
    const messages = [
      { role: 'system' as const, content: systemPrompt, name: 'system' },
      { role: 'user' as const, content: userPrompt, name: 'user' },
    ];

    // Step 3: Call the OpenAI API
    const response = await openai.chat.completions.create({
      model: 'deepseek/deepseek-r1-distill-llama-70b:free',
      messages,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content received from OpenAI API');
    }

    // Step 4: Remove Markdown code block syntax (```json and ```)
    const cleanedContent = content.replace(/```json|```/g, '').trim();

    // Step 5: Parse the cleaned content as JSON
    const quizData = JSON.parse(cleanedContent);

    return NextResponse.json(quizData);
  } catch (error) {
    console.error('Failed to generate quiz:', error);
    return NextResponse.json(
      { error: 'Failed to generate quiz. Please try again.' },
      { status: 500 }
    );
  }
}