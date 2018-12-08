
var api = require('api');
var val = require('cenfo-util/index.js');

/*Variables**************************************************/
var text1 = 'Prueba de Cifrado';
var text2 = 'Prueba_de_!@_Cifrado_#_Con_Caracteres';
var text3 = 'Prueba Cifrado tildes áéíóú';
var text4 = 'Prueba de Cifrado';
//
var cypherText1 = api.validate_encrypt(text1);
var cypherText2 = api.validate_encrypt(text2);
var cypherText3 = api.validate_encrypt(text3);
var cypherText4 = api.validate_encrypt(text4);

var decryptText1 = api.validate_decrypt(cypherText1);
var decryptText2 = api.validate_decrypt(cypherText2);
var decryptText3 = api.validate_decrypt(cypherText3);
var decryptText4 = api.validate_decrypt(cypherText4);
/************************************************************/
// Libreria Assert de Mocha
// mas ejemplos en: https://mochajs.org/
var assert = require('assert');
describe('Api', function() {
  describe('validate_encrypt - caso 1', function() {

      it('Debe devolver true para -> Prueba de Cifrado', function() {
        assert.notEqual(api.validate_encrypt(text1), text1);
      });
      it('Debe devolver true para -> Prueba_de_!@_Cifrado_#_Con_Caracteres', function() {
        assert.equal(api.validate_encrypt(text2),cypherText2);
      });
    });
});

describe('Api', function() {
  describe('validate_decrypt - caso 2', function() {

    it('Debe devolver true para -> Prueba de Decifrado', function() {
      assert.notEqual(api.validate_decrypt(cypherText1), '');
    });
    it('Debe devolver true para -> Decifrar texto', function() {
      assert.equal(api.validate_decrypt(cypherText2), text2);
    });
    it('Debe devolver NOT EQUAL para -> Decifrar texto', function() {
      assert.notEqual(api.validate_decrypt(cypherText3), text1);
    });
  });
});

describe('Api', function() {
  describe('Obtener Valores - caso 3', function() {

    it('Debe devolver "VALOR" para -> Obtener_n', function() {
      assert.notEqual(val.e(1,3,5), '');
    });
    it('Debe devolver "VALOR" para -> Obtener_d', function() {
      assert.notEqual(val.d(1,3,5), '');
    });
    it('Debe devolver "8" para -> Obtener_z:', function() {
      assert.equal(val.z(3,5), 8);
    });

  });
});
