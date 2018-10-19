// libreria de Cenfotec
var api = require('api');

// Libreria Assert de Mocha
// mas ejemplos en: https://mochajs.org/
var assert = require('assert');

describe('Api', function() {
  describe('validate_mail - caso 1', function() {
    it('Debe devolver true para name@domain.com', function() {
      assert.equal(api.validate_mail('name@domain.com'), true);
    });
    it('Debe devolver true para name.other@domain.com', function() {
      assert.equal(api.validate_mail('name.other@domain.com'), true);
    });
    it('Debe devolver true para a@domain.com', function() {
      assert.equal(api.validate_mail('a@domain.com'), true);
    });
    it('Debe devolver true para 12345@domain.com', function() {
      assert.equal(api.validate_mail('12345@domain.com'), true);
    });
    it('Debe devolver FALSE para 12345@domain.com', function() {
      assert.equal(api.validate_mail('12345domain.com'), FALSE);
    });
  });
});

//Prueba de telefono
describe('Api', function() {
  describe('validate_phone - caso #2', function() {
    it('Debe devolver true para 50683260204', function() {
      assert.equal(api.validate_phone('50683260204'), true);
    });
    it('Debe devolver true para +50683260204', function() {
      assert.equal(api.validate_phone('+50683260204'), true);
    });
    it('Debe devolver true para (506)83260204', function() {
      assert.equal(api.validate_phone('(506)83260204'), true);
    });
    it('Debe devolver true para +(506)83260204', function() {
      assert.equal(api.validate_phone('+(506)83260204'), true);
    });
    it('Debe devolver true para 83260204', function() {
      assert.equal(api.validate_phone('83260204'), true);
    });
    it('Debe devolver FALSE para 506r83260204', function() {
      assert.equal(api.validate_phone('506r83260204'), false);
    });
    it('Debe devolver TRUE para 506 83260204', function() {
      assert.equal(api.validate_phone('506 83260204'), true);
    });
    it('Debe devolver TRUE para 506 8326 0204', function() {
      assert.equal(api.validate_phone('506 8326 0204'), true);
    });
    it('Debe devolver TRUE para 506 8326-0204', function() {
      assert.equal(api.validate_phone('506 8326-0204'), true);
    });
    it('Debe devolver FALSE para 506-8326-0204', function() {
      assert.equal(api.validate_phone('506-8326-0204'), false);
    });
  });
});

//Prueba de SafeText
describe('Api', function() {
  describe('validate_safeText - caso #3', function() {
    it('Debe devolver FALSE para select ddddd ppokj}', function() {
      assert.equal(api.validate_safeText('select ddddd ppokj'), false);
    });
    it('Debe devolver TRUE para selesct}', function() {
      assert.equal(api.validate_safeText('selecst'), true);
    });
    it('Debe devolver FALSE para -> selecst fro*m}', function() {
      assert.equal(api.validate_safeText('selecst fro*m'), false);
    });

    it('Debe devolver FALSE para -> from}', function() {
      assert.equal(api.validate_safeText('from'), false);
    });

    it('Debe devolver TRUE para -> Hola Mundo}', function() {
      assert.equal(api.validate_safeText('Hola Mundo'), true);
    });

    it('Debe devolver FALSE para -> Hola inner Mundo}', function() {
      assert.equal(api.validate_safeText(' Hola inner Mundo'), false);
    });


  });
});
