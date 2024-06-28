export const config = () => ({
    domain: process.env.DOMAIN,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_url: process.env.REDIRECT_URL,
    bearer: process.env.BEARER,
    port: process.env.PORT
})