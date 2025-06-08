import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Get token from environment variable
const HUGGING_FACE_TOKEN = process.env.HUGGING_FACE_TOKEN;
const MODEL_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

// Validate token exists
if (!HUGGING_FACE_TOKEN) {
  console.error("Error: HUGGING_FACE_TOKEN not found in environment variables");
  console.error("Please create a .env file in the api directory with your Hugging Face token:");
  console.error("HUGGING_FACE_TOKEN=your_token_here");
  process.exit(1);
}

// Types
interface ParaphraseRequest {
  text: string;
  style: 'Formal' | 'Casual' | 'Concise' | 'Creative';
}

// Helper function to get style-specific prompt
function getStylePrompt(style: string, text: string): string {
  switch (style) {
    case 'Formal':
      return `Paraphrase this formally and professionally: ${text}`;
    case 'Casual':
      return `Paraphrase this casually and conversationally: ${text}`;
    case 'Concise':
      return `Paraphrase this concisely: ${text}`;
    case 'Creative':
      return `Paraphrase this creatively with vivid language: ${text}`;
    default:
      return `Paraphrase this: ${text}`;
  }
}

// Paraphrase endpoint
app.post('/api/paraphrase', async (req: Request<{}, {}, ParaphraseRequest>, res: Response) => {
  console.log('Received paraphrase request:', {
    style: req.body.style,
    textLength: req.body.text?.length || 0
  });

  try {
    const { text, style } = req.body;

    if (!text) {
      console.log('Error: No text provided');
      return res.status(400).json({ error: 'Text is required' });
    }

    const prompt = getStylePrompt(style, text);
    console.log('Generated prompt:', prompt);
    
    // Call Hugging Face's API
    console.log('Calling Hugging Face API...');
    const response = await fetch(
      MODEL_URL,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${HUGGING_FACE_TOKEN}`
        },
        method: "POST",
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_length: 1000,
            min_length: 30,
            temperature: style === 'Creative' ? 0.8 : 0.6,
            top_p: 0.9,
            do_sample: true,
            num_return_sequences: 1
          }
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Hugging Face API Error:', error);
      console.error('Response status:', response.status);
      console.error('Response headers:', response.headers);
      throw new Error('Failed to get response from Hugging Face API');
    }

    console.log('Received response from Hugging Face API');
    const result = await response.json();
    console.log('Parsed response:', result);

    // Extract the paraphrased text from the response
    let paraphrasedText = '';
    if (Array.isArray(result) && result.length > 0) {
      if (result[0].summary_text) {
        paraphrasedText = result[0].summary_text;
      } else if (result[0].generated_text) {
        paraphrasedText = result[0].generated_text;
      } else {
        paraphrasedText = result[0];
      }
    } else if (typeof result === 'string') {
      paraphrasedText = result;
    }
    
    // Clean up the response if needed
    if (typeof paraphrasedText === 'string') {
      paraphrasedText = paraphrasedText.trim();
    }

    console.log('Sending response back to client:', { paraphrasedText });
    res.json({ paraphrasedText });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while paraphrasing' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 