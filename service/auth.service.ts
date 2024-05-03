import type { LoginRequest } from "~/models/auth.model";
import { client } from './httpClient';

export function login(payload: LoginRequest) {
   return client("/api/login", {
      method: "POST",
      body: payload,
   });
}