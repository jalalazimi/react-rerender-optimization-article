import React from "react";
import ReactDOM from "react-dom";
import getUsers from "../services/users";

function UsersList() {
  const [users, setUsers] = React.useState([]);
  const fetch = async () => {
    const res = await getUsers();
    setUsers(res);
  };

  React.useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold px-6 py-3 sticky top-0 bg-white shadow">Github Users</h1>
      {users.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 gap-3 my-6 mx-2">
          {users.map((user,id) => (
            <div className="p-1" key={id}>
              <div className="bg-white px-6 py-8 rounded-md shadow-lg text-center hover:shadow-xl transition duration-150 ease-in-out">
                <div className="mb-3">
                  <img
                    className="w-32 h-32 mx-auto rounded-full"
                    src={user.avatar_url}
                    alt={user.login}
                  />
                </div>
                <h2 className="text-xl font-semibold capitalize text-gray-700 my-3">{user.login}</h2>
                <a
                  href={user.html_url}
                  target="_blank"
                  className="px-4 py-2 bg-blue-500 text-white rounded-full uppercase"
                >
                  Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="py-32 text-center text-xl font-bold">Loading...</h1>
      )}
    </>
  );
}

ReactDOM.render(<UsersList />, document.getElementById("root"));
