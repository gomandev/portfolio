import { FC, ReactNode, useState, useContext } from "react";
import { Container } from "../container";
import img from "../../../assets/me.jpeg";
import Navbar from "../../section/Navbar";
export interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({
  children,
}: MainLayoutProps) => {
  const [isSideBarOpened, setSidebarStatus] = useState<boolean>(false);
  const value = { isSideBarOpened, setSidebarStatus };

  return (
    <div className="relative overflow-hidden h-screen">
      <Navbar />
      <div className="xl:max-w-screen-2xl lg:max-w-screen-xl px-20 mt-20">
        <div className="flex">
          <div className="left">
            <h1 className="h1 text-light text-midLarge font-bold">
              Hello, I'm
              <br />
              Mo Awwal
            </h1>
            <p className="text-light font-thin mt-10">
              Passionate and Team-oriented JavaScript developer with 2 years of
              experience. Seeking to use proven development skills and technical
              problem-solving skills to provide optimal code solutions for
              Companies.
              <strong>At Upwork, i have:</strong>
              <ul>
                <li>
                  - Increased a Jamstack website performance score by 100%
                </li>
                <li>
                  - Wrote a script that covers and automates more than 500, 000
                  online stores.
                </li>
              </ul>
              In my free time, I love contributing to open-source.
            </p>
          </div>
          <div className="right">{children}</div>
        </div>
      </div>
    </div>
  );
};
