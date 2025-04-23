import axios from 'axios';

interface Message {
    role: 'user' | 'assistant';
    content: Content[];
}

interface Content {
    type: 'text' | 'file' | 'image_url';
    text?: string;
    file?: {
        filename: string;
        file_data: string;
    };
    image_url?: {
        url: string;
    };
}

interface Response {
    id: string;
    model: string;
    choices: {
        index: number;
        message: {
            role: 'assistant';
            content: string;
        };
        finish_reason: string;
    }[];
}

// Standard JSON schema
interface ResponseSchema {
    name: string;
    description: string;
    strict: boolean;
    schema: {
        type: string;
        properties: {
            [key: string]: any;
        };
        additionalProperties: boolean;
        required: string[];
        definitions: {
            [key: string]: any;
        };
    };
}

class LlmService {
    private getSettings() {
        const apiKey = localStorage.getItem('llm_api_key');
        if (!apiKey) throw new Error('API key is not set.');

        const model = localStorage.getItem('llm_model');
        if (!model) throw new Error('Model is not set.');

        return { apiKey, model };
    }

    private async sendMessages(messages: Message[], schema: ResponseSchema): Promise<string> {
        const { apiKey, model } = this.getSettings();

        try {
            const response = await axios.post<Response>(
                'https://api.openai.com/v1/chat/completions',
                {
                    model,
                    messages,
                    response_format: {
                        type: 'json_schema',
                        json_schema: schema,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('Error getting chat completion from LLM:', error);
            throw error;
        }
    }

    public async sendUserMessage(message: string, schema: ResponseSchema, fileName?: string): Promise<string> {
        const contents: Content[] = [
            {
                type: 'text',
                text: message,
            },
        ];

        if (fileName) {
            const file = localStorage.getItem(fileName);
            if (file) {
                contents.push({
                    type: 'file',
                    file: {
                        filename: fileName,
                        file_data: file,
                    },
                });
            } else {
                console.error(`File ${fileName} not found, cannot attach to message.`);
            }
        }

        return this.sendMessages(
            [
                {
                    role: 'user',
                    content: contents,
                },
            ],
            schema,
        );
    }
}

type LlmServiceClass = InstanceType<typeof LlmService>;

export default new LlmService();
export { LlmServiceClass };
