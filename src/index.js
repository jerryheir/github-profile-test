import { AppRegistry } from 'react-native';
import App from './App';
import './Styles/main.scss';

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', { rootTag: document.getElementById('root') });
