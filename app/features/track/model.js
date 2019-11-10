import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  album: DS.belongsTo('album'),
  name: DS.attr('string'),
  length: DS.attr('number'),
  order: DS.attr('number'),

  readableLength: computed('length', function () {
    return formattedTime(this.get('length'));
  })
});

function pad(num) {
  return ("0"+num).slice(-2);
}
function formattedTime(secs) {
  let minutes = Math.floor(secs / 60);

  secs = secs % 60;

  const hours = Math.floor(minutes / 60);

  minutes = minutes % 60;

  return hours ? `${pad(hours)}:${pad(minutes)}:${pad(secs)}` : `${minutes}:${pad(secs)}`;
}
