
export default defineNuxtRouteMiddleware(async (to, from) => {
    removeCookie("token");
    removeCookie("username");
})