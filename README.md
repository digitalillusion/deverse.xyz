# My portfolio website

See it online: [deverse.xyz](https://deverse.xyz)

## Building

Requires installed Node.js and Yarn package manager

    yarn install

## Run develop

    yarn start

The website will be online at http://localhost:8000

## Run prod

Serve on all network interfaces

    yarn serve -H 0.0.0.0

## Build static website

    yarn clean
    yarn build

Then, deploy the content of the `public` folder to a web server.