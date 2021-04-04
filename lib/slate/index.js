'use strict'

const fs = require('fs')
const template = require('./template')

module.exports = function slate ()
{
    const entries = require(process.cwd() + '/tmp/entries.json')

    for (const entry of entries)
    {
        if (!entry.title)
        {
            const match = entry.html.match(/<h1.*>(.*)<\/h1>/i)

            if (match)
            {
                entry.title = match[1]
            }
            else
            {
                throw `failed to determine the title of entry ${ entry.path }`
            }
        }

        const outputPathRel = entry.path.replace('source', 'output').replace(/\.md$/i, '.html')
        console.log(outputPathRel)
        fs.writeFileSync(`${ process.cwd() }/${ outputPathRel }`, template(entry))
    }

    fs.writeFileSync(`${ process.cwd() }/output/script.js`, fs.readFileSync(`${ __dirname }/template/script.js`))
    fs.writeFileSync(`${ process.cwd() }/output/style.css`, fs.readFileSync(`${ __dirname }/template/style.css`))
}