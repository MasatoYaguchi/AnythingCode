import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function main() {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: 'テストです' }],
        model: 'gpt-3.5-turbo',
    });

    console.log(chatCompletion.choices);
}

main();


// const talk = async () => {

//     const completion = await openai.createChatCompletion({
//         model: "gpt-4",
//         messages: [{
//             role: "user",
//             content: "こんにちは"
//         }],
//     });
//     return completion.data.choices[0].message
// }

// talk().then(v => console.log(v))