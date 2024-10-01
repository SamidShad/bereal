import LeftBar from "./Sides/LeftBar";
import RightBar from "./Sides/RightBar";

function SideBars({ left, right }) {
  return (
    <>
      <div className="hidden lg:flex w-[100%] h-[100%] justify-center fixed">
        <div className="w-[100%] max-w-[2000px] flex justify-between">
          {left && <LeftBar />}
          {right && <RightBar />}
        </div>
      </div>
    </>
  );
}

export default SideBars;
