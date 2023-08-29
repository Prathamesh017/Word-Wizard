interface Word {
  name: string;
  hint: string;
  difficulty: string;
}
interface User {
  userId: string;
  email: string;
  highscore: number;
}
export interface Response {
  message: string;
  data: {
    user?: User;
    word?: Word | Word[]
  }
}