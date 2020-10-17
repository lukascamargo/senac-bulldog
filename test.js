var data = "do shash'owania";
var crypto = require('crypto');
var encrypted = crypto.createHash('md5').update(data).digest("hex");
console.log(encrypted);
var encrypted2 = crypto.createHmac('sha256', 'senha').update(data).digest('hex');
var encrypted3 = crypto.createHmac('sha256', 'senha').update(data).digest('hex');
console.log(encrypted2);
console.log(encrypted3);
console.log(encrypted2 === encrypted3);