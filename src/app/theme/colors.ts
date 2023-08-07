interface IDefaultColorMap {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

type GradientColor = {
  stops: string[];
  angle?: number;
};

type DefaultColors = {
  neutral: {
    black: string;
    blackAlpha: string;
    white: string;
    overlay: string;
  };
  primary: {
    purple: IDefaultColorMap;
    blue: IDefaultColorMap;
  };
  complementary: IDefaultColorMap;
  analogous: IDefaultColorMap;
  triadic: IDefaultColorMap;
  gray: IDefaultColorMap;
  task: {
    blue: string;
    green: string;
    yellow: string;
    orange: string;
    red: string;
  };
  gradient: {
    primary: GradientColor;
    blue: GradientColor;
    inhibitor: GradientColor;
  };
};

export interface IThemeColors extends DefaultColors {
  brand: string;
  error: string;
}

export type ThemeColorsKeys = keyof IThemeColors;

const defaultColors: DefaultColors = {
  neutral: {
    black: '#000000',
    blackAlpha: '#0000001f',
    white: '#FFFFFF',
    overlay: '#000000b3',
  },
  primary: {
    purple: {
      '50': '#EDE5FC',
      '100': '#D0C0F8',
      '200': '#AF96F4',
      '300': '#8C6AF1',
      '400': '#6D47EE',
      '500': '#4821EA',
      '600': '#381CE4',
      '700': '#1214DB',
      '800': '#000DD6',
      '900': '#0000C8',
    },
    blue: {
      '50': '#E3F2FD',
      '100': '#BBDEFB',
      '200': '#90CAF9',
      '300': '#64B5F6',
      '400': '#42A5F5',
      '500': '#2196F3',
      '600': '#1E88E5',
      '700': '#1976D2',
      '800': '#1565C0',
      '900': '#0D47A1',
    },
  },
  complementary: {
    '50': '#F7FDE6',
    '100': '#ECF9C1',
    '200': '#DFF698',
    '300': '#D2F26C',
    '400': '#C7EE47',
    '500': '#BEEB15',
    '600': '#B3D807',
    '700': '#A4C100',
    '800': '#95AA00',
    '900': '#7E8200',
  },
  analogous: {
    '50': '#F7E7FC',
    '100': '#EAC2F9',
    '200': '#DC98F6',
    '300': '#CE6CF2',
    '400': '#C147EE',
    '500': '#B51BE9',
    '600': '#A31BE3',
    '700': '#8B19DC',
    '800': '#7517D6',
    '900': '#4618C9',
  },
  triadic: {
    '50': '#F8E8E7',
    '100': '#F8CABC',
    '200': '#F4A892',
    '300': '#F08767',
    '400': '#EE6E47',
    '500': '#EC5629',
    '600': '#E15025',
    '700': '#D44A21',
    '800': '#C6441E',
    '900': '#AD3716',
  },
  gray: {
    '50': '#FAFAFA',
    '100': '#F5F5F5',
    '200': '#EEEEEE',
    '300': '#E0E0E0',
    '400': '#BDBDBD',
    '500': '#9E9E9E',
    '600': '#757575',
    '700': '#616161',
    '800': '#424242',
    '900': '#212121',
  },
  task: {
    blue: '#5290E7',
    green: '#70C134',
    yellow: '#FEB701',
    orange: '#FF7A00',
    red: '#ED4D4D',
  },
  gradient: {
    primary: {
      stops: ['#AF96F4', '#4618C9'],
      angle: 139.44,
    },
    blue: {
      stops: ['#64B5F6', '#0D47A1'],
      angle: 139.44,
    },
    inhibitor: {
      stops: ['#FFFFFF', 'transparent'],
      angle: 180,
    },
  },
};

export const colors: IThemeColors = {
  ...defaultColors,
  error: defaultColors.triadic[600],
  brand: defaultColors.primary.blue[700],
};
