import './commands';
import { runCleanups } from './helpers/factories';

afterEach(() => {
  runCleanups();
});
