# Use the latest foundry image
FROM ghcr.io/foundry-rs/foundry

ENV DEBIAN_FRONTEND=noninteractive
ENV LANG=C.UTF-8

# Set directory environment variables
ENV APP_SOURCE=/foundry
ENV APP_HOME=/usr/src/app

# Copy the source code
COPY $APP_SOURCE $APP_HOME

# Set working directory
WORKDIR /usr/src/app