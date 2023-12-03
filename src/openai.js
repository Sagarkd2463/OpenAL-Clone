const { Configuration, OpenAIApi } = require('openai'); 

const API_KEY = ""; //api key 

const configuration = new Configuration({
    apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration); //initialize openai 
delete configuration.baseOptions.headers['User-Agent'];  //deleting user agent header which describes browser to be used 

export async function sendMsgToOpenAI(message) { //a function that request api to send message for the prompt that is written by user 
    const response = await openai.createCompletion({
        model:"text-davinci-003", //openai gpt model 
        prompt: message,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    return response.data.choices[0].text; //return the response received through api in an array into text form
}