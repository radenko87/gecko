import { matchPath } from 'react-router-dom';





const allLinks = [

    '/',
    '/reservation',
    '/uber-uns',
    '/menu',
    '/o-nama',
    '/veranstaltungen',
    '/veranstaltungen/:alias',
    '/kontakt',
]

const linkTranslates = {


    'en': {
        '/': '/en',
        '/reservation': '/en/reservation',
        '/uber-uns': '/en/about-us',
        '/menu': '/en/menu',
        '/veranstaltungen': '/en/blog',
        '/veranstaltungen/:alias': '/en/blog/:alias',
        '/kontakt': '/en/contact',
    },
    'sr': {
        '/': '/sr',
        '/reservation': '/sr/rezervacija',
        '/uber-uns': '/sr/o-nama',
        '/menu': '/sr/meni',
        '/veranstaltungen': '/sr/novosti',
        '/veranstaltungen/:alias': '/sr/novosti/:alias',
        '/kontakt': '/sr/kontakt',
    },
}

export default function (link, lang) {
    let to = link;
    if (!lang) {
        lang = 'de';
    }

    if (lang !== 'de') {
        allLinks.some(route => {

            const match = matchPath(to, route);
            if (match && match.isExact) {
                console.log(route)
                to = to.replace(route.split(':')[0], linkTranslates[lang][route].split(':')[0])
            }
            return match && match.isExact;
        });
    }


    return to;
}