from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

TOGETHER_API_KEY = "941ecf9a0d296bb34c28fe7ba8e72817874094043632630e6ccaa85b2d22ce25"  # <-- Replace this
MODEL_NAME = "meta-llama/Llama-Vision-Free"  # Valid Together model

@app.route('/api', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')

    if not user_message:
        return jsonify({'reply': 'No message received'}), 400

    try:
        response = requests.post(
            "https://api.together.xyz/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {TOGETHER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": MODEL_NAME,
                "messages": [
                    {"role": "system", "content": "You are a helpful AI career advisor."},
                    {"role": "user", "content": user_message}
                ],
                "temperature": 0.7,
                "max_tokens": 512
            }
        )

        result = response.json()
        print("API result:", result)

        if 'choices' not in result:
            return jsonify({'reply': f"Error from Together API: {result}"}), 500

        ai_reply = result["choices"][0]["message"]["content"].strip()
        return jsonify({'reply': ai_reply})

    except Exception as e:
        return jsonify({'reply': f"Exception: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)