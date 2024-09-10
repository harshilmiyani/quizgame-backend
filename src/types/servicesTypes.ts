interface ICreateUserServicePayload {
  coins: number;
  email: string;
  name: string;
  profile?: string;
  fcm_id?: string;
  firebase_id?: string;
}

export { ICreateUserServicePayload };
