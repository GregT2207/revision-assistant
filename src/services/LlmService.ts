import axios from 'axios';

class LlmService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://api.openai.com/v1/chat/completions';
    }

    private async sendMessage(messages: { role: string; content: string }[]): Promise<unknown> {
        const apiKey = localStorage.getItem('llm_api_key');
        const model = localStorage.getItem('llm_model');

        if (!apiKey) {
            throw new Error('API key is not set.');
        }

        if (!model) {
            throw new Error('Model is not set.');
        }

        try {
            const response = await axios.post(
                this.baseUrl,
                {
                    model: model,
                    messages,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${apiKey}`,
                    },
                },
            );
            return response.data;
        } catch (error) {
            console.error('Error communicating with OpenAI API:', error);
            throw error;
        }
    }

    public async sendUserMessage(message: string): Promise<unknown> {
        const messages = [
            {
                role: 'user',
                content: message,
            },
        ];
        return this.sendMessage(messages);
    }
}

type LlmServiceClass = InstanceType<typeof LlmService>;

export default new LlmService();
export { LlmServiceClass };
