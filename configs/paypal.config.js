const paypal = require('paypal-rest-sdk');
require('dotenv').config();

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'Af46wKG-xd_h7VLF4bGZs6M5cmNLWQ5DJ6tAN6GIB118hIeGA9M8HdMtlpZpPh_mHMsNtB8muw0dfvt8',
  'client_secret': 'EAmocgTUYXGlHArCsJ45rTDYYUscMk91qcjsL4xY8luJHBi94EXyPN_8vyAems1lyC4p3J_N46CPZDkJ'
});
