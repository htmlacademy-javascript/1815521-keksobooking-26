import './create-card.js';
import './form-validation.js';
import {
  createMarkers
} from './map.js';
import {
  getData
} from './api.js';

getData((advertisments) => {
  createMarkers(advertisments.slice(0, 4));
});
