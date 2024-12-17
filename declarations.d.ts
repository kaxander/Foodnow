declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'react-native-drawer' {
  import React, { Component } from 'react';
  import { ViewStyle } from 'react-native';

  type DrawerProps = {
    open?: boolean;
    type?: string;
    content?: JSX.Element;
    tapToClose?: boolean;
    openDrawerOffset?: number;
    panCloseMask?: number;
    closedDrawerOffset?: number;
    tweenHandler?: (ratio: number) => any;
    styles?: {
      drawer?: ViewStyle;
      main?: ViewStyle;
    };
    ref?: React.Ref<any>;
  };

  export default class Drawer extends Component<DrawerProps> {}
}
