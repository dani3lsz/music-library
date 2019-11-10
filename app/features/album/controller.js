import Controller from '@ember/controller';

export default Controller.extend({
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
