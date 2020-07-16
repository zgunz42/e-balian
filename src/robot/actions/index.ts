import { DisplayAction } from './display.action';
import { SearchAction } from './search.action';

const actions = [
  {
    command: 'ayu_today',
    action: DisplayAction,
  },
  {
    command: 'ayu_search',
    action: SearchAction,
  },
];

export default actions;
