**Installation**
1. Clone the repository

1. Run `npm install puppeteer` to install Puppeteer, **OR** copy the imdbGeneral.js file to your Puppeteer folder.

**Running**
1. Open imdbGeneral.js and change the `titleID` variable and the desired number of seasons `numSeasons`.

2. Run the script with `node imdbGeneral.js`

3. Results will be a text file for each season in JSON format:

[{
    "episode": 1,
    "title": "Winter Is Coming",
    "rating": 9.1,
    "votes": 38632
},{
    "episode": 2,
    "title": "The Kingsroad",
    "rating": 8.8,
    "votes": 29279
},{
    "episode": 3,
    "title": "Lord Snow",
    "rating": 8.7,
    "votes": 27691
},{
    "episode": 4,
    "title": "Cripples, Bastards, and Broken Things",
    "rating": 8.8,
    "votes": 26282
},{
    "episode": 5,
    "title": "The Wolf and the Lion",
    "rating": 9.1,
    "votes": 27346
},{
    "episode": 6,
    "title": "A Golden Crown",
    "rating": 9.2,
    "votes": 27076
},{
    "episode": 7,
    "title": "You Win or You Die",
    "rating": 9.2,
    "votes": 27551
},{
    "episode": 8,
    "title": "The Pointy End",
    "rating": 9.0,
    "votes": 25640
},{
    "episode": 9,
    "title": "Baelor",
    "rating": 9.6,
    "votes": 36209
},{
    "episode": 10,
    "title": "Fire and Blood",
    "rating": 9.5,
    "votes": 31782
}]