# 🚀 Picnic API

## 🌐 Installation

### Local

Create an .env file in the root directory with a:
`DATABASE_URL=`
This is the DB connection string

```
npm install
npx prisma init
npx prisma db push
node app.js
```

### Installation on Apache

1. Install node and npm
```
sudo apt update
sudo apt install nodejs
sudo apt install npm
```

2. Install dependencies in project
```
cd /var/www/picnic-api
npm install
```

3. Run the app
```
node app.js
```

## 🔗 API Endpoints

### Get all of [table-name]
`GET /[table-name]`

### Get single record of [table-name]
`GET /[table-name]/:id`

### Create record on [table-name]
`POST /[table-name]`

### Update record on [table-name]
`PUT /[table-name]/:id`

### Delete record on [table-name]
`DELETE /[table-name]/:id`
