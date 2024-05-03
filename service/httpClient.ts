import { $fetch, type FetchOptions } from "ofetch";
import { setCookie } from "~/composables/useCookie";
import type { Response } from "~/models/http.model";

export function client<T, R extends Response<T> = Response<T>>(url: string, opts?: FetchOptions<"json">) {
   const config = useRuntimeConfig()
   const { $router } = useNuxtApp()

   const controller = new AbortController()
   setTimeout(() => {
      controller.abort()
   }, 60000);

   const token = setCookie('token')
   const headers: any = {
      Authorization: token.value && `Bearer ${token.value}`,
      ...opts?.headers
   }

   return $fetch<R>(url, {
      baseURL: config.public.baseUrl,
      signal: controller.signal,
      method: opts?.method?.toUpperCase(),
      headers,
      ...opts,
      onResponse({ response }) {
         if (response._data.status.code == 400 && response._data.status.message == 'Unauthenicated.') {
            token.value = undefined
            setTimeout(() => {
               $router.push('/')
            }, 500);
         }
      },
      onResponseError({ response }) {
         if (response?.status == 403 || response?.status == 401) {
            token.value = undefined
            setTimeout(() => {
               $router.push('/')
            }, 500);
         }
      }
   })
}