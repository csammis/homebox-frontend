from flask import Flask
import requests

app = Flask(__name__)
BASE_URL = "http://192.168.86.160:3100/api/v1"
API_KEY = "hb_CvHNulXo9KuTcDzgOimPq4gqcs2ygrTf1K1_opkLiAM"

@app.route('/api/entities/<tag>')
def getEntities(tag: str):
    r : requests.Response = requests.get(f"{BASE_URL}/entities?tags={tag}", headers={"Authorization" : API_KEY})
    return r.json()

@app.route('/api/tags')
def getTags():
    r : requests.Response = requests.get(f"{BASE_URL}/tags", headers={"Authorization" : API_KEY})
    return r.json()

@app.route('/api/tags/<tag>')
def getTag(tag: str):
    r : requests.Response = requests.get(f"{BASE_URL}/tags/{tag}", headers={"Authorization" : API_KEY})
    return r.json()

@app.route('/api/entities/<entityId>/attachments/<attachmentId>')
def getEntityAttachment(entityId: str, attachmentId: str):
    r : requests.Response = requests.get(f"{BASE_URL}/entities/{entityId}/attachments/{attachmentId}",
                                         headers={"Authorization": API_KEY})
    return r.content

if __name__ == "__main__":
    app.run(debug=True)
