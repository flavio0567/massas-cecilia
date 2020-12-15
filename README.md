# Massas da Cecilia
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/flavio0567/massas-cecilia/blob/master/LICENSE)

# About the project

https://app.massasdacecilia.com.br/

Massas da Cecilia is an e-commerce full stack web and mobile, built to receive orders of products sold in www.massasdacecilia.com.br.

The app has a backend (massas-cecilia) built in Nodejs with Express using Postgres as a persistence database, MongoDb and Redis to handle notifications. The images are storaged on AWS S3 and the authentication is based on JWT token.

## Layout web
![Layout web 1](https://github.com/flavio0567/massas-cecilia-web/blob/master/src/assets/massas-web-pic1.png) ![Layout web 2](https://github.com/flavio0567/massas-cecilia-web/blob/master/src/assets/massas-web-pic2.png) ![Layout web 3](https://github.com/flavio0567/massas-cecilia-web/blob/master/src/assets/massas-web-pic3.png)

## Layout mobile
![iPhone layout 1](https://github.com/flavio0567/massasapp/blob/master/src/modules/assets/iPhone_1.jpg) ![Android layout 2](https://github.com/flavio0567/massasapp/blob/master/src/modules/assets/Android_2.jpg) ![iPhone layout 3](https://github.com/flavio0567/massasapp/blob/master/src/modules/assets/iPhone_3.jpg) ![Android layout 4](https://github.com/flavio0567/massasapp/blob/master/src/modules/assets/Android_4.jpg) ![iPhone layout 5](https://github.com/flavio0567/massasapp/blob/master/src/modules/assets/iPhone_5.jpg)

# Technologies applied

## Backend
- NodeJS
- Express
- Typescript
- Typeorm
- JWT
- AWS-S3
- Multer
- Nodemailer
- Redis
- Sequelize
- Postgres
- MongoDB
- Jest

## Web
- Reactjs
- React-hooks
- Typescript
- Styled-components
- Axios
- Yup

## Mobile
- React Native
- React-hooks
- Typescript
- Redux
- Redux-sagas
- Styled-components
- Axios
- Yup

## Steps to run this project:

1. Run `yarn install` command
2. Setup database settings inside `ormconfig.json` file
3. Run `yarn dev:server` command
