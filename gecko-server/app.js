const express = require("express");
const http = require("http");
const port = process.env.PORT || 4000;
//const nodemailer = require('nodemailer');
const cors = require('cors')
const bodyParser = require("body-parser");
var compression = require('compression');
const fileUpload = require('express-fileupload');

const adminModule = new (require('./admin/admin'))();
const isAdminAuthenticated = require('./admin/auth');

const fs = require('fs');
const siteModule = new (require('./site/site'))();
const userAuth = require('./site/auth');
const userCheck = require('./site/check');

const app = express();
app.use(cors());
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use('/uploads', express.static('uploads'))
app.use(fileUpload());
const server = http.createServer(app);

server.listen(port, () => console.log(`Listening on port ${port}`));


/*
    ADMIN API ROUTES
*/

app.post('/admin/upload', isAdminAuthenticated, function (req, res) {
    console.log(req.files);

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }


    adminModule.upload(req.files.file, res)
    //res.send();
});

app.post('/admin/login', async (req, res) => {
    console.log(req.body);
    let result = await adminModule.login(req.body.username, req.body.password);
    res.send(result.response).status(result.status);
});

app.post('/admin/verify', isAdminAuthenticated, (req, res) => {
    res.send({ valid: true }).status(200);
});


app.post('/admin/updateOne/:collection/:id', isAdminAuthenticated, async (req, res) => {
    res.send(await adminModule.updateOne(req.params.id, req.params.collection, req.body));
})

app.delete('/admin/delete/:collection/:id', isAdminAuthenticated, async (req, res) => {
    res.send(await adminModule.delete(req.params.id, req.params.collection));

});



app.get('/admin/fetchOne/:collection/:id', isAdminAuthenticated, async (req, res) => {
    res.send(await adminModule.fetchOne(req.params.id, req.params.collection));

});


app.get('/admin/fetch/:collection', isAdminAuthenticated, async (req, res) => {

    res.send(await adminModule.fetch(req.params.collection));
});

app.post('/admin/home', isAdminAuthenticated, async (req, res) => {
    res.send(await adminModule.home(req.body));
});



app.get('/admin/home', isAdminAuthenticated, async (req, res) => {

    res.send(await adminModule.getHome());

});

app.post('/admin/aboutus', isAdminAuthenticated, async (req, res) => {
    res.send(await adminModule.aboutUs(req.body));
});



app.get('/admin/aboutus', isAdminAuthenticated, async (req, res) => {

    res.send(await adminModule.getAboutUs());

});



app.post('/admin/allowReservation/:id', isAdminAuthenticated, async (req, res) => {
    res.send(await adminModule.allowReservation(req.params.id, req.body.status));
});

app.get('/admin/newsNotification/:id', isAdminAuthenticated, async (req, res) => {

    res.send(await adminModule.sendNewsNotification(req.params.id));

});


app.get('/admin/reservations', isAdminAuthenticated, async (req, res) => {
    res.send(await adminModule.reservations());
});

app.post('/admin/information', isAdminAuthenticated, async (req, res) => {
    res.send(await adminModule.information(req.body));
});



app.get('/admin/information', isAdminAuthenticated, async (req, res) => {

    res.send(await adminModule.getInfo());

});



app.get('/home', async (req, res) => {

    res.send(await siteModule.home());

});
app.get('/aboutus', async (req, res) => {

    res.send(await siteModule.aboutus());
});
app.get('/informations', async (req, res) => {
    res.send(await siteModule.info());
});
app.get('/services/:category', async (req, res) => {

    res.send(await siteModule.services(req.params.category));

});
app.get('/services/:category/:lang/:alias', async (req, res) => {

    res.send(await siteModule.service(req.params.category, req.params.lang, req.params.alias));

});


app.post('/contact', async (req, res) => {

    res.send(await siteModule.contact(req.body));

});
app.get('/seo/sitemap', async (req, res) => {
    res.send(await siteModule.getSeoSitemap());
});


app.post('/seo/:lang', async (req, res) => {
    res.send(await siteModule.seo(req.params.lang, req.body.url));
});


app.get('/blog/latest', async (req, res) => {
    res.send(await siteModule.blogLatest());
});
app.get('/blog/latest/:lang/:alias', async (req, res) => {
    res.send(await siteModule.blogLatest(req.params.lang, req.params.alias));
});

app.get('/blog/app', async (req, res) => {
    res.send(await siteModule.appBlog());
});

app.get('/blog/detail/:lang/:alias', async (req, res) => {
    res.send(await siteModule.blogItem(req.params.lang, req.params.alias));
});

app.post('/blog', async (req, res) => {
    res.send(await siteModule.blog(req.body.page, req.body.lang));
});

app.post('/tables/check', async(req, res) => {
    res.send(await siteModule.checkTable(req.body.reservationDate, req.body.tableId));
})

app.get('/tables', async(req, res) => {
    res.send(await siteModule.tables());
})

app.get('/reservations/latest', userAuth, async (req, res) => {
    res.send(await siteModule.lastReservations(res.locals.uid));
});

app.get('/reservations/all', userAuth, async (req, res) => {
    res.send(await siteModule.reservations(res.locals.uid));
});

app.post('/reservations/send', userAuth, async (req, res) => {
    res.send(await siteModule.sendReservation(res.locals.uid, req.body));
});

app.post('/subscribe', userCheck, async (req, res) => {
    res.send(await siteModule.subscribe(res.locals.uid, req.body.token));
});

app.post('/login/google', async (req, res) => {
    res.send(await siteModule.loginWithGoogle(req.body.accessToken));
});
app.post('/login/facebook', async (req, res) => {
    res.send(await siteModule.loginWithFacebook(req.body.accessToken));
});
app.get('/categories', async (req, res) => {
    res.send(await siteModule.categories());
});
app.get('/items', async (req, res) => {
    res.send(await siteModule.items());
});

app.get('/user/verify', userAuth, async (req, res) => {
    res.send(await siteModule.userVerify(res.locals.uid));
});
