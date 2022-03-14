const fs = require('fs');
const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
const fetch = require('node-fetch');
const constants = require('./constants');

var nodemailer = require('nodemailer');

const SMTPServer = 'mail.novamedia.agency';
const SMTPPort = 465;
const SMTPUsername = 'service@novamedia.agency';
const SMTPPassword = 'u2FL_+]g,Hw&';



let db;
const dbConnect = require('../db');
dbConnect()
    .then((conn) => {
        db = conn;
    })
    .catch((e) => {
        console.log('DB error')
    })

class Site {
    constructor(props) {

    }

    async contact(obj) {
        await db.collection('contacts').insertOne({
            ...obj,
            timestamp: Math.floor(new Date().getTime() / 1000)
        })

        var transporter = nodemailer.createTransport({
            host: SMTPServer,
            port: SMTPPort,
            secure: true,
            requireTLS: true,
            auth: {
                user: SMTPUsername,
                pass: SMTPPassword
            },
            tls: {
                rejectUnauthorized: false
            }
        });



        var mailOptions = {
            from: SMTPUsername,
            to: 'stanojevic.milan97@gmail.com',
            subject: obj.subject,
            html: `<html>
                <body>
                    <table>
                    <tr>
                        <td>Name</td>
                        <td>${obj.firstName} ${obj.lastName}</td>
                    </tr>
                    <tr>
                        <td>E-mail</td>
                        <td>${obj.email}</td>
                    </tr>
                    <tr>
                    <td>Telefon</td>
                    <td>${obj.phoneNumber}</td>
                </tr>

                    <tr>
                        <td>Subject</td>
                        <td>${obj.subject}</td>
                    </tr>
                    </table>
                    <p>${obj.message}</p>
                </body>
                </html>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        mailOptions.to = 'davor.stojanovich@gmail.com';

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return { error: null }
    }

    async home() {
        let res = await db.collection('home').find({}).toArray();
        if (res.length) {
            return res[0]
        } else {
            return {}
        }
    }

    async aboutus() {
        let res = await db.collection('aboutus').find({}).toArray();
        if (res.length) {
            return res[0]
        } else {
            return {}
        }
    }




    async services(category) {
        let res = await db.collection('services').find({ category: parseInt(category) }).toArray();
        return res;
    }


    async blogCategories() {
        let res = await db.collection('blogCategories').find({}).toArray();
        return res;
    }
    async blogTags() {
        let res = await db.collection('blog').find({}).toArray();
        let tags = {};
        for (let i = 0; i < res.length; i++) {
            tags[res[i].tags]

            for (var key in res[i].tags) {
                if (res[i].tags.hasOwnProperty(key)) {
                    //alert(name);
                    if (!tags[key]) {
                        tags[key] = {};
                    }

                    for (let j = 0; j < res[i].tags[key].length; j++) {
                        tags[key][res[i].tags[key][j]] = res[i].tags[key][j];
                    }
                }
            }

        }

        for (var key in tags) {
            if (tags.hasOwnProperty(key)) {
                tags[key] = Object.values(tags[key])
            }
        }

        return tags;
    }

    async appBlog() {
        let query = {};

        let res = await db.collection('blog').find(query).sort({ _id: -1 }).toArray();

        return res;
    }


    async blog(page = 0, lang = 'ba') {

        let query = {};

        let res = await db.collection('blog').find(query).skip(page * 9).limit(9).sort({ _id: -1 }).toArray();

        for (let i = 0; i < res.length; i++) {
            let cat = await db.collection('blogCategories').find({ _id: ObjectID(res[i].category) }).toArray();
            if (cat.length) {
                res[i].category = cat[0]
            }
        }

        return {
            items: res,
            total: await db.collection('blog').find(query).count()
        };
    }

    async blogLatest(lang = 'ba', alias) {
        let query = {};
        if (lang && alias) {
            query['alias.' + lang] = { $ne: alias };
        }
        let res = await db.collection('blog').find(query).limit(3).sort({ _id: -1 }).toArray();


        return res;
    }



    async blogItem(lang = 'ba', alias) {
        let query = {};
        query['alias.' + lang] = alias;

        let res = await db.collection('blog').find(query).toArray();
        if (res.length) {

            return res[0]
        } else {
            return {}
        }
    }

    async service(category = 0, lang = 'ba', alias) {
        let query = { category: parseInt(category) };
        query['alias.' + lang] = alias;

        let res = await db.collection('services').find(query).toArray();
        if (res.length) {
            return res[0]
        } else {
            return {}
        }
    }

    async seo(lang = 'ba', url) {
        let query = {};
        query['url.' + lang] = url;

        let res = await db.collection('seo').find(query).toArray();
        if (res.length) {
            return res[0]
        } else {
            return {}
        }
    }


    async getSeoSitemap() {
        let seo = await db.collection('seo').find().toArray();
        return seo;
    }

    async checkTable(reservationDate, tableId) {
        let reservation = await db.collection('reservations').find({ reservationDate: {$gte: reservationDate - 40*60, $lte: reservationDate + 40*60 }, tableId: tableId, allowed: true }).toArray();
        if (reservation.length) {
            return { status: 1 };
        } else {
            return { status: 0 };
        }

    }


    async reservations(uid) {
        let result = await db.collection('reservations').find({ 'uid': uid }).sort({ _id: -1 }).toArray();
        for (let i = 0; i < result.length; i++) {
            let table = await db.collection('tables').find({ _id: ObjectID(result[i].tableId) }).toArray();

            if (table.length) {
                result[i].tableNumber = table[0].number;
            }
        }

        return result;
    }

    async lastReservations(uid) {
        let result = await db.collection('reservations').find({ 'uid': uid, }).sort({ _id: -1 }).limit(3).toArray();
        for (let i = 0; i < result.length; i++) {
            let table = await db.collection('tables').find({ _id: ObjectID(result[i].tableId) }).toArray();

            if (table.length) {
                result[i].tableNumber = table[0].number;
            }
        }
        return result;

    }


    async sendReservation(uid, obj) {
        await db.collection('reservations').insertOne({
            tableId: obj.tableId,
            reservationDate: parseInt(obj.reservationDate),
            numberOfPeople: obj.numberOfPeople,
            timestamp: Math.floor(new Date().getTime() / 1000),
            uid: uid,
            allowed: false
        });

        return { error: null }
    }
    async info() {
        let res = await db.collection('informations').find({}).toArray();
        if (res.length){
            return res[0]
        }else{
            return {}
        }
    }

    async subscribe(uid, token) {
        let subscriber = await db.collection('subscribers').find({ token: token }).toArray();
        if (subscriber.length) {
            await db.collection('subscribers').updateOne({ token: token }, {
                $set: {
                    token: token,
                    timestamp: Math.floor(new Date().getTime() / 1000),
                    uid: uid,
                }
            });

        } else {

            await db.collection('subscribers').insertOne({
                token: token,
                timestamp: Math.floor(new Date().getTime() / 1000),
                uid: uid,
                news: true,
                reservations: true,
            });
        }
        return { error: null }

    }


    async tables() {
        let currTimestamp = Math.floor(new Date().getTime() / 1000);


        let result = await db.collection('tables').find({}).toArray();

        for (let i = 0; i < result.length; i++) {
            let reservation = await db.collection('reservations').find({ reservationDate: {$gte: currTimestamp - 40*60, $lte: currTimestamp + 40*60 }, tableId: result[i]._id.toString(), allowed: true }).toArray();
            if (reservation.length) {
                result[i].status = 1;
            } else {
                result[i].status = 0;
            }
        }

        return result;
    }


    async loginWithFacebook(accessToken) {

        let userInfoRes = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
            },
        });


        let userInfo = await userInfoRes.json();

        let user = await db.collection('users').find({ type: 'facebook-user', userId: userInfo.id }).toArray();
        if (user.length) {

            let userObject = {

            };

            if (userInfo.name) {
                userObject.name = userInfo.name;
            }

            if (userInfo.email) {
                userObject.email = userInfo.email
            }

            await db.collection('users').updateOne({ _id: user[0]._id }, { $set: userObject });

            let token = jwt.sign({ "id": user[0]._id }, constants.jwtSecretKey, { algorithm: 'HS256', expiresIn: '30d' });
            return {
                token: token
            }

        } else {
            let userObject = {
                _id: ObjectID(),
                type: 'facebook-user',
                userId: userInfo.id,
                name: userInfo.name,
                email: userInfo.email,
                registerTimestamp: Math.floor(new Date().getTime() / 1000)
            }

            await db.collection('users').insertOne(userObject);
           


            let token = jwt.sign({ "id": userObject._id }, constants.jwtSecretKey, { algorithm: 'HS256', expiresIn: '30d' });
            return {
                token: token
            }

        }
    }

    async loginWithGoogle(accessToken) {
        console.log(accessToken);
        let userInfoRes = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
            },
        });


        let userInfo = await userInfoRes.json();
        console.log(userInfo);
        let user = await db.collection('users').find({ type: 'google-user', userId: userInfo.sub }).toArray();
        if (user.length) {

            let userObject = {

            };

            if (userInfo.name) {
                userObject.name = userInfo.name;
            }

            if (userInfo.email) {
                userObject.email = userInfo.email
            }

            if (userInfo.picture){
                userObject.profilePhoto = userInfo.picture;
            }

            await db.collection('users').updateOne({ _id: user[0]._id }, { $set: userObject });

            let token = jwt.sign({ "id": user[0]._id }, constants.jwtSecretKey, { algorithm: 'HS256', expiresIn: '30d' });
            return {
                token: token
            }


        } else {
            let userObject = {
                _id: ObjectID(),
                type: 'google-user',
                userId: userInfo.sub,
                name: userInfo.name,
                email: userInfo.email,
                picture: userInfo.picture,
                registerTimestamp: Math.floor(new Date().getTime() / 1000)
            }

            await db.collection('users').insertOne(userObject);



            let token = jwt.sign({ "id": userObject._id }, constants.jwtSecretKey, { algorithm: 'HS256', expiresIn: '30d' });
            return {
                token: token
            }

        }
    }

    async categories() {
        let res = await db.collection('categories').find({}).toArray();
        return res;
    }
    async items() {
        let res = await db.collection('items').find({}).toArray();
        return res;
    }

    async userVerify(uid){
        let user = await db.collection('users').find({_id: ObjectID(uid)}).toArray();
        if (user.length){
            return {
                error: null,
                uData: user[0]
            }
        }else{
            return {
                error: true,
                uData: null
            }
        }
    }

}

module.exports = Site;