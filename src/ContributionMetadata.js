const axios = require('axios');

class ContributionMetadata {

    async getResponseBody(link) {
        return (await axios.get(link)).data;
    }

    async getMetadata(link) {
        let body = await this.getResponseBody(link);
        return body;
    }
}

module.exports = ContributionMetadata;

