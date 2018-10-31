import {Selector} from 'testcafe'

var Sequelize = require('sequelize');

const sequelize = new Sequelize('prelaunch', 'Consultorio', 'KQNcsE2eLcudGZQGMb5WTuwgS6AHz36V', {
  host: 'production.cuvocs3jmbys.us-east-1.rds.amazonaws.com',
  dialect: 'postgres',
});

const testId = Math.random().toString(36).replace(/[^a-z]+/g, '');

fixture `Getting Started`
  .page('https://consultorio.com');

test('Navegando pelo fluxo', async t => {
  const landingButton = Selector('#root > div > div > div > div.footer > a');
  await landingButton();
  await t // landing
    .click(landingButton);
  const cnpjButton = Selector('#root > div > div.form-signup > div:nth-child(3) > div:nth-child(3) > label');
  await cnpjButton();
  await t // cnpj
    .click(cnpjButton);
  const naturalButton = Selector('#root > div > div.footer > a');
  await naturalButton();
  const naturalTextArea = Selector('#root > div > div.form-signup > div:nth-child(3) > div.label > div > div > div');
  await naturalTextArea;
  await t // natural-person
    .typeText(naturalTextArea, '1')
    .click(naturalButton);
  const rangeButton = Selector('#root > div > div.form-signup > div:nth-child(3) > div:nth-child(2) > label');
  await rangeButton();
  await t // range nacional
    .click(rangeButton)
    .wait(1000);
  const typePlanButton = Selector('#root > div > div.form-signup > div:nth-child(3) > div:nth-child(1) > label');
  await typePlanButton();
  await t // intermediary-plan
    .click(typePlanButton)
  const stateSelect = Selector('#root > div > div.form-signup > div:nth-child(3) > div:nth-child(1) > div > select');
  await stateSelect;
  const allStateOption = stateSelect.find('option');
  await allStateOption;
  const stateOption = allStateOption.withText('Rio de Janeiro');
  await stateOption;
  await t // Select State
    .click(stateSelect)
    .click(stateOption);
  const citySelect = Selector('#root > div > div.form-signup > div:nth-child(3) > div:nth-child(2) > div > select');
  await citySelect;
  const allCityOption = citySelect.find('option');
  await allCityOption;
  const cityOption = allCityOption.withText('Rio de Janeiro');
  await cityOption;
  await t // Select City
    .click(citySelect)
    .click(cityOption);
  const cityButton = Selector('#root > div > div.footer > a');
  await cityButton();
  await t // Click Prosseguir
    .click(cityButton);
  const occupationTextArea = Selector('#root > div > div.form-signup > div:nth-child(3) > div > input');
  const occupationButton = Selector('#root > div > div.footer > a');
  await t // occupation
    .typeText(occupationTextArea, testId)
    .click(occupationButton);
  const hospitalButton = Selector('#root > div > div.form-signup > div:nth-child(3) > div:nth-child(1) > label');
  await hospitalButton;
  await t // hospital
    .click(hospitalButton);
  const signUpName = Selector('#root > div > div > div.social-actions > div.form > div:nth-child(1) > input');
  await signUpName;
  const signUpEmail = Selector('#root > div > div > div.social-actions > div.form > div:nth-child(2) > input');
  await signUpEmail;
  const signUpTelephone = Selector('#root > div > div > div.social-actions > div.form > div:nth-child(3) > input');
  await signUpTelephone;
  const signUpButton = Selector('#root > div > div > div.footer > a');
  await  signUpButton;
  await t // signup2
    .typeText(signUpName, testId)
    .typeText(signUpEmail, testId + '@teste.teste')
    .typeText(signUpTelephone, '(99) 99999-9999')
    .click(signUpButton);
});

test('user2s', async t => {
  var q = await `select * from "user2s"
    where ocupacao = '${testId}'`;
  var row = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT});
  await t
    .expect({
      cnpj: 'noCnpj',
      cidade: 'Rio de Janeiro',
      estado: 'Rio de Janeiro',
      idadePF: '[{"name":"Titular","key":1,"value":"1"}]',
      idadePJ: 'null',
      inclusoSocio: false,
      inclusoFuncionario: false,
      inclusoDependente: false,
      tipoPlano: null,
      ocupacao: testId,
      abrangencia: 'nacional',
      acomodacao: 'enfermaria',
      prefHospital: 'indiferente',
      nome: testId,
      email: testId + '@teste.teste',
      telefone: '(99) 99999-9999',
      tipoCobertura: null,
    }).eql({
      cnpj: row[0].cnpj,
      cidade: row[0].cidade,
      estado: row[0].estado,
      idadePF: row[0].idadePF,
      idadePJ: row[0].idadePJ,
      inclusoSocio: row[0].inclusoSocio,
      inclusoFuncionario: row[0].inclusoFuncionario,
      inclusoDependente: row[0].inclusoDependente,
      tipoPlano: row[0].tipoPlano,
      ocupacao: row[0].ocupacao,
      abrangencia: row[0].abrangencia,
      acomodacao: row[0].acomodacao,
      prefHospital: row[0].prefHospital,
      nome: row[0].nome,
      email: row[0].email,
      telefone: row[0].telefone,
      tipoCobertura: row[0].tipoCobertura,
    });
    await sequelize.query(`delete from "user2s" where ocupacao = '${testId}'`);
});

test('userV3s', async t => {
  var q = await `select * from "userV3s"
    where nome = '${testId}'`;
  var row = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT});
  await t
    .expect({
      nome: row[0].nome,
      email: row[0].email,
      telefone: row[0].telefone,
      tipo: row[0].tipo,
    }).eql({
      nome: testId,
      email: testId + '@teste.teste',
      telefone: '+5599999999999',
      tipo: 'email',
    });
    await sequelize.query(`delete from "userV3s" where nome = '${testId}'`);
});
