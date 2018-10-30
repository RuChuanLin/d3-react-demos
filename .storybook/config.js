import { configure, addDecorator } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';

addDecorator(withNotes);
function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
