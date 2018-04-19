const latch = require('latch-sdk');

latch.init({ appId: process.env.LATCH_ID, secretKey: process.env.LATCH_SECRET });