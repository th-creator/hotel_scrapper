
const allData = require('./allData.json'); 
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const OpenAI = require('openai');

const openai = new OpenAI({apiKey:'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'});

const generate = async (data) => {
    const prompt = `
    Take a look to the scraped data from a booking link and extract 
   
    - Title
    - price
    - Number of Rooms
    
    Rules: 
    - Return only the JSON Array without any other text 

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
   `;
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-4",
    max_tokens:125
  });

  console.log(completion.choices[0].message.content);
  return JSON.parse(completion.choices[0].message.content);
}

const filterData = async () => {
    const dataHolder = allData.map(async (res, index) => {
        try {
            const response = await axios.get(res.url);
            const $ = cheerio.load(response.data);
            $('script').remove();
            $('iframe').remove();
            let price = $('body').text().replace(/\n/g, ' ');
            const dataString = JSON.stringify(price, null, 2);
            let infrastructure = res.facilities.map(e => e.name).join(' / ');
            let generated = await generate(dataString);
            return {
                id: index,
                name: res.name,
                url: res.url,
                type: res.type,
                description: res.description,
                stars: res.stars,
                price: generated[0].price,
                note: res.rating,
                starts: res.rating,
                reviews: res.reviews,
                checkIn: res.checkIn,
                checkOut: res.checkOut,
                email: res.checkOut,
                address: res.address.full,
                rooms: res.rooms,
                region: res.address.region,
                roomNumber: res.rooms.length,
                longitude: res.location.lng,
                lattitude: res.location.lat,
                infrastructure: infrastructure
            };
        } catch (error) {
            console.error(`Failed to process data for index ${index}: ${error}`);
        }
    });
    let dataStrings = JSON.stringify(await Promise.all(dataHolder.filter(Boolean)), null, 2);
    console.log(dataStrings);
    fs.writeFileSync('postHolder.json', dataStrings); // Write the data to a file
}

// Main execution
(async function main() {
    try {
        await filterData();
    } catch (err) {
        console.error('An error occurred:', err);
    }
})();
