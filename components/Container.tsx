import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
      <div>{children}</div>
    </div>
  );
};

export default Container;
