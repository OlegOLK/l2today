interface ServerConfig {
  password: {
    minLenght: number;
    upperCase: boolean;
    lowerCase: boolean;
    digit: boolean;
  };
}

export const CONFIG: ServerConfig = {
  password: {
    lowerCase: true,
    minLenght: 6,
    upperCase: true,
    digit: true,
  },
};
