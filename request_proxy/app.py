import logging
from flask import Flask, jsonify, request
import requests
from urllib.parse import urljoin
from dataclasses import dataclass
import random 

app = Flask(__name__)
app.config.from_prefixed_env(prefix="HBFE")

HOMEBOX_API_KEY: str = app.config["HOMEBOX_API_KEY"]

SMTP2GO_API_KEY: str = app.config["SMTP2GO_API_KEY"]
CONTACT_EMAIL_TO: str = app.config["CONTACT_EMAIL_TO"]
CONTACT_EMAIL_FROM: str = app.config["CONTACT_EMAIL_FROM"]
CONTACT_EMAIL_SUBJECT: str = app.config["CONTACT_EMAIL_SUBJECT"]

def createRequest(endpoint: str) -> requests.Response:
    """ Build a GET request to the specified HomeBox API endpoint"""
    if endpoint.startswith("/"):
        endpoint = endpoint[1:]
    target: str = urljoin(app.config["HOMEBOX_URL"], f"/api/v1/{endpoint}")
    app.logger.debug(f"Built request to {target}")
    return requests.get(target, headers={"Authorization" : HOMEBOX_API_KEY})

@app.route('/api/entity/<id>')
def getEntity(id: str):
    r : requests.Response = createRequest(f"/entities/{id}")
    return r.json()

@app.route('/api/entities/<tag>')
def getEntities(tag: str):
    r : requests.Response = createRequest(f"/entities?tags={tag}")
    return r.json()

@app.route('/api/tags')
def getTags():
    r : requests.Response = createRequest(f"/tags")
    return r.json()

@app.route('/api/tags/<tag>')
def getTag(tag: str):
    r : requests.Response = createRequest(f"/tags/{tag}")
    return r.json()

@app.route('/api/entities/<entityId>/attachments/<attachmentId>')
def getEntityAttachment(entityId: str, attachmentId: str):
    r : requests.Response = createRequest(f"/entities/{entityId}/attachments/{attachmentId}")
    return r.content

@dataclass
class Challenge:
    key: str
    text: str
    value: int

CHALLENGES: list[Challenge] = [
    Challenge("2c26adb8-cc94-48d5-b294-ba7829ccbad0", "What is four times two?", 8),
    Challenge("93382951-9705-4b55-862e-1c461c4f7872", "What is ten minus three?", 7),
    Challenge("45f26733-9187-4684-9730-2f4e1141a787", "What is three plus six?", 9),
    Challenge("59eb0eb0-4eba-496c-9634-1aa98d52bd45", "Six minus two equals what?", 4),
    Challenge("35aac75f-c8d2-4667-927f-cb40e493b666", "What is the number after two?", 3),
    Challenge("e9a3fe79-b916-4323-9632-2ecddece6bce", "Eleven minus three equals what?", 8),
    Challenge("254058cf-486d-4cee-81b7-b8ddefb6a917", "What is twelve divided by three?", 4),
    Challenge("7ba4194b-9ebf-44ed-bd4f-5cf833b4a018", "What is three minus two?", 1),
    Challenge("9d1bdf8c-5640-4c00-a76a-181c680cc920", "What is two plus three?", 5),
    Challenge("ce6f4a3c-34db-450d-8f53-0ea692bfdb16", "What is three times three?", 9),
    Challenge("55e5e584-951f-4ed1-895b-97a0738fe4ac", "Eight minus six equals what?", 2),
    Challenge("4d1ab9ba-6230-4298-95fa-25fa00203521", "What is the number before eight?", 7),
    Challenge("68e723e4-2476-4e91-909f-0954a99ea204", "Five plus two equals what?", 7),
    Challenge("4b45a7ab-51f1-4f00-ad40-26e82a99c979", "What is two times four?", 8),
    Challenge("c5d76fc9-deb1-4ecf-917a-a2cd6c652ea7", "What is nine minus six?", 2),
]

@app.route('/api/challenge')
def getRandomChallenge():
    @dataclass
    class ChallengeRequest:
        """ A challenge which can be sent over the wire without the answer """
        key: str
        text: str

        @classmethod
        def fromChallenge(cls, challenge: Challenge):
            return ChallengeRequest(challenge.key, challenge.text)
    
    return jsonify(ChallengeRequest.fromChallenge(CHALLENGES[random.randint(0, len(CHALLENGES) - 1)]))

@dataclass
class ContactForm:
    name: str
    subject: str
    message: str

@app.post("/api/contact")
def sendContactForm():
    contactForm: dict = request.get_json()
    print(contactForm)
    challenge = [c for c in CHALLENGES if c.key == str(contactForm.get('challengeKey'))]
    if len(challenge) > 0:
        if challenge[0].value == int(str(contactForm.get('challengeResponse'))):
            data: ContactForm = ContactForm(str(contactForm.get('name')),
                                            str(contactForm.get('subject')),
                                            str(contactForm.get('message')))

            url = "https://api.smtp2go.com/v3/email/send"
            payload = {
                "fastaccept": True,
                "to": [CONTACT_EMAIL_TO],
                "sender": CONTACT_EMAIL_FROM,
                "subject": CONTACT_EMAIL_SUBJECT,
                "html_body": f"<p>Name: {data.name}<br/>Subject: {data.subject}<br/>Message: {data.message}"
            }
            headers = {
                "accept": "application/json",
                "Content-Type": "application/json",
                "X-Smtp2go-Api-Key": f"{SMTP2GO_API_KEY}"
            }

            response = requests.post(url, json=payload, headers=headers)
            if response.ok:
                return ("Sent", 201)
            else:
                return ("SMTP relay failure", 400)
    return ("Challenge failed", 400)

if __name__ == "__main__":
    app.run()
else:
    # This is being executed through gunicorn so the logger handlers need to be wired up
    gunicorn_logger = logging.getLogger("gunicorn.error")
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)
