export interface FormState {
  user: string;
  password: string;
  verifyCode: string;
}
export interface VerifyCodeList {
  verifyCodeImgUrl: string,
  verifyCode: string,
  verifyCodeBase64?: null,
  whRatio?: string
}
// export type VerifyCodeArr = VerifyCodeList[]

export interface VerifyCodeState {
  code:number,
  msg:string,
  data: VerifyCodeList
}