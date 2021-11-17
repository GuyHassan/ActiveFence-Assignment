import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.css'
import Tree from 'react-animated-tree'
import { treeStyles, typeStyles } from '../assets/utils';

const TreeViewCrawl = ({ crawlData }) => {
    const [stateData, setStateData] = useState({})
    
    // on new search
    useEffect(() => {
        console.log('Data is Updated - ', crawlData);
        if (typeof crawlData === 'object')
            setStateData(crawlData)
    }, [crawlData])

    // when the application is launched
    useEffect(() => {
        const url = 'http://localhost:3001'
        axios.get(`${url}/getCrawlData`).then(response => {
            if (typeof response.data === 'object')
                setStateData(response.data)
        }).catch(error => { console.error(error) })
    }, [])

    return (
        <div className="row justify-content-center align-items-center bg-dark">
            <Tree content="Crawl Items" type="🌳" open style={treeStyles}>
                {Object.keys(stateData).map((key, iParent) => {
                    return <Tree key={iParent} content={<a
                        key={iParent}
                        href={key}
                        target="_blank"
                        style={{ cursor: 'pointer' }}
                        rel="noreferrer">{key}</a>} type={stateData[key]?.length ? '🎁' : '❌'} style={typeStyles}>
                        {stateData[key]?.map((child, iChild) => {
                            return <Tree
                                type="❌"
                                content={<a
                                    key={iChild}
                                    href={child}
                                    target="_blank"
                                    style={{ cursor: 'pointer' }}
                                    rel="noreferrer">{`Child - ${iChild + 1}`}</a>}
                                style={{ color: '#63b1de' }}
                            />
                        })}
                    </Tree>
                })}
            </Tree>
        </div >
    )
}

export default TreeViewCrawl;