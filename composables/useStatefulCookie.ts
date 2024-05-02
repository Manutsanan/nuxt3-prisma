
export default function useStatefulCookie<T>(key: string, _opts?: any) {
   const cookie = useCookie<T | undefined>(key, _opts)

   const state = useState<T | undefined>(key, () => cookie.value)

   watch(state, () => {
      cookie.value = state.value
   })

   return state
}