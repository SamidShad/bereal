import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { showCard } from "../../store/slices/alertSlice";

function CardAlert() {
  const showCardState = useSelector((state) => state.alertSlice);
  const dispatch = useDispatch();
  const isToken = useSelector((state) => state.tokenSlice.token);

  useEffect(() => {
    if (isToken) {
      dispatch(showCard(false));
    } else {
      dispatch(showCard(true));
    }
  }, [isToken, dispatch]);

  return (
    <>
      {showCardState.showCardAlert && (
        <div className="fixed w-[100%] h-[100vh] bg-black/30 backdrop-blur-sm top-0 z-[12] flex justify-center items-center">
          <div className="bg-black px-[50px] py-10 rounded-lg border-blue-700 border flex justify-center items-center flex-col">
            <div className="text-white text-center">
              <p className="text-1xl">You're not</p>
              <h1 className="text-3xl font-bold">Authenticated</h1>
            </div>
            <div className="mt-5">
              <Link to="/signup">
                <button className="hover:bg-blue-700 transition hover:text-white active:bg-blue-500 active:scale-95 bg-white rounded-md py-2 px-5 font-bold mx-1">
                  Sign Up
                </button>
              </Link>
              <button
                onClick={() => dispatch(showCard(false))}
                className="hover:bg-red-700 transition hover:text-white active:bg-blue-500 active:scale-95 bg-white rounded-md py-2 px-5 font-bold mx-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CardAlert;
