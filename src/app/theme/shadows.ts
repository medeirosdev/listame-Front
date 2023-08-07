export type Shadow = {
  shadowColor?: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
};

export interface IThemeShadows {
  dpMinus24: Shadow;
  dp01: Shadow;
  dp02: Shadow;
  dp03: Shadow;
  dp04: Shadow;
  dp06: Shadow;
  dp08: Shadow;
  dp09: Shadow;
  dp12: Shadow;
  dp16: Shadow;
  dp24: Shadow;
}

export const shadows: IThemeShadows = {
  dpMinus24: {
    shadowOffset: {
      width: 0,
      height: -12,
    },
    shadowOpacity: -0.58,
    shadowRadius: 16.0,
  },
  dp01: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
  },
  dp02: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  dp03: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  dp04: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
  },
  dp06: {
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  dp08: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  dp09: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
  },
  dp12: {
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
  },
  dp16: {
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
  },
  dp24: {
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
};
