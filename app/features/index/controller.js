import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  layout: 'grid',

  filteredAlbums: computed('model.length','searchTerm', function () {
    const term = (this.get('searchTerm') || '').trim().toLowerCase();
    const sorted = this.get('model').toArray().sort((a,b) => (a.get('name') || '').localeCompare(b.get('name') || ''));

    return term.length ? sorted.filter(album => album.get('name').toLowerCase().includes(term)) : sorted
  }),

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
  }
});
