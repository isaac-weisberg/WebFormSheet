def: build build_sample open

build_sample:
	npx webpack --config ./sample-webpack-config.js

build:
	npx tsc

open:
	open ./dist_sample/index.html

serve: build
	npx webpack serve --config sample-webpack-config.js
