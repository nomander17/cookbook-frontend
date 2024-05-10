import { Feed } from "./Feed";
import HomeSideBar from "./HomeSideBar";

const Home = () => {
  return (
    <div className="max-w-screen max-h-screen flex">
      <HomeSideBar />
      <div className="bg-foreground flex-1 h-screen">
        {/* panel container to stop flow */}
        <div className="overflow-auto h-screen overflow-x-hidden">
          <Feed />
        </div>
      </div>
    </div>
  );
};

export { Home };
