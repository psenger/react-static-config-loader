// Type definitions for @psenger/react-static-config-loader 1.0.5
// Project: react-static-config-loader
// Definitions by: Philip A. Senger https://github.com/psenger

import React from "react";

export interface StaticConfigWrapperProps {
  loader: () => Promise<any>;
  loadingMsg?: string;
  children?: React.ReactNode;
}

export interface ConfigPropExtenderHocProps {
  propName: string|'config';
  children?: React.ReactNode;
}

// export class StaticConfigWrapper extends React.Component {
//   constructor(props: StaticConfigWrapperProps, context: any);
// }

export function StaticConfigWrapper( props: StaticConfigWrapperProps ): JSX.Element;

// export class ConfigPropExtenderHoc extends React.Component {
//   constructor(props: ConfigPropExtenderHocProps, context: any);
// }

export function ConfigPropExtenderHoc( props: ConfigPropExtenderHocProps ): JSX.Element;
