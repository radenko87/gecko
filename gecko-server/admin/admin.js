const fs = require('fs');
const constants = require('./constants');
const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
const fetch = require('node-fetch');
const axios = require('axios');
var webp = require('webp-converter');
var easyimage = require('easyimage');
const moment = require('moment');
let db;
const dbConnect = require('../db');

function generateAlias(str) {
    str = str.toLowerCase();
    str = str.replace(/ä/g, 'a');
    str = str.replace(/ö/g, 'o');
    str = str.replace(/ü/g, 'u');
    str = str.replace(/ß/g, 'b');
    str = str.replace(/č/g, 'c');
    str = str.replace(/ć/g, 'c');
    str = str.replace(/ž/g, 'z');
    str = str.replace(/đ/g, 'dj');
    str = str.replace(/š/g, 's');

    str = str.replace(/[^a-zA-Z0-9]/gi, '-').toLowerCase()
    str = str.replace(/-+/g, '-');

    return str;
}


function sendNotification(data) {
    if (!data.to) {
        return;
    }
    data.sound = "default";
    data.channelId = 'notifications';
    data.priority = 'high';

    fetch(`https://exp.host/--/api/v2/push/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

}


dbConnect()
    .then((conn) => {
        db = conn;
    })
    .catch((e) => {
        console.log('DB error')
    })

class Admin {
    constructor(props) {

    }



    async generateImages(dir, filename, fname, extension) {

        webp.cwebp(dir + filename, dir + fname + '.webp', "-q 100", function (status, error) {
            console.log(status, error);
        });


        for (let i = 100; i <= 1200; i += 100) {
            console.log('generating', dir + fname + `-${i}x` + extension)
            try {
                const resizeInfo = await easyimage.resize({
                    src: dir + filename,
                    dst: dir + fname + `-${i}x` + extension,
                    width: i,
                    quality: 100
                });

                webp.cwebp(dir + fname + `-${i}x` + extension, dir + fname + `-${i}x` + '.webp', "-q 100", function (status, error) {
                    console.log(status, error);
                });


            } catch (e) {

            }
        }
    }


    async autoGenerate() {
        fs.readdirSync('./uploads').forEach(async file => {
            let extension = '.' + file.split('.')[1];
            if (extension == '.png' || extension == '.jpg' || extension == '.jpeg') {
                console.log(file);
                await this.generateImages('./uploads/', file, file.split('.')[0], extension);
            }
        });

    }


    upload(file, res) {


        let fname = uuidv4();
        let extension = '.' + file.name.split('.').pop();

        if (extension.indexOf('svg') != -1) {
            extension = '.svg';
        }

        //let base64Image = base64.split(';base64,').pop();
        let filename = fname + extension;

        file.mv('./uploads/' + filename, (err) => {
            if (err) {
                res.status(500).send('Error');
            }

                        // if (extension == '.png' || extension == '.jpg' || extension == '.jpeg'){
                        //     this.generateImages('./uploads/', filename, fname, extension);
                        // }
              
            res.status(200).send('/uploads/' + filename);


        })
    }


    async login(username, password) {
        //console.log(db);   

        let admin = await db.collection('admins').find({ username: username }).toArray();

        if (!admin.length) {
            return {
                response: {
                    error: 'User not exists'
                },
                status: 404
            };

        } else {
            if (bcrypt.compareSync(password, admin[0].pk)) {
                let token = jwt.sign({ "id": admin[0]._id }, constants.jwtSecretKey, { algorithm: 'HS256' });
                return {
                    response: {
                        token: token
                    },
                    status: 200
                };

            } else {
                return {
                    response: {
                        error: 'Wrong creditials'
                    },
                    status: 400
                };

            }
        }
    }




    async updateOne(id, collection, obj) {

        if (collection == 'services') {
            if (obj.name) {
                obj.alias = {};

                for (var key in obj.name) {
                    if (obj.name.hasOwnProperty(key)) {
                        obj.alias[key] = generateAlias(obj.name[key]);
                    }
                }

            }
        }

        if (collection == 'blog') {

            if (obj.title) {
                obj.alias = {};

                for (var key in obj.title) {
                    if (obj.title.hasOwnProperty(key)) {
                        obj.alias[key] = generateAlias(obj.title[key]);
                    }
                }

            }
        }

        if (id == 'new') {
            obj.timestamp = Math.floor(new Date().getTime() / 1000);

            await db.collection(collection).insertOne(obj);
        } else {
            delete obj._id;
            await db.collection(collection).updateOne({ _id: ObjectID(id) }, {
                $set: obj
            })
        }
        return {}
    }

    async delete(id, collection) {
        await db.collection(collection).deleteOne({ _id: ObjectID(id) });
        return {}
    }


    async fetchOne(id, collection) {

        let result = await db.collection(collection).find({ _id: ObjectID(id) }).toArray();
        if (result.length) {
            return result[0]
        } else {
            return { error: 'Not found' }
        }
    }

    async fetch(collection) {
        let result = await db.collection(collection).find().toArray();
        return result
    }

    async home(obj) {
        await db.collection('home').deleteMany({});
        await db.collection('home').insertOne(obj);
        return {}

    }


    async getHome() {

        let result = await db.collection('home').find({}).toArray();
        if (result.length) {
            return result[0];
        } else {
            return {}
        }
    }
    async aboutUs(obj) {
        await db.collection('aboutus').deleteMany({});

        await db.collection('aboutus').insertOne(obj);
        return {}

    }


    async getAboutUs() {

        let result = await db.collection('aboutus').find({}).toArray();
        if (result.length) {
            return result[0];
        } else {
            return {}
        }
    }


    async allowReservation(id, status){
        let reservation = await db.collection('reservations').find({ _id: ObjectID(id) }).toArray();
        if (!reservation.length)
            return;

        if (status) {
            await db.collection('reservations').updateMany({ reservationDate: reservation[0].reservationDate, tableId: reservation[0].tableId }, {
                $set: {
                    actionCreated: true,
                    allowed: false
                }
            });
        }

        await db.collection('reservations').updateOne({ _id: ObjectID(id) }, {
            $set: {
                actionCreated: true,
                allowed: status

            }
        })


        let subscribers = await db.collection('subscribers').find({ 'uid': reservation[0].uid, reservations: true }).toArray();
        for (let i = 0; i < subscribers.length; i++) {
            sendNotification(
                {
                    to: subscribers[i].token,
                    title: status ? 'Rezervacija prihvaćena' : 'Rezervacija odbijena',
                    body: status ? `Rezervacija za dan ${moment.unix(reservation[0].reservationDate).format('DD.MM.YYYY')} je prihvaćena` : `Rezervacija za dan ${moment.unix(reservation[0].reservationDate).format('DD.MM.YYYY')} je odbijena`,
                    data: { reservation: true, id: reservation[0]._id, title: status ? 'Rezervacija prihvaćena' : 'Rezervacija odbijena', body: status ? `Rezervacija za dan ${moment.unix(reservation[0].reservationDate).format('DD.MM.YYYY')} je prihvaćena` : `Rezervacija za dan ${moment.unix(reservation[0].reservationDate).format('DD.MM.YYYY')} je odbijena`, status: status }
                }
            )
        }

        return {error: null};
    }


    async sendNewsNotification(id){
        let subscribers = await db.collection('subscribers').find({ news: true }).toArray();
        let item = await db.collection('blog').find({ _id: ObjectID(id) }).toArray();
        console.log(item);
        if (!item.length) {
            return;
        }
        console.log(subscribers);
        for (let i = 0; i < subscribers.length; i++) {
            sendNotification(
                {
                    to: subscribers[i].token,
                    title: item[0].title.sr,
                    body: item[0].content.sr,
                    image: item[0].image,
                    data: { news: true, id: id, data: item[0] }
    
                }
            )
        }
        return {error: null};

    }

    async reservations(){
        let result = await db.collection('reservations').find({}).sort({ _id: -1 }).toArray();
        for (let i = 0; i < result.length; i++) {
            let table = await db.collection('tables').find({ _id: ObjectID(result[i].tableId) }).toArray();
    
            if (table.length) {
                result[i].tableNumber = table[0].number;
            }

            let user = await db.collection('users').find({_id: ObjectID(result[i].uid)}).toArray();
            result[i].user = user.length ? user[0] : {};
        }

        return result;
    }
    async information(obj) {
        await db.collection('informations').deleteMany({});

        await db.collection('informations').insertOne(obj);
        return {}

    }


    async getInfo() {

        let result = await db.collection('informations').find({}).toArray();
        if (result.length) {
            return result[0];
        } else {
            return {}
        }
    }

}

module.exports = Admin;