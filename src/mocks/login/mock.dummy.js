export const loginRequestDummy = {
  id: "admin",
  password: "1",
};

export const loginSuccessDummy = {
  resultCode: "200",
  resultVO: {
    id: "admin",
    name: "관리자",
    ihidNum: "",
    email: "",
    password: "XXXXXXXXXXXXXXXX",
    passwordHint: null,
    passwordCnsr: null,
    userSe: "USR",
    orgnztId: "ORGNZT_0000000000000",
    orgnztNm: null,
    uniqId: "USRCNFRM_00000000000",
    url: null,
    ip: null,
    dn: null,
    groupId: "GROUP_00000000000000",
    groupNm: "ROLE_ADMIN",
  },
  resultMessage: "성공 !!!",
};

export const loginFailDummy = {
  resultCode: "300",
  resultVO: {
    id: null,
    name: null,
    ihidNum: null,
    email: null,
    password: null,
    passwordHint: null,
    passwordCnsr: null,
    userSe: null,
    orgnztId: null,
    orgnztNm: null,
    uniqId: null,
    url: null,
    ip: null,
    dn: null,
    groupId: null,
    groupNm: null,
  },
  resultMessage: "로그인 정보가 올바르지 않습니다.",
};
