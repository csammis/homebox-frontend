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
  public firstName: string;
  public lastName: string;
  public subject: string;
  public challengeKey: string;
  public challengeResponse: number;

  public constructor() {
    this.firstName = "";
    this.lastName = "";
    this.subject = "";
    this.challengeKey = "";
    this.challengeResponse = 0;
  }
}
