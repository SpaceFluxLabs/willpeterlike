test:
	./node_modules/karma/bin/karma start test/karmaConf.js 

test-travis:
	./node_modules/karma/bin/karma start test/karmaConf.js --browsers Firefox --single-run 

.PHONY: test test-travis
