import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  didInsertElement() {
    if (!this.get('album')) {
      this.set('isNew',true);

      this.set('album',this.store.createRecord('album',{id: getRandomInt(100000,999999)}))
    }
  },

  actions: {
    setProperty(key,value,obj) {
      if (key) (obj || this).set(key,value)
    },

    toggleProperty(prop,obj) {
      if (prop) (obj || this).toggleProperty(prop)
    },

    incrementProperty(obj,prop,count = 1) {
      if (obj && prop) obj.incrementProperty(prop,count)
    },

    newTrack(string) {
      const parts = string.split(' ');
      const time = parts.pop();
      const name = parts.join(' ');
      const timeParts = time.split(':');

      let seconds = 0;

      for (let i = timeParts.length - 1, j = 0; i >= 0; i--, j++) {
        seconds += parseInt(timeParts[i]) * (j === 1 ? 60 : j === 2 ? 3600 : 1)
      }

      if (!name || !seconds) return;

      this.store.createRecord('track',{
        album: this.get('album'),
        name: name,
        length: seconds,
      });

      this.set('newTrack',null)
    },

    cancel() {
      this.get('album').rollbackAttributes();

      this.set('infoOpen',false)
    },

    newArtwork(files) {
      var reader = new FileReader();

      reader.onload = (e) => {
        this.set('album.artwork',e.target.result)
      };

      reader.readAsDataURL(files[0]);
    }
  }
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
