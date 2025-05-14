interface configInSeat {
  regex: string,
  targetTime: string,
  myPrice?: number,
  selectedGroup?: string,
}

interface UserConfig {
  login: {
    username: string;
    password?: string;
  };
  regex?: string;
  userPrice?: string;
  targetTime?: string;
  targetCount?: string;
  ChromePath?: string;
}

export type { configInSeat, UserConfig };