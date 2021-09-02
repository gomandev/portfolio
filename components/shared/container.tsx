import clsx from 'clsx';
import { FC, ReactNode, useContext } from 'react';
import { SidebarContext } from 'shared-context';

export interface ContainerProps {
  children: ReactNode;
}

export const Container: FC<ContainerProps> = ({ children }: ContainerProps) => (
  // const { isSideBarOpened } = useContext(SidebarContext);
  <div
    data-testid="main-container-cp"
    className={clsx(
      'mobile-container   sm:max-w-screen-sm md:max-w-screen-md  lg:max-w-screen-lg xl:max-w-screen-xl mx-auto  ',
    )}
  >
    {children}
  </div>
);
