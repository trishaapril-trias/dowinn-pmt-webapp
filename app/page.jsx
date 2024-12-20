import Login from "@components/Login";

const Home = () => {

  return (
    <selection className="w-full flex-center flex-col">
      <h1 className=" head_text text-center">
        Project Management Tool
        <br className=" max-md:hidden" />
        <span className="orange_gradient text-center">
          Project & Tasks Tracker
        </span>
      </h1>

     <Login/>
     
    </selection>
  );
};

export default Home;
