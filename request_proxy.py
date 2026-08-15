from flask import Flask
import requests
from urllib.parse import urljoin

app = Flask(__name__)
app.config.from_prefixed_env()

baseUrl = ""
API_KEY = app.config["HOMEBOX_API_KEY"]

@app.route('/api/entities/<tag>')
def getEntities(tag: str):
    r : requests.Response = requests.get(f"{baseUrl}/entities?tags={tag}", headers={"Authorization" : API_KEY})
    return r.json()

@app.route('/api/tags')
def getTags():
    r : requests.Response = requests.get(f"{baseUrl}/tags", headers={"Authorization" : API_KEY})
    return r.json()

@app.route('/api/tags/<tag>')
def getTag(tag: str):
    r : requests.Response = requests.get(f"{baseUrl}/tags/{tag}", headers={"Authorization" : API_KEY})
    return r.json()

@app.route('/api/entities/<entityId>/attachments/<attachmentId>')
def getEntityAttachment(entityId: str, attachmentId: str):
    r : requests.Response = requests.get(f"{baseUrl}/entities/{entityId}/attachments/{attachmentId}",
                                         headers={"Authorization": API_KEY})
    return r.content

if __name__ == "__main__":
    baseUrl = urljoin(app.config["HOMEBOX_URL"], "/api/v1")
    app.run()
