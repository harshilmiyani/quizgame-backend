import { AuthType } from ".";

interface ICreateUserServicePayload {
  email: string;
  name: string;
  profile?: string;
  fcm_id?: string;
  firebase_id?: string;
}

export { ICreateUserServicePayload };
