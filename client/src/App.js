import React, { useState } from 'react';
import { CrawlerProperties, TreeViewCrawl } from './components';
import { default as activefence_logo } from './assets/activefence-logo.png'

const AppCrawler = () => {
    const [crawlData, setCrawlData] = useState()
    return (
        <div className="crawler-app">
            <div className="row justify-content-center align-items-center">
                <img src={activefence_logo} alt="" />
            </div>
            <div className="container-fluid h-100 bg-dark text-dark">
                <hr />
                <CrawlerProperties setCrawlData={setCrawlData} />
                <TreeViewCrawl crawlData={crawlData} />
            </div>
        </div>
    )
}
export default AppCrawler;