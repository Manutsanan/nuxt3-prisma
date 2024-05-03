import { client } from './httpClient';

export function GetUsers() {
   return client("/api/users", {
      method: "GET",
   });
}