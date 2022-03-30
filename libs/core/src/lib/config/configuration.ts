export const configuration = () => ({
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT || "3030", 10),
})