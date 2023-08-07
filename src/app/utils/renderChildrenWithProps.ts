import React, { ReactNode } from 'react';

type DefaultForwardProps = Record<string, unknown>;
export const renderChildrenWithProps = <P = DefaultForwardProps>(
  children: ReactNode | undefined,
  props: P,
) => {
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, props || {});
    }
    return child;
  });
};
