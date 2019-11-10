import Route from '@ember/routing/route';

const artists = ['Alan Ripley','John Connor','Marty McFly','Spock','Neo'];
const words = ['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','ediam','et'];
const genres = ['Electronic','Rock','Metal','Classical','Alternative'];

export default Route.extend({
  init() {
    this._super(...arguments);

    const num = 10;

    for (let i = 0; i < num; i++) {
      const album = this.store.createRecord('album',{
        id: i+1,
        name: getName(),
        artist: artists[getRandomInt(0,4)],
        released: new Date().setFullYear(getRandomInt(1980,2018)),
        genres: getGenres(),
        artwork: `/images/${i+1}.jpg`
      });

      const trackNum = getRandomInt(5,15);

      for (let i = 0; i < trackNum; i++) {
        this.store.createRecord('track',{
          album: album,
          name: getName(),
          length: getRandomInt(60,600),
          order: i + 1
        })
      }
    }
  },
});

function getGenres() {
  const length = getRandomInt(1,3);

  const obj = {};

  for (let i = 0; i < length; i++) {
    obj[genres[getRandomInt(0,4)]] = true
  }

  return obj
}

function getName() {
  const length = getRandomInt(1,4);

  const parts = [];

  for (let i = 0; i < length; i++) {
    parts.push(words[getRandomInt(0,9)])
  }

  const name = parts.join(' ');

  return name.charAt(0).toUpperCase() + name.slice(1)
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
