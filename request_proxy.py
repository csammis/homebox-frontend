from flask import Flask
import requests

app = Flask(__name__)
BASE_URL = "http://192.168.86.160:3100/api/v1/"
API_KEY = "hb_CvHNulXo9KuTcDzgOimPq4gqcs2ygrTf1K1_opkLiAM"

@app.route('/api/entities/<tag>')
def getEntities(tag: str):
    r : requests.Response = requests.get(f"{BASE_URL}entities?tags={tag}", headers={"Authorization" : API_KEY})
    return r.json()

if __name__ == "__main__":
    app.run(debug=True)
