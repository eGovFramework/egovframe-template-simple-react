import { http, HttpResponse } from "msw";
import { SERVER_URL } from "../../config";
import {
  loginSuccessDummy,
  loginFailDummy,
  loginRequestDummy,
} from "./mock.dummy";
export const handlers = [
  http.post(SERVER_URL + "/auth/login-jwt", async ({ request }) => {
    const body = await request.json();
    if (
      body.id === loginRequestDummy.id &&
      body.password === loginRequestDummy.password
    ) {
      return HttpResponse.json(loginSuccessDummy);
    }
    return HttpResponse.error(loginFailDummy, { status: 300 });
  }),
];
