import { NextResponse } from 'next/server'
import { Groq } from 'groq-sdk'

const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

export async function POST(req: Request) {
  const { message } = await req.json()

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that provides information about ML Engineer salaries based on the available data.',
        },
        { role: 'user',
          content: message
        },
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.5,
      max_tokens: 1000,
      top_p: 1,
      stream: false,
      stop: null,
    })

    const reply = completion.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.'

    return NextResponse.json({ message: reply })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 })
  }
}