FROM registry.access.redhat.com/ubi8/ubi

# add our user and group first to make sure their IDs get assigned consistently, regardless of whatever dependencies get added
RUN groupadd -r mongodb && useradd -r -g mongodb mongodb

# RUN set -eux; \
# 	apt-get update; \
# 	apt-get install -y --no-install-recommends \
# 		ca-certificates \
# 		jq \
# 		numactl \
# 	; \
# 	if ! command -v ps > /dev/null; then \
# 		apt-get install -y --no-install-recommends procps; \
# 	fi; \
# 	rm -rf /var/lib/apt/lists/*

# grab gosu for easy step-down from root (https://github.com/tianon/gosu/releases)
ENV GOSU_VERSION 1.12
# grab "js-yaml" for parsing mongod's YAML config files (https://github.com/nodeca/js-yaml/releases)
ENV JSYAML_VERSION 3.13.1

RUN set -ex; \
    yum update -y && \
	yum install -y wget gnupg

RUN set -ex; \
	wget -O /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-amd64"; \ 
	# wget -O /usr/local/bin/gosu.asc "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-amd64.asc"; \
	# export GNUPGHOME="$(mktemp -d)"; \
	# gpg --batch --keyserver hkps://keys.openpgp.org --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4; \
	# gpg --batch --verify /usr/local/bin/gosu.asc /usr/local/bin/gosu; \
	# command -v gpgconf && gpgconf --kill all || :; \
	# rm -r "$GNUPGHOME" /usr/local/bin/gosu.asc; \
	\
	wget -O /js-yaml.js "https://github.com/nodeca/js-yaml/raw/${JSYAML_VERSION}/dist/js-yaml.js"; \
# smoke test
	chmod +x /usr/local/bin/gosu; \
	gosu --version; \
	gosu nobody true

RUN mkdir /docker-entrypoint-initdb.d

# ENV GPG_KEYS 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
# RUN set -ex; \
# 	export GNUPGHOME="$(mktemp -d)"; \
# 	for key in $GPG_KEYS; do \
# 		gpg --batch --keyserver ha.pool.sks-keyservers.net --recv-keys "$key"; \
# 	done; \
# 	gpg --batch --export $GPG_KEYS > /etc/apt/trusted.gpg.d/mongodb.gpg; \
# 	command -v gpgconf && gpgconf --kill all || :; \
# 	rm -r "$GNUPGHOME"; \
# 	apt-key list

# Allow build-time overrides (eg. to build image with MongoDB Enterprise version)
# Options for MONGO_PACKAGE: mongodb-org OR mongodb-enterprise
# Options for MONGO_REPO: repo.mongodb.org OR repo.mongodb.com
# Example: docker build --build-arg MONGO_PACKAGE=mongodb-enterprise --build-arg MONGO_REPO=repo.mongodb.com .
ARG MONGO_PACKAGE=mongodb-org
ARG MONGO_REPO=repo.mongodb.org
ENV MONGO_PACKAGE=${MONGO_PACKAGE} MONGO_REPO=${MONGO_REPO}

ENV MONGO_MAJOR 3.6
ENV MONGO_VERSION 3.6.20
# bashbrew-architectures:amd64 arm64v8



# RUN set -x \
# # installing "mongodb-enterprise" pulls in "tzdata" which prompts for input
# 	&& export DEBIAN_FRONTEND=noninteractive \
# 	&& apt-get update \
# 	&& apt-get install -y \
# 		${MONGO_PACKAGE}=$MONGO_VERSION \
# 		${MONGO_PACKAGE}-server=$MONGO_VERSION \
# 		${MONGO_PACKAGE}-shell=$MONGO_VERSION \
# 		${MONGO_PACKAGE}-mongos=$MONGO_VERSION \
# 		${MONGO_PACKAGE}-tools=$MONGO_VERSION \
# 	&& rm -rf /var/lib/apt/lists/* \
# 	&& rm -rf /var/lib/mongodb \
# 	&& mv /etc/mongod.conf /etc/mongod.conf.orig \
#     && chmod +x /usr/local/bin/docker-entrypoint.sh  /docker-entrypoint-initdb.d/*
COPY *.rpm /tmp/
RUN yum install -y /tmp/*.rpm


COPY mongodb.repo /etc/yum.repos.d/mongodb.repo

RUN set -x && \
    yum install -y mongodb-org

RUN mkdir -p /data/db /data/configdb \
	&& chown -R mongodb:mongodb /data/db /data/configdb
VOLUME /data/db /data/configdb

COPY docker-entrypoint.sh /usr/local/bin/
COPY docker-entrypoint-initdb.d/* /docker-entrypoint-initdb.d/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh  /docker-entrypoint-initdb.d/* \
	&& rm -rf /var/lib/mongodb \
	&& mv /etc/mongod.conf /etc/mongod.conf.orig 
	

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

EXPOSE 27017
CMD ["mongod"]
