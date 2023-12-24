
const allDate = require('./allData.json'); 
const fs2 = require('fs');

const filterTheData = async () => {
    // in posts table
    const dataHolder = []
    allDate.forEach(async (res, index) => {
        dataHolder.push({
                id: index,
                name: res.name,
                url: res.url,
                type: res.type,
                description: res.description,
                stars: res.stars,
                price: res.price,
                currency: 'MAD',
                rating: res.rating,
                reviews: res.reviews,
                breakfast: res.breakfast,
                checkIn: res.checkIn,
                checkOut: res.checkOut,
                location: {
                    lat: res.location.lat,
                    lng: res.location.lng
                },
                address: res.address.full,
                rooms: res.rooms,
                region: res.address.region,
                image: res.image
            }
        )
    })
    let dataString = JSON.stringify(dataHolder, null, 2);
    fs2.writeFileSync('postHolder.json', dataString); // Write the data to a file

}
// Main execution
(async function main() {
    try {
        filterTheData()
    } catch (err) {
        console.error('An error occurred:', err);
    }
})();