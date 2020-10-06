YARN := yarn
PROJECT_NAME :=

deps:
	$(YARN)

clean:
	test -d dist || mkdir dist
	cd dist && rm -rf *

build: clean deps
	ENV_FILE=.env.production $(YARN) run build

deploy: build copy-service-account
	cp package.json yarn.lock dist
	cp app.yaml .gcloudignore dist
	gcloud app deploy --quiet --project $(PROJECT_NAME) dist
