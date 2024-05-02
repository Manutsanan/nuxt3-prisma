import { setCookie } from "~/composables/useCookie";

export default defineNuxtRouteMiddleware(async (to, from) => {
    await verify()

    const refToken = setCookie('token')
    if (!refToken.value) {
        removeCookie("token");
        return navigateTo("/login");
    } else {
        // 
    }
})