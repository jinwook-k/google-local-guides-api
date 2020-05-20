const axios = require('axios');

class ContributionMetadata {
    /**
     * Gets how many points is associated with your Local Guide Profile
     * @public
     * @param {string} body Entire web page body
     * @return {string} # of points
     */
    getPoints(body) {
        let pattern = /((\d|,)+) Points/g;
        return this.getMatch(pattern, body);
    }

    /**
     * Gets what level you are on your Local Guide Profile
     * @public
     * @param {string} body Entire web page body
     * @return {string} your level
     */
    getLevel(body) {
        let pattern = /Level (\d+) Local Guide/g;
        return this.getMatch(pattern, body);
    }

    /**
     * Gets how many reviews you have left associated with your Local Guide Profile
     * @public
     * @param {string} body Entire web page body
     * @return {string} # of reviews
     */
    getReviews(body) {
        let pattern = /(\d+) reviews/g;
        return this.getMatch(pattern, body);
    }

    /**
     * Gets how many ratings you gave associated with your Local Guide Profile
     * @public
     * @param {string} body Entire web page body
     * @return {string} # of ratings
     */
    getRatings(body) {
        let pattern = /(\d+) ratings/g;
        return this.getMatch(pattern, body);
    }

    /**
     * Gets how many questions you left associated with your Local Guide Profile
     * @public
     * @param {string} body Entire web page body
     * @return {string} # of questions
     */
    getQuestions(body) {
        let pattern = /(\d+) answers/g;
        return this.getMatch(pattern, body);
    }

    /**
     * Gets how many places you added associated with your Local Guide Profile
     * @public
     * @param {string} body Entire web page body
     * @return {string} # of places added
     */
    getPlacesAdded(body) {
        let pattern = /(\d+) places added/g;
        return this.getMatch(pattern, body);
    }

    /**
     * Gets how many edits you made associated with your Local Guide Profile
     * @public
     * @param {string} body Entire web page body
     * @return {string} # of edits
     */
    getEdits(body) {
        let pattern = /(\d+) edits/g;
        return this.getMatch(pattern, body);
    }

    /**
     * Gets how many facts you left associated with your Local Guide Profile
     * @public
     * @param {string} body Entire web page body
     * @return {string} # of facts
     */
    getFacts(body) {
        let pattern = /(\d+) facts/g;
        return this.getMatch(pattern, body);
    }

    /**
     * Gets how many videos you uploaded associated with your Local Guide Profile
     * @public
     * @param {string} body Entire web page body
     * @return {string} # of videos
     */
    getVideos(body) {
        let pattern = /(\d+) videos/g;
        return this.getMatch(pattern, body);
    }

    /**
     * Gets how many Q&As you answered associated with your Local Guide Profile
     * @public
     * @param {string} body Entire web page body
     * @return {string} # of Q&As
     */
    getQA(body) {
        let pattern = /(\d+) Q\\\\u0026A/g;
        return this.getMatch(pattern, body);
    }

    /**
     * Gets how many roads you added associated with your Local Guide Profile
     * @public
     * @return {string} # of roads
     */
    getRoadsAdded(body) {
        let pattern = /(\d+) roads added/g;
        return this.getMatch(pattern, body);
    }

    /**
     * Gets how many lists you published associated with your Local Guide Profile
     * @public
     * @param {string} body Entire web page body
     * @return {string} # of published lists
     */
    getPublishedLists(body) {
        let pattern = /(\d+) published lists/g;
        return this.getMatch(pattern, body);
    }

    /**
     * Gets all the metadata in one object
     * @public
     * @param {string} link Link to the contribution page
     * @return {JSON} metadata
     */
    async getMetadata(link) {
        let body = await this.getResponseBody(link);

        return {
            points: this.getPoints(body),
            level: this.getLevel(body),
            reviews: this.getReviews(body),
            ratings: this.getRatings(body),
            questions: this.getQuestions(body),
            placesAdded: this.getPlacesAdded(body),
            edits: this.getEdits(body),
            facts: this.getFacts(body),
            videos: this.getVideos(body),
            QA: this.getQA(body),
            roadsAdded: this.getRoadsAdded(body),
            listsPublished: this.getPublishedLists(body)
        }
    }

    /**
     * Gets the match result based on the pattern searching through the response body of the web page
     * @private
     * @param {RegExp} pattern Pattern used to find matches within the body
     * @param {string} body Entire web page body
     * @return {string} first group match result if found, empty string if not found.
     */
    getMatch(pattern, body) {
        let matches = pattern.exec(body);
        return matches.length > 0 ? matches[1] : "";
    }

    /**
     * Gets the web page response body as a string
     * @private
     * @param {string} link Link to your contribution page
     * @return {string} response data which is a string of the entire web page
     */
    async getResponseBody(link) {
        return (await axios.get(link)).data;
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

