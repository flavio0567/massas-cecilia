# Massas da Cecilia
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/flavio0567/massas-cecilia/blob/master/LICENSE)

# About the project

Massas da Cecilia is an e-commerce full stack web (https://github.com/flavio0567/massas-cecilia-web) and mobile (https://github.com/flavio0567/massasapp), built to receive orders of products sold by www.massasdacecilia.com.br.

The app has a backend (https://github.com/flavio0567/massas-cecilia) built in Nodejs with Express using Postgres as a persistence database, MongoDb and Redis to handle notifications. The images are stored in AWS S3, and the authentication is based on JWT token.

## Layout web
![Layout web 1](https://github.com/flavio0567/massas-cecilia-web/blob/master/src/assets/massas-web-pic1.png) ![Layout web 2](https://github.com/flavio0567/massas-cecilia-web/blob/master/src/assets/massas-web-pic2.png) ![Layout web 3](https://github.com/flavio0567/massas-cecilia-web/blob/master/src/assets/massas-web-pic3.png)

## Layout mobile
![iPhone layout 1](https://github.com/flavio0567/massas-cecilia-web/blob/master/src/assets/iPhone1.jpg) ![iPhone layout 2](https://github.com/flavio0567/massas-cecilia-web/blob/master/src/assets/iPhone2.jpg) ![iPhone layout 3](https://github.com/flavio0567/massas-cecilia-web/blob/master/src/assets/iPhone3.jpg) ![iPhone layout 4](https://github.com/flavio0567/massas-cecilia-web/blob/master/src/assets/iPhone4.jpg) ![iPhone layout 5](https://github.com/flavio0567/massas-cecilia-web/blob/master/src/assets/iPhone5.jpg)

# Technologies applied

## Backend
- NodeJS
- Express
- Typescript
- Typeorm (current edition of this app using Postgres)
- JWT
- AWS-S3
- Multer
- Nodemailer
- Redis
- Sequelize (first edition of this app when was used MS-SQL)
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
