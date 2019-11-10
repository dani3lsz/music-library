import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  tracks: DS.hasMany('track'),
  name: DS.attr('string'),
  artist: DS.attr('string'),
  released: DS.attr('date'),
  genres: DS.attr({defaultValue: null}),
  artwork: DS.attr('string'),

  genresString: computed('genres', {
    get() {
      return Object.keys(this.get('genres') || {}).join(', ')
    },
    set(key,value = '') {
      const genres = {};

      value.split(',').forEach(part => {
        const name = part.trim();

        if (name.length) genres[name] = true
      });

      this.set('genres',genres);

      return value
    }
  })
});
