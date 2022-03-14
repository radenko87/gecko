import HomePage from './views/homePage';
import AboutUsPage from './views/aboutUsPage';
import ContactPage from './views/contactPage';
import ReservationPage from './views/reservationPage';
import MenuPage from './views/menuPage';
import EventsPage from './views/eventsPage';
import BlogDetailPage from './views/blogDetailPage';

const linkTranslates = {
    
    'en': {
        '/' : '/en',
        '/reservation' : '/en/reservation',
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

export const routes = [
    {
        path: "/",
        generateSeoTags: (data, lang) => {
            return {
                title: 'Početna'.translate(lang) + ' - GECKO | Sajtović Gastronomie & Event'.translate(lang),
                description: 'GECKO | Sajtović Gastronomie & Event'.translate(lang),
                'og:image': 'http://localhost:4000/uploads/share.png'
            }
        },

        component: HomePage,
        loadData: [
            (fetchFunction, lang, match) => {
                return fetchFunction('http://localhost:4000/home', {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    }
                }).then(res => res.json()).then((data) => {
                    return {
                        data
                    }
                })

            },
            (fetchFunction, lang, match) => {
                return fetchFunction('http://localhost:4000/items', {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    }
                }).then(res => res.json()).then((data) => {
                    return {
                       items: data
                    }
                })

            },
            (fetchFunction, lang, match) => {
                return fetchFunction('http://localhost:4000/blog/latest', {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    },
                    
                }).then(res => res.json()).then((result) => {

                    return {
                        latestBlog: result,
                    }
                })

            },
            (fetchFunction, lang, match) => {
                return fetchFunction('http://localhost:4000/categories', {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    }
                }).then(res => res.json()).then((data) => {
                    return {
                        categories: data
                    }
                })

            }

        ]

    },
    {
        path: "/uber-uns",
        generateSeoTags: (data, lang) => {
            return {
                title: 'O nama'.translate(lang) + ' - GECKO | Sajtović Gastronomie & Event'.translate(lang),
                description: 'GECKO | Sajtović Gastronomie & Event'.translate(lang),
                'og:image': 'http://localhost:4000/uploads/share.png'
            }
        },

        component: AboutUsPage,
        loadData: [
            (fetchFunction, lang, match) => {
                return fetchFunction('http://localhost:4000/aboutus', {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    }
                }).then(res => res.json()).then((data) => {
                    return {
                        data
                    }
                })

            },
            (fetchFunction, lang, match) => {
                return fetchFunction('http://localhost:4000/blog/latest', {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    },
                    
                }).then(res => res.json()).then((result) => {

                    return {
                        latestBlog: result,
                    }
                })

            }



        ]

    },
    
    {
        path: "/veranstaltungen",
        generateSeoTags: (data, lang) => {
            return {
                title: 'Događaji'.translate(lang) + ' - GECKO | Sajtović Gastronomie & Event'.translate(lang),
                description: 'GECKO | Sajtović Gastronomie & Event'.translate(lang),
                'og:image': 'http://localhost:4000/uploads/share.png'
            }
        },

        component: EventsPage,
        loadData: [
            // (fetchFunction, lang, match) => {
            //     return fetchFunction('http://localhost:4000/blog/latest', {
            //         method: 'GET',
            //         headers: {
            //             'content-type': 'application/json'
            //         },

            //     }).then(res => res.json()).then((result) => {

            //         return {
            //             latestBlog: result,
            //         }
            //     })

            // }
        ],
        loadDataWithQuery: [
            (fetchFunction, lang, match, query) => {
                return fetchFunction('http://localhost:4000/blog', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        page: query.page,
                        lang: lang
                    })
                }).then(res => res.json()).then((result) => {
                    return {
                        page: query.page ? query.page : 0,
                        items: result.items,
                        total: result.total
                    }
                })

            }
        ]


    },
    {
        path: "/menu",
        generateSeoTags: (data, lang) => {
            return {
                title: 'Jelovnik'.translate(lang) + ' - GECKO | Sajtović Gastronomie & Event'.translate(lang),
                description: 'GECKO | Sajtović Gastronomie & Event'.translate(lang),
                'og:image': 'http://localhost:4000/uploads/share.png'
            }
        },

        component: MenuPage,
        loadData: [
            
            (fetchFunction, lang, match) => {
                return fetchFunction('http://localhost:4000/categories', {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    }
                }).then(res => res.json()).then((data) => {
                    return {
                        data
                    }
                })

            },
            (fetchFunction, lang, match) => {
                return fetchFunction('http://localhost:4000/items', {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    }
                }).then(res => res.json()).then((data) => {
                    return {
                        items: data
                    }
                })

            },
            (fetchFunction, lang, match) => {
                return fetchFunction('http://localhost:4000/blog/latest', {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    },
                    
                }).then(res => res.json()).then((result) => {

                    return {
                        latestBlog: result,
                    }
                })

            },
            
        ],
        loadDataWithQuery: [
            // (fetchFunction, lang, match, query) => {
            //     return fetchFunction('http://localhost:4000/blog', {
            //         method: 'POST',
            //         headers: {
            //             'content-type': 'application/json'
            //         },
            //         body: JSON.stringify({
            //             page: query.page,
            //             lang: lang
            //         })
            //     }).then(res => res.json()).then((result) => {
            //         return {
            //             page: query.page ? query.page : 0,
            //             items: result.items,
            //             total: result.total
            //         }
            //     })

            // }
        ]


    },
    {
        path: "/reservation",
        generateSeoTags: (data, lang) => {
            return {
                title: 'Rezervacija stola'.translate(lang) + ' - GECKO | Sajtović Gastronomie & Event'.translate(lang),
                description: 'GECKO | Sajtović Gastronomie & Event'.translate(lang),
                'og:image': 'http://localhost:4000/uploads/share.png'
            }
        },

        component: ReservationPage,
        loadData: [

            (fetchFunction, lang, match) => {
                return fetchFunction('http://localhost:4000/blog/latest', {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    },
                    
                }).then(res => res.json()).then((result) => {

                    return {
                        latestBlog: result,
                    }
                })

            },
            (fetchFunction, lang, match) => {
                return fetchFunction('http://localhost:4000/tables', {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    },
                    
                }).then(res => res.json()).then((result) => {

                    return {
                        tables: result,
                    }
                })

            },
            
        ],
        loadDataWithQuery: [
            // (fetchFunction, lang, match, query) => {
            //     return fetchFunction('http://localhost:4000/blog', {
            //         method: 'POST',
            //         headers: {
            //             'content-type': 'application/json'
            //         },
            //         body: JSON.stringify({
            //             page: query.page,
            //             lang: lang
            //         })
            //     }).then(res => res.json()).then((result) => {
            //         return {
            //             page: query.page ? query.page : 0,
            //             items: result.items,
            //             total: result.total
            //         }
            //     })

            // }
        ]


    },
    
    {
        path: "/veranstaltungen/:alias",
        generateSeoTags: (data, lang) => {
            return {
                title: Object.translate(data, 'data.title', lang) + ' | '  +  'Događaji'.translate(lang) + ' - GECKO | Sajtović Gastronomie & Event'.translate(lang),
                description: Object.translate(data, 'data.shortDescriprion', lang),
                'og:image': 'http://localhost:4000' + Object.get(data, 'data.image')
            }
        },

        component: BlogDetailPage,
        loadData: [
            (fetchFunction, lang, match) => {
                return fetchFunction('http://localhost:4000/blog/latest', {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    },
                    
                }).then(res => res.json()).then((result) => {

                    return {
                        latestBlog: result,
                    }
                })

            },
            (fetchFunction, lang, match) => {
                return fetchFunction(`http://localhost:4000/blog/detail/${lang}/${match.params.alias}`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    },
                    
                }).then(res => res.json()).then((result) => {

                    return {
                        data: result,
                    }
                })

            }




        ]

    },


    {
        path: "/kontakt",
        generateSeoTags: (data, lang) => {
            return {
                title: 'Kontakt'.translate(lang) + ' - GECKO | Sajtović Gastronomie & Event'.translate(lang),
                description: 'GECKO | Sajtović Gastronomie & Event'.translate(lang),
                'og:image': 'http://localhost:4000/uploads/share.png'
            }
        },

        component: ContactPage,
        loadData: [
            (fetchFunction, lang, match) => {
                return fetchFunction(`http://localhost:4000/informations`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    },

                }).then(res => res.json()).then((result) => {

                    return {
                        data: result,
                    }
                })

            }

        ]

    },
];

export function generateRoutes(r) {
    let newRoutes = [];
    for(let i=0;i<r.length;i++){
        newRoutes.push(r[i]);

        newRoutes.push( {
            ...r[i],
            path: linkTranslates.en[r[i].path]
        })
        newRoutes.push( {
            ...r[i],
            path: linkTranslates.sr[r[i].path]
        })

    }
    return newRoutes;
}