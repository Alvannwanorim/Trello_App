type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center mt-20">
      {children}
    </div>
  );
};

export default Layout;
