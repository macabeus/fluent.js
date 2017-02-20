export SHELL := /bin/bash
export PATH  := $(CURDIR)/../node_modules/.bin:$(PATH)

OK := \033[32;01m✓\033[0m

PACKAGE := fluent-syntax
GLOBAL  := FluentSyntax

all: lint test build

build:
	@rollup $(CURDIR)/src/index.js \
	    --format umd \
	    --id $(PACKAGE) \
	    --name $(GLOBAL) \
	    --output $(PACKAGE).js
	@echo -e " $(OK) $(PACKAGE) built"

compat: build
	@babel --presets latest ${PACKAGE}.js > compat.js
	@echo -e " $(OK) ${PACKAGE}/compat built"

clean:
	@rm -f $(PACKAGE).js compat.js
	@echo -e " $(OK) $(PACKAGE) cleaned"

lint:
	@eslint --max-warnings 0 src/
	@echo -e " $(OK) $(PACKAGE) linted"

test:
	@mocha --recursive --require ./test/setup

docs:
	documentation build --shallow -f md \
	    src/*.js > docs/api.md
	@echo -e " $(OK) $(PACKAGE) docs built"

.PHONY: test docs