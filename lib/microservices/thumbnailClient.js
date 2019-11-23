'use Strict';

const cote = require('cote');

const requester = new cote.Requester({ name: 'thumbnail' });

class ThumbnailClient {

  cliente(url_foto) {
    //setInterval(() => {
    
    requester.send({
      type: 'foto',
      url_foto: url_foto,
    }, response => {
      console.log(`Cliente: Ya se ha creado el Thumbnail: ${response}`, Date.now());
    });
    //}, 1000);
  }

}

module.exports = new ThumbnailClient();