# (Unofficial) Google Local Guides API
This npm package will give you functionality to get your 
contribution metadata from your google local guides profile. 

This package will scrape the data on this modal for you:
![example google local guides metadata modal](images/Example%20Page.png)

_Note: there is no authentication when using this package because it'll scrape your public profile page,
which is accessible to everyone._

## Quickstart
Installation
```shell script
npm install google-local-guides-api
```

Usage
```javascript
const ContributionMetadata = require('google-local-guides-api');

let contributionMetadata = new ContributionMetadata();

// This initializes your link into the response body -- has to be in async/await func
async function () {
    await contributionMetadata.init(link);

    // You can call get specific attributes like points
    let points = contributionMetadata.getPoints(); 
    
    // ...Or use getMetadata() to get all available attributes from you profile
    let metadata = contributionMetadata.getMetadata();
} 
```

What `link` are you talking about?  
The `link` that you need is your publically available local guides link found here:  
https://www.google.com/maps/contrib/  
 
When redirected to that link, the rest of the URL will populate with your google local guide ID and other information.   
You can just get the entire link and pass it in as the value as `link`.  
 
If you want to have a clean link, this is the structure that you can use:  
```
https://www.google.com/maps/contrib/0123456789  
``` 
The last path will be your numerical ID. 

## Endpoints
```javascript
const ContributionMetadata = require('google-local-guides-api');

let contributionMetadata = new ContributionMetadata();

// This initializes your link into the response body -- has to be in async/await func
async function () {
    await contributionMetadata.init(link);

    // You can call get specific attributes like points
    // These all return string type of a number associated with 
    // how many/how much for each attribute
    let points = contributionMetadata.getPoints(); 
    let level = contributionMetadata.getLevel();
    let reviews = contributionMetadata.getReviews();
    let ratings = contributionMetadata.getRatings();
    let questions = contributionMetadata.getQuestions();
    let placesAdded = contributionMetadata.getPlacesAdded();
    let edits = contributionMetadata.getEdits();
    let facts = contributionMetadata.getFacts();
    let videos = contributionMetadata.getVideos();
    let qa = contributionMetadata.getQA();
    let roadsAdded = contributionMetadata.getRoadsAdded();
    let listsPublished = contributionMetadata.getPublishedLists();
    
    // ...Or use getMetadata() to get all available attributes from you profile
    let metadata = contributionMetadata.getMetadata();
    // {
    //    points: string,
    //    level: string,
    //    reviews: string,
    //    ratings: string,
    //    questions: string,
    //    placesAdded: string,
    //    edits: string,
    //    facts: string,
    //    videos: string,
    //    qa: string,
    //    roadsAdded: string,
    //    listsPublished: string
    // }
} 
```
