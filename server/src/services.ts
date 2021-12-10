import express, { Request, Response } from 'express'
import cors from 'cors';
import * as cheerio from 'cheerio';
import axios from 'axios';
import { isValidUrl } from './utils';

const app = express()
const port = 3001
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// inital variables
const myUrls: Array<string | undefined> = []
let visitedUrls: object = {}
let hasMore = { maxDepth: 0, maxLinks: 0 }

//get link url and return the child links of this url
const getChildsLinks = async (url: string) => {
    if (visitedUrls.hasOwnProperty(url)) return []

    const response = await axios(url)
    const $ = cheerio.load(response.data)

    const links = $('a')
        .map((_, link: any) => link.attribs.href)
        .get()
        .filter((link: any) => isValidUrl(link))

    visitedUrls = { ...visitedUrls, [url]: links };

    return links.length >= hasMore.maxLinks ? links.slice(0, hasMore.maxLinks) : links
}

// search as a bfs crawling 
const bfsCrawl = async (): Promise<string> => {
    console.log('Amount Links - ', myUrls.length);
    if (!myUrls.length || !hasMore.maxDepth || hasMore.maxLinks <= myUrls.length) return 'Finish Searching!';

    const currentLink: string = myUrls.shift()!;

    try {
        const getChilds = await getChildsLinks(currentLink);
        myUrls.push(...getChilds)
        hasMore.maxDepth -= 1
    }
    finally {
        return bfsCrawl()
    }
}

app.post('/crawl', (req: Request, res: Response) => {
    const { startUrl, maxNumLink, maxDepth } = req.body;
    console.log('startUrl: ', startUrl, '\nmax Number Link: ', maxNumLink, '\nmax Depth: ', maxDepth)

    hasMore = { maxDepth: parseInt(maxDepth), maxLinks: parseInt(maxNumLink) }

    if (!visitedUrls.hasOwnProperty(startUrl)) myUrls.unshift(startUrl)
    
    bfsCrawl().then(searchIsDone => {
        console.log(searchIsDone)
        res.send(visitedUrls);
    })
})

app.get('/getCrawlData', (req: Request, res: Response) => {
    if (Object.keys(visitedUrls).length)
        res.send(visitedUrls)
    else res.send('No Data Searching!')
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})