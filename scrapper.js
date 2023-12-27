const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const scrapeHotelPrice = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // You would use the selector for the price element found on the page.
    // Below is an example, you need to replace '.price-tag' with the correct selector.
    $('script').remove()
    $('iframe').remove()
    let price = $('body').text();
    price = price.replace(/\n/g, ' ');
    // console.log(response.data);
    // const regex = /Availability[\s\S]*/;
// const matches = price.match(regex);
const dataString = JSON.stringify(price, null, 2);

// Write the data to a file
fs.writeFileSync('hotels.txt', dataString, 'utf-8');
// if (matches && matches.length > 0) {
//     console.log(matches[0]); // Outputs the text starting from the specified sentence
// } else {
//     console.log('Phrase not found in text content.');
// }
// const regex = /Your regex here/g; // Modify this regex based on your data structure

// const matches = data.match(regex);
// const hotels = [];

// matches.forEach(match => {
//   // Extract hotel name and price from each match
//   // Modify this based on your actual data format
//   const [name, price] = extractHotelInfo(match);

//   hotels.push({ name, price });
// });

// Convert array to JSON
// const json = JSON.stringify(hotels);

// // Save to file
// fs.writeFile('hotels.json', json, 'utf8', (err) => {
//   if (err) throw err;
//   console.log('The file has been saved!');
// });
// const hotelRegex = /([a-zA-Z\s-]+(?:Opens in new window[a-zA-Z\s-]+)?)Show on map[\s\S]+?1 week, 2 adultsMAD ([\d,]+)/g;

// let match;
// const hotels = [];

// while ((match = hotelRegex.exec(matches)) !== null) {
//     const name = match[1].trim().replace('Opens in new window', '');
//     const price = match[2].replace(',', '');
//     hotels.push({ name, price });
// }

// Save to JSON file
// fs.writeFile('hotels.json', JSON.stringify(hotels, null, 2), (err) => {
//     if (err) {
//         console.error('Error writing file:', err);
//     } else {
//         console.log('File successfully written.');
//     }
// });
    return {
      price: price
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Failed to retrieve the webpage'
    };
  }
};

// Example usage:
const hotelUrl = 'https://www.booking.com/hotel/ma/agdal-1.en-gb.html?aid=304142&label=gen173nr-1FCAsojAFCGmFwcGFydGVtZW50LWFubmFraGlsLXJhYmF0SAlYBGiMAYgBAZgBCbgBF8gBDNgBAegBAfgBA4gCAagCA7gCyeKlrAbAAgHSAiRjZjQzMWRlNi02ZWVkLTQ1YzctYjgzMi1kNGQ3ZjliYjhlZGTYAgXgAgE&sid=bec05a6d7f2938e03ec5cbd9320a24db&all_sr_blocks=1118216801_384668310_2_0_0;checkin=2024-01-23;checkout=2024-01-30;dest_id=-43376;dest_type=city;dist=0;group_adults=2;group_children=0;hapos=2;highlighted_blocks=1118216801_384668310_2_0_0;hpos=2;matching_block_id=1118216801_384668310_2_0_0;nflt=sth%3D1;no_rooms=1;req_adults=2;req_children=0;room1=A%2CA;sb_price_type=total;sr_order=popularity;sr_pri_blocks=1118216801_384668310_2_0_0__22109;srepoch=1703678350;srpvid=6eaa518b48200148;type=total;ucfs=1&#availability';
scrapeHotelPrice(hotelUrl).then(data => {
  console.log(data);
});
