
var api = require('api');

// Libreria Assert de Mocha
// mas ejemplos en: https://mochajs.org/
var assert = require('assert');
describe('Api', function() {
  describe('validate_encrypt - caso 1', function() {
    it('Debe devolver true para -> Prueba de Cifrado', function() {
      assert.equal(api.validate_encrypt('Prueba de Cifrado'), true);
    });

    it('Debe devolver true para -> Prueba_de_!@_Cifrado_#_Con_Caracteres', function() {
      assert.equal(api.validate_encrypt('Prueba_de_!@_Cifrado_#_Con_Caracteres'), true);
    });

    it('Debe devolver true para -> Prueba Cifrado tildes áéíóú', function() {
      assert.equal(api.validate_encrypt('Prueba Cifrado tildes áéíóú'), true);
    });

    it('Debe devolver true para Prueba Cifrado Ññ', function() {
      assert.equal(api.validate_encrypt('Prueba Cifrado Ññ'), true);
    });

  });
});

describe('Api', function() {
  describe('validate_decrypt - caso 2', function() {
    it('Debe devolver true para XXXXXXXXXXXXXX', function() {
      assert.equal(api.validate_decrypt('name@domain.com'), true);
    });

    it('Debe devolver true para XXXXXXXXXXXXXX', function() {
      assert.equal(api.validate_decrypt('name@domain.com'), true);
    });

    it('Debe devolver true para XXXXXXXXXXXXXX', function() {
      assert.equal(api.validate_decrypt('name@domain.com'), true);
    });

    it('Debe devolver true para XXXXXXXXXXXXXX', function() {
      assert.equal(api.validate_decrypt('name@domain.com'), true);
    });
  });
});
