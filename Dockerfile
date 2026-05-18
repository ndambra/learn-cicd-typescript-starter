FROM --platform=linux/amd64 node:22-slim

WORKDIR /usr/src/app

ADD . .

# Define the arguments
ARG HTTP_PROXY
ARG HTTPS_PROXY

# Set them as environment variables for the npm process
ENV http_proxy=$HTTP_PROXY
ENV https_proxy=$HTTPS_PROXY

RUN npm ci

RUN npm run build

CMD ["node", "dist/main.js"]
