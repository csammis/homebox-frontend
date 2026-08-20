export class Challenge {
  public key: string;
  public text: string;
  public challengeResponse: number | undefined;

  public constructor(key: string, text: string) {
    this.key = key;
    this.text = text;
  }
}

export async function getRandomChallenge(): Promise<Challenge> {
  const response = await fetch("/api/challenge");
  return (await response.json()) as Challenge;
}

export class ContactForm {
  public name: string;
  public subject: string;
  public message: string;
  public challengeKey: string;
  public challengeResponse: number;

  public constructor() {
    this.name = "";
    this.subject = "";
    this.message = "";
    this.challengeKey = "";
    this.challengeResponse = 0;
  }
}

export async function postContact(cf: ContactForm): Promise<boolean> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(cf),
  });
  return response.ok;
}
