import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { OpenAIApi } from 'openai';

dotenv.config();

const openai = new OpenAIApi({
    key: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'hello from codex'
    });
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.Completions.create({
            engine: "text-davinci-003",
            prompt: `${prompt}`,
            max_tokens: 3000,
        });

        res.status(200).send({
            bot: response.choices[0].text
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});

app.listen(5000, () => console.log('server is running on port http://localhost:5000'));
