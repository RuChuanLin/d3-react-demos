import { storiesOf } from '@storybook/react';

import Basis1 from './Basis1';
import Practice1 from './Practice1';
export default () =>
  storiesOf('滑鼠事件', module)
    .add(...Basis1)
    .add(...Practice1);
