exports.build =
[
    {
        module: 'lib/init'
    },
    {
        module: 'lib/tsk-read-html',
        config:
        {
            sourceDir: 'source',
            whitelist: [/\.html$/i],
            blacklist: [],
            outputFile: 'tmp/entries.json'
        }
    },
    {
        module: 'lib/slate'
    },
    {
        module: 'lib/tsk-serve',
        config:
        {
            dir: `output`,
            port: 1337,
            redirects: [url => url === '/' ? '/slate' : url],
            rewrites: [path => path.replace('slate', '')],
            autoindex: true
        }
    }
]