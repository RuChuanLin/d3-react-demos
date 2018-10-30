import React from 'react';
import { storiesOf } from '@storybook/react';

import Basis1 from './Basis1';
import Basis2 from './Basis2';
import Basis3 from './Basis3';
import Basis4 from './Basis4';

export default () =>
  storiesOf('Transition', module)
    .add('Basis1', () => <Basis1 />, { notes: 'A very simple component' })
    .add('Basis2', () => <Basis2 />, { notes: 'A very simple component' })
    .add('Basis3', () => <Basis3 />, { notes: 'A very simple component' })
    .add('Basis4', () => <Basis4 />, { notes: 'A very simple component' });
