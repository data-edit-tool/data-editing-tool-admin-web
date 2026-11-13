import { theme } from 'styles/theme';

import 'styled-components';

type ThemeInterface = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeInterface {}
}
