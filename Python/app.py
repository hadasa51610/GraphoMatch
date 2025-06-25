from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import base64
import requests
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:7134","https://graphomatchserver.onrender.com"], supports_credentials=True)


load_dotenv()

client_Gemini = OpenAI(
    api_key=os.getenv("API_KEY"),
    base_url=os.getenv("BASE_URL")
)

@app.route("/ping")
def ping():
    return "pong", 200

def image_url_to_base64(image_url):
    """
   Downloads an image from the URL and returns its base64 encoding
    """
    response = requests.get(image_url)
    if response.status_code != 200:
        raise ValueError("Failed to download the image")
    return base64.b64encode(response.content).decode('utf-8')


@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        print("📥 Got request to /analyze")
        data = request.get_json()
        image_url = data.get('imageUrl')
        print(f"🖼️ Image URL: {image_url}")

        if not image_url:
            return jsonify({'error': 'imageUrl is missing from the request'}), 400

        base64_image = image_url_to_base64(image_url)
        print("✅ Converted image to base64")

        response_Gemini = client_Gemini.chat.completions.create(
            model="gemini-2.0-flash",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": """You are an experienced handwriting analyst.
                  give me answer in english.
                  I am attaching an image of handwritten text.
                    Please describe in detail the visual features you identify in the text:

                    What does the handwriting look like?

                    Can anything be inferred from the shape and characteristics of the letters?

                    Are there any noticeable patterns in the writing?

                    What can be learned about the writing style and its features?

                    Can you identify a particular style that may be associated with personality traits or a unique expression style?

                    Avoid directly mentioning graphology and focus on a detailed description of the handwriting's character.
                    Avoid making medical or psychological diagnoses, and focus on a descriptive graphological analysis.""",
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            },
                        },
                    ],
                }
            ],
        )

        visual_features = response_Gemini.choices[0].message.content
        print("🧠 Got visual features from Gemini")

        prompt = f"""
         Graphological analysis of the handwriting based on the following features:
        {visual_features}

        Please provide a detailed assessment of the writer's personality traits as much as possible.
        Also, return the 5 most recommended fields of study and professions based on the identified traits, and rank them according to the level of compatibility.
        Return the response in the following format:
        {{
              "personalityTraits": [
          {{
            "trait": "Trait Name",
            "matchLevel": "Low / Medium / High / Very High",
            "description": "A detailed explanation of the trait and how it is reflected in the handwriting"
          }},
          ...
        ],
        "recommendations": [
          {{
            "profession": "Profession Name",
            "matchLevel": "Low / Medium / High / Very High",
            "reason": "Detailed explanation of why this profession fits the identified traits"
          }},
          ...
        ]

            """

        response_analysis = client_Gemini.chat.completions.create(
            model="gemini-2.0-flash",
            messages=[
                {"role": "system", "content": "You are a graphology expert answer me alwayes in english."},
                {"role": "user", "content": prompt}
            ]
        )

        final_analysis = response_analysis.choices[0].message.content
        print("🎯 Final analysis complete")

        return jsonify({
            "analysis": final_analysis
        })

    except Exception as e:
        import traceback
        print("❌ Error occurred in /analyze")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
