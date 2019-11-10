import Component from '@ember/component';
import { next } from '@ember/runloop';
import { observer } from '@ember/object';

export default Component.extend({
  didInsertElement() {
    const handleChange = this.set('handleChange',this.handleChange.bind(this));

    next(() => {
      document.getElementById('js-file-input').addEventListener('change',handleChange);
    })
  },

  willDestroyElement() {
    document.getElementById('js-file-input').addEventListener('change',this.get('handleChange'));
  },

  click(evt) {
    if (evt.target.type !== 'file') {document.getElementById('js-file-input').click()}
  },

  openUploadObserver: observer('openUpload', function () {
    if (this.get('openUpload')) next(this,'click',{target: {type: ''}})
  }),

  filesObserver: observer('files', function () {
    if (!this.get('files')) document.getElementById('js-file-input').value = ''
  }),

  handleChange(evt) {
    const files = evt.target.files;
    this.setFiles(files || null);
  },

  setFiles(files) {
    this.set('files', files);

    const action = this.get('onChange');
    if (action) action(files);
  }
});
