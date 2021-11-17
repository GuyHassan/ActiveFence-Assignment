
export const initCrawlProperties = { startUrl: '', maxNumLink: ' ', maxDepth: ' ' };

export const isNumber = () => /^[0-9]*$/

//eslint-disable-next-line
export const isValidUrl = (url) =>
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/
        .test(url)

export const treeStyles = {
    display: 'absolute',
    top: '80',
    left: '40',
    color: 'white',
    fill: 'white',
    width: '100%'
}

export const typeStyles = {
    fontSize: '1em',
    verticalAlign: 'middle'
}