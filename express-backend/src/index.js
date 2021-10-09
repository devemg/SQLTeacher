const gramatica = require('../dist/Analizador/gramatica');

gramatica.parse(`-(1+1*6/3-5+1*-2)`);
console.log('Valor Real: ', -(1+1*6/3-5+1*-2));