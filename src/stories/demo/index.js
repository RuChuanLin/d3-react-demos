import { storiesOf } from '@storybook/react';

import Brush_Zoom_line_chart from './Brush_Zoom_line_chart';
import NIVO_Line from './NIVO_Line';

export default () =>
  storiesOf('作品集', module)
    .add(...Brush_Zoom_line_chart)
    .add(...NIVO_Line);
