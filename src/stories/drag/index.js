import { storiesOf } from '@storybook/react';

import Basis1 from './Basis1';
import Basis2 from './Basis2';
// import Basis3 from './Basis3';
export default () =>
  storiesOf('拖曳事件', module)
    .add(...Basis1)
    .add(...Basis2)
    // .add(...Basis3);
