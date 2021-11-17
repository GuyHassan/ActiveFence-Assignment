import React, { useState } from 'react';
import './style.css';
import { initCrawlProperties, isNumber, isValidUrl } from '../assets/utils';
import axios from 'axios';

const CrawlerProperties = ({ setCrawlData }) => {
  const [crawlProperties, setCrawlProperties] = useState(initCrawlProperties);

  const validateInputs = () => {
    const { maxNumLink, maxDepth, startUrl } = crawlProperties;
    return isNumber().test(maxNumLink) && isNumber().test(maxDepth) && isValidUrl(startUrl)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      setCrawlData('Waiting....')
      const url = 'http://localhost:3001'
      const response = await axios.post(`${url}/crawl`, crawlProperties);
      setCrawlData(response.data)
      return;
    }
    alert('One or more fields are not valid!')

    console.log(crawlProperties);
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCrawlProperties(p => ({ ...p, [name]: value }))
  }

  return (
    <div className="row justify-content-center align-items-center h-50">
      <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
        <form action="" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name='startUrl' className="form-control" placeholder="Start Link" onChange={handleChange} />
          </div>
          <div className="form-group">
            <input type="text" name='maxNumLink' className="form-control" placeholder="Max num of links" onChange={handleChange} />
          </div>
          <div className="form-group">
            <input type="text" name="maxDepth" className="form-control" placeholder="Max Depth" onChange={handleChange} />
          </div>
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Go !</button>
          </span>
        </form>
      </div>
    </div>
  );
}

export default CrawlerProperties;
