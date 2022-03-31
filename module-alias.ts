const moduleAlias = require('module-alias');

moduleAlias.addAliases({
	'@application': __dirname + '/src/application',
	'@domain': __dirname + '/src/domain',
	'@infra': __dirname + '/src/infra',
	'@presentation': __dirname + '/src/presentation',
	'@main': __dirname + '/src/main',
	'@root': __dirname,
});
