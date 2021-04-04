;(() =>
{
    'use strict'
    for (const menu of document.querySelectorAll('.menu'))
    {
        const links = menu.querySelectorAll('a')

        for (const link of links)
        {
            if (link.href === window.location.href)
            {
                link.classList.add('current')
                break
            }
        }
    }
})();