'use babel';

import MbxtoolsView from './mbxtools-view';
import { CompositeDisposable } from 'atom';

export default {

  mbxtoolsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.mbxtoolsView = new MbxtoolsView(state.mbxtoolsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.mbxtoolsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'mbxtools:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.mbxtoolsView.destroy();
  },

  serialize() {
    return {
      mbxtoolsViewState: this.mbxtoolsView.serialize()
    };
  },

  toggle() {
    console.log('Mbxtools was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
