const axios = require('axios');

class ContributionMetadata {

    async getResponseBody(link) {
        return (await axios.get(link)).data;
    }

    getPoints(body) {
        let pattern = /((\d|,)+) Points/g;
        let matches = pattern.exec(body);

        return matches.length > 0 ? matches[1] : "";
    }

    async getMetadata(link) {
        let body = await this.getResponseBody(link);
        let points = this.getPoints(body);

        return points;
    }
}

module.exports = ContributionMetadata;

async function run() {
    let link = "https://www.google.com/maps/contrib/107673332497849211058/photos/@47.630274,-122.2373958,12z/data=!4m3!8m2!3m1!1e1";
    let foo = new ContributionMetadata();
    let data = foo.getMetadata(link);

    return data;
}

run().then(data => {
    console.log('data: ', data);
})

