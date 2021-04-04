'use strict' // 2021-02-09 07.02

const fs = require('fs')
const xdDirScan = require('./util/xdDirScan')
const xdFileWrite = require('./util/xdFileWrite')
const xdStringFilter = require('./util/xdStringFilter')
const Config = require('./Config')

module.exports = function tskReadHTML (cfg)
{
    const config = new Config(cfg)
    if (process.argv.includes('-debug')) console.log(config)

    const cwd = process.platform === 'win32' ? process.cwd().replace(/\\/g, '/') : process.cwd()
    const abspathSourcedir  = `${ cwd }/${ config.sourceDir }`
    const abspathOutputfile = `${ cwd }/${ config.outputFile }`

    //

    const paths = xdDirScan(abspathSourcedir, 'files')
        .map(path => `${ config.sourceDir }/${ path }`)
        .filter(relpath => xdStringFilter(relpath, { whitelist: config.whitelist, blacklist: config.blacklist }))
    const entries = []

    for (const relpath of paths)
    {
        console.log(relpath)
        const source = fs.readFileSync(`${ cwd }/${ relpath }`, 'utf8')
        let data, html
        const datablock = source.match(/^\s*---((.|\n)*?)---/)

        if (datablock)
        {
            try
            {
                data = JSON.parse(datablock[1])
            }
            catch (err)
            {
                throw `failed to parse JSON data block in source file ${ relpath }:\n${ err.message }`
            }

            html = source.replace(datablock[0], '')
        }
        else
        {
            data = {}
            html = source
        }

        const entry = {
            path: relpath,
            html
        }

        for (const prop in data)
        {
            if (entry[prop]) throw `data block may not contain 'path' or 'html' properties`
            entry[prop] = data[prop]
        }

        entries.push(entry)
    }

    console.log(`${ paths.length } ${ paths.length === 1 ? 'file' : 'files' }`)

    if (fs.existsSync(abspathOutputfile))
    {
        console.log('\noutput file already exists. merging')
        const exentries = require(abspathOutputfile)
        if (!(exentries instanceof Array)) throw `existing output file does not contain an array of entries`
        xdFileWrite(`${ abspathOutputfile }`, JSON.stringify([...exentries, ...entries], null, 4))
    }
    else
    {
        xdFileWrite(`${ abspathOutputfile }`, JSON.stringify(entries, null, 4))
    }
}