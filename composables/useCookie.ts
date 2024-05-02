import useStatefulCookie from "./useStatefulCookie";

export function setCookie(key: string, _opts: any = { path: '/' }) {
   return useStatefulCookie<string | undefined>(key, _opts)
}

export function removeCookie(key: string) {
   const cookie = useCookie(key)
   cookie.value = null

   const state = useState<string | undefined>(key, () => undefined)
   state.value = ""

   watch(state, () => {
      cookie.value = null
   })

   return state
}