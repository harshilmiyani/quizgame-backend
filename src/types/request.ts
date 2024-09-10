type AuthType = "EMAIL" | "APPLE" | "GOOGLE";

interface IPostSocialAuthPayload {
  coins?: number;
  email?: string;
  name?: string;
  profile?: string;
  fcm_id?: string;
  firebase_id?: string;
}

interface QuestionPayload {
  id: string;
  question: string;
  optiona: string;
  optionb: string;
  optionc: string;
  optiond: string;
  answer: string;
}

interface IPostAccessTokenPayload {
  refreshToken: string;
}

interface IPostGetContestById {
  contest_id: string;
  userId: string;
}
interface IPostSetUserCoins {
  coins: number;
  title: string;
  status: string;
  date: string;
}

interface IPostSetNewContest {
  contestName: string;
  description: string;
  end_date: string;
  entryCoins: number;
  image: string;
  isLive: boolean;
  participants: number;
  quizQuestions: QuestionPayload[];
  winnerAnnouncement: string;
  winnerCoinsPrize: number;
  categoryId: string;
}
export {
  AuthType,
  IPostSocialAuthPayload,
  IPostAccessTokenPayload,
  IPostGetContestById,
  IPostSetUserCoins,
  IPostSetNewContest,
};
