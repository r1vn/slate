'use strict'

module.exports = function template (entry)
{
    return `
    
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${ entry.title } - slate</title>
    <base href="/slate/">
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
</head>
<body>

    <div class="root">
    
        <a href="" class="header">slate</a>
        
        <div class="menu">
            <a href="amet.html">amet</a>
            <a href="elit.html">elit</a>
            <a href="enim.html">enim</a>
            <a href="excepteur.html">excepteur</a>
            <a href="dictum.html">dictum</a>
        </div>
        
        <div class="article">
            ${ entry.html }
        </div>
        
        <div class="menu reverse">
            <a href="amet.html">amet</a>
            <a href="elit.html">elit</a>
            <a href="enim.html">enim</a>
            <a href="excepteur.html">excepteur</a>
            <a href="dictum.html">dictum</a>
        </div>
        
        <a href="" class="header">slate</a>
        
    </div>
</html>
    
    `
}