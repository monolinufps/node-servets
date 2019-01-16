// puerto
process.env.PORT = process.env.PORT || 3000;
// entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let url;
if (process.env.NODE_ENV === 'dev') {
    url = 'mongodb://localhost:27017/cafe';
} else {
    url = 'mongodb://act:torrent123@ds151180.mlab.com:51180/cafe';
}
process.env.URLDB = url;