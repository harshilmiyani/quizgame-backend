type AuthType = "EMAIL" | "APPLE" | "GOOGLE";

interface IPostSocialAuthPayload {
  email?: string;
  name?: string;
  profile?: string;
  fcm_id?: string;
  firebase_id?: string;
}
interface IPostAccessTokenPayload {
  refreshToken: string;
}

interface IPostGetContestById {
  contest_id: string;
  userId: string;
}
interface IPostSetUserCoins {
  coins: string;
  title: string;
  status: string;
  date: string;
}
export {
  AuthType,
  IPostSocialAuthPayload,
  IPostAccessTokenPayload,
  IPostGetContestById,
  IPostSetUserCoins,
};
