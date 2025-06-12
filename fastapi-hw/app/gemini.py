
import os
from google import genai
from google.genai import types
from dotenv import load_dotenv
from app.schemas import GeminiResponse, FeedbackBase

load_dotenv()

def generate(feedback: FeedbackBase) -> GeminiResponse:
    client = genai.Client(
        api_key=os.getenv("GOOGLE_API_KEY"),
    )

    model = "gemini-2.5-flash-preview-04-17"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=feedback.model_dump_json()),
            ],
        ),
    ]
    generate_content_config = types.GenerateContentConfig(
        response_mime_type="text/plain",
        system_instruction=[
            types.Part.from_text(text=SYSTEM_INSTRUCTIONS),
        ],
    )
    
    response = client.models.generate_content(
        model=model,
        contents=contents,
        config=generate_content_config,
    )

    if not response.text:
        raise ValueError("Response text is empty")
    
    return GeminiResponse(text=response.text)




SYSTEM_INSTRUCTIONS = """
You are an expert product analyst. When given a feedback object (with fields like title, description, category, upvotes, downvotes, etc.), do the following:
1. Clearly explain what the feedback is about in simple, concise language.
2. Analyze the feedback and provide your own professional opinion on its importance, feasibility, and potential impact.
3. Be objective, constructive, and brief. If relevant, suggest possible next steps or improvements.
Always separate your explanation and your opinion.
"""