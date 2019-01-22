// puerto
process.env.PORT = process.env.PORT || 3000;
// entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
// vencimiento del token -  uso de  variable global
// segundos
// minutos
// hora
// dia
//...
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
// semilla , la  firma de nuestro  token
process.env.SEED = process.env.SEED || 'VWEICHfnn7328QYHIB5H8bybiusb';
let url;
if (process.env.NODE_ENV === 'dev') {
    url = 'mongodb://localhost:27017/cafe';
} else {
    url = 'mongodb://act:torrent123@ds151180.mlab.com:51180/cafe';
}
process.env.URLDB = url;