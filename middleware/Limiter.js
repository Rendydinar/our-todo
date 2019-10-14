const RateLimit = require('express-rate-limit');

const LimiterAPI = new RateLimit({
	// jeda block ip address
	windowMs: 30*60*1000, // 30 menit
	max: 100, // maksimal banyak request 100 per 30 menit, lebih dari itu blokir ip address selama 30 menit
	message: "Anda terlalu banyak melakukan request ke halaman ini, silakan tunggu setelah satu jam"
});

module.exports = LimiterAPI;
