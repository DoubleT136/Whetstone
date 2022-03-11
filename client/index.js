/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import AR from './modules/AR';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AR);
