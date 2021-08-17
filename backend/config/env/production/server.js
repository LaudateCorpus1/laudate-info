module.exports = ({ env }) => ({
    url: env('MY_HEROKU_URL'),
    admin: {
        auth: {
          secret: env('ADMIN_JWT_SECRET', 'e89b343cab99a355c20378b815ffc46b'),
        },
    },
});