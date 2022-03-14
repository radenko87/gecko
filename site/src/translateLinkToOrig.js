import { matchPath } from 'react-router-dom';


const allLinks = [

    {
        path: '/',
        orig: '/',
        lang: 'de'
    },
    {
        path: '/reservation',
        orig: '/reservation',
        lang: 'de'
    },
    {
        path: '/uber-uns',
        orig: '/uber-uns',
        lang: 'de'
    },
    {
        path: '/menu',
        orig: '/menu',
        lang: 'de'
    },
    {
        path: '/veranstaltungen',
        orig: '/veranstaltungen',
        lang: 'de'
    },
    {
        path: '/veranstaltungen/:alias',
        orig: '/veranstaltungen/:alias',
        lang: 'de'
    },
    {
        path: '/kontakt',
        orig: '/kontakt',
        lang: 'de'
    },

    {
        path: '/en',
        orig: '/',
        lang: 'en'
    },
    {
        path: '/en/reservation',
        orig: '/reservation',
        lang: 'en'
    },
    {
        path: '/en/about-us',
        orig: '/uber-uns',
        lang: 'en'
    },
    {
        path: '/en/menu',
        orig: '/menu',
        lang: 'en'
    },
    {
        path: '/en/blog',
        orig: '/veranstaltungen',
        lang: 'en'
    },
    {
        path: '/en/blog/:alias',
        orig: '/veranstaltungen/:alias',
        lang: 'en'
    },
    {
        path: '/en/contact',
        orig: '/kontakt',
        lang: 'en'
    },

    {
        path: '/sr',
        orig: '/',
        lang: 'sr'
    },
    {
        path: '/sr/reservation',
        orig: '/reservation',
        lang: 'sr'
    },
    {
        path: '/sr/o-nama',
        orig: '/uber-uns',
        lang: 'sr'
    },
    {
        path: '/sr/meni',
        orig: '/menu',
        lang: 'sr'
    },
    {
        path: '/sr/novosti',
        orig: '/veranstaltungen',
        lang: 'sr'
    },
    {
        path: '/sr/novosti/:alias',
        orig: '/veranstaltungen/:alias',
        lang: 'sr'
    },
    {
        path: '/sr/kontakt',
        orig: '/kontakt',
        lang: 'sr'
    },


]

export default function (link){

    let newLink;
    allLinks.some(route => {

        const match = matchPath(link, route.path);
        if (match && match.isExact) {
            newLink = link.replace(route.path.split(':')[0], route.orig.split(':')[0]);
        }
        return match && match.isExact;
    });

    return newLink;
}