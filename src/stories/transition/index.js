import React from 'react';
import { storiesOf } from '@storybook/react';

import Basis1 from './Basis1';
import Basis2 from './Basis2';
import Basis3 from './Basis3';
import Basis4 from './Basis4';

export default () =>
  storiesOf('過場', module)
    .add('基礎1', () => <Basis1 />, { notes: 'A very simple component' })
    .add('基礎2', () => <Basis2 />, { notes: 'A very simple component' })
    .add('基礎3', () => <Basis3 />, { notes: 'A very simple component' })
    .add('基礎4', () => <Basis4 />, { notes: 'A very simple component' });
