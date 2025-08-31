import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Remove data URL prefix if present (llava expects only base64 string)
    let base64Image = body.image;
    if (base64Image && base64Image.startsWith('data:')) {
      base64Image = base64Image.substring(base64Image.indexOf(',') + 1);
    }
    const context = body.context || '';

    if (!base64Image) {
      return NextResponse.json({ error: 'No image data provided' }, { status: 400 });
    }

    // Create a comprehensive prompt for Ollava (llava)
    let prompt = "Please analyze this image and provide a detailed description. ";
    if (context && context.trim()) {
      prompt += `The user has also provided this context/question: "${context}". Please address this specifically in your analysis. `;
    }
    prompt += "Focus on describing what you see in the image, any objects, people, scenes, colors, mood, or interesting details. Be descriptive and helpful.";

    // Send to Ollama (llava) for analysis with image
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llava', // Use the vision model
        prompt: prompt,
        images: [base64Image], // Pass the image as base64 in an array
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from Ollama');
    }

    const data = await response.json();

    return NextResponse.json({
      analysis: data.response || 'No analysis available',
    });
  } catch (error) {
    console.error('Image analysis API error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze image. Please make sure Ollama is running and the model is available.' },
      { status: 500 }
    );
  }
}