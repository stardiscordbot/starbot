import colors from 'colors';
import StarShards from './client/starshard.mjs';
import config from './config/config.js';

console.log('[CLIENT] Iniciando...'.yellow)
new StarShards('auto', './src/star.js', config);
