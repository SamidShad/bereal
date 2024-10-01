import { useEffect, useState } from "react";
import { getAllRecentUsers } from "../../../api/api";
import { Link } from "react-router-dom";

function RightBar() {
  const [usersArray, setUsersArray] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const users = await getAllRecentUsers();
      setUsersArray(users);
    }
    getUsers();
  }, []);

  return (
    <>
      <div className="h-screen  w-[300px] xl:w-[400px] bg-black mt-[80px] m-2 rounded-md">
        <h1 className="text-white font-medium text-xl m-4">Recent Users</h1>
        <div className="w-[100%] flex items-start flex-col mt-8">
          {usersArray &&
            usersArray.map((value) => {
              return (
                <Link key={value._id} to={`/profile/${value.userName}`}>
                  <div className="ml-5 m-4 flex items-center cursor-pointer ">
                    <img
                      className="rounded-full"
                      src={value.profileImage}
                      width={60}
                      alt="user"
                    />
                    <h1 className="ml-2 text-md text-white">
                      {value.userName}
                    </h1>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default RightBar;
