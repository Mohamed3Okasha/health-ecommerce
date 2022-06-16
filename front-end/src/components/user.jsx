import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
const prodAPI = "https://healthecommerce.herokuapp.com";

const User = (props) => {
  const [allUsers, setAllUsers] = useState([]);
  const statusList = ["active", "deactivated", "suspended"];

  useEffect(() => {
    const fetchData = async () => {
      const getUersResponse = await axios.get(`${prodAPI}/allUsers`, {
        headers: { Authorization: `Bearer ${props.logedUser.token}` },
      });
      console.log("User - getUersResponse: ", getUersResponse);
      setAllUsers(getUersResponse.data);
    };

    fetchData();
  }, []);

  const handleChangeUserStatus = async (e, userId) => {
    console.log("handleChangeUserStatus - userId: ", e.target.value, userId);
    // setSelectedStatus(e.target.value);
    let targetStatus = e.target.value;
    const changeSatusResponse = await axios.put(
      `${prodAPI}/changeUserStatus/${userId}`,
      { status: targetStatus },
      {
        headers: { Authorization: `Bearer ${props.logedUser.token}` },
      }
    );

    console.log("adminDashboard - changeSatusResponse: ", changeSatusResponse);
    if (changeSatusResponse.status === 200) {
      let cloneAllUsers = [...allUsers];
      cloneAllUsers.find((u) => u._id === userId).status = targetStatus;
      setAllUsers(cloneAllUsers);
    }
  };

  return (
    <React.Fragment>
      <table className="table table-secondary table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Change Status</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((u) => {
            return (
              <tr>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.status}</td>
                <td role="button">
                  <select
                    className={
                      u.status === "suspended"
                        ? "form-select disableForm"
                        : "form-select"
                    }
                    name="selectStatus"
                    id="inputStatus"
                    value={u.status}
                    onChange={(e) => handleChangeUserStatus(e, u._id)}
                  >
                    {statusList.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default User;
