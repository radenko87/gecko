import App from './App';
import React from 'react';
import { StaticRouter, matchPath } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { routes, generateRoutes } from './routesList';

const fetch = require('node-fetch')

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);


const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const context = {};
    console.log(req.url);

    let lang = 'de';
    console.log(req.hostname);

    if (req.path.indexOf('/en') !== -1) {
      lang = 'en';
    } else if (req.path.indexOf('/sr') !== -1) {
      lang = 'sr';
    }


    let initialData = {

    }
    let generateSeoTags = null;

    // inside a request
    const promises = [];
    // use `some` to imitate `<Switch>` behavior of selecting only
    // the first to match
    let routesList = generateRoutes(routes);
    routesList.some(route => {
      // use `matchPath` here

      const match = matchPath(req.path, route);
      if (match && match.isExact) {

        if (route.generateSeoTags){
          generateSeoTags = route.generateSeoTags;
        }


        for (let i = 0; i < route.loadData.length; i++) {
          promises.push(route.loadData[i](fetch, lang, match));
        }

        if (route.loadDataWithQuery) {
          for (let i = 0; i < route.loadDataWithQuery.length; i++) {
            promises.push(route.loadDataWithQuery[i](fetch, lang, match, req.query));
          }

        }
      }
      return match && match.isExact;
    });







    let promisesRes = await Promise.all(promises);


    for (let i = 0; i < promisesRes.length; i++) {
      initialData = {
        ...initialData,
        ...promisesRes[i]
      }
    }


    let metaTags = generateSeoTags ? generateSeoTags(initialData, lang) : { };


    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App metaTags={metaTags} lang={lang} serverFetch={fetch} initialData={initialData} />
      </StaticRouter>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {

      res.status(200).send(
        `<!doctype html>
        <html lang="">
          <head>
              <meta name="color-scheme" content="only">
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta charset="utf-8" />
              <title>${metaTags.title}</title>
              <meta name="description" content="${metaTags.description}" />
      
              <meta property="og:title"              content="${metaTags.title}" />
              <meta property="og:description"        content="${metaTags.description}" />
              <meta property="og:image"              content="${metaTags['og:image']}" />
              <meta name="viewport" content="width=device-width, initial-scale=1">
              ${
        assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''
        }
              ${
        process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
          </head>
          <body>
              <div id="root">${markup}</div>
              <script>async function WebpIsSupported(){if(!self.createImageBitmap)return!1;const e=await fetch("data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=").then(e=>e.blob());return createImageBitmap(e).then(()=>!0,()=>!1)}async function checkWebp(){if(localStorage.getItem("_webpSupport"))return void(window._webpSupport="1");await WebpIsSupported()&&(window._webpSupport="1",localStorage.setItem("_webpSupport","1"))}checkWebp();</script>
          </body>
        </html>`
      );
    }
  });

export default server;
