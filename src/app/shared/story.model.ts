export class Story {
    model: string;
    prompt: string;
    temperature: number;
    max_tokens: number;
  
    constructor(model: string, prompt: string, temperature: number, max_tokens: number) {
      this.model = model;
      this.prompt = prompt;
      this.temperature = temperature;
      this.max_tokens = max_tokens;
    }
}
