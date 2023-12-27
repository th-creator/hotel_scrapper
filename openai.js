// import OpenAI from "openai";
const OpenAI = require('openai');
// import data from "./hotels";

const openai = new OpenAI({apiKey:'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'});


export default async function generate(data) {
    const prompt = `
    Take a look to the scraped data from a booking link and extract 
   
    - Title
    - price
    - Number of Rooms
    
    return them as JSON format only 
   
    Example:
   
    [
       {
           "title":"Exxample ",
           "price":50,
           "number_of_rooms":6
           
       }
   
   
       Scraped Data: ${data}
    ]
   `
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-4",
  });

  console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content
}

generate(data)