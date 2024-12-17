import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from "../redux/authSlice";
import axios from "axios";

const UserInfos = () => {
   const dispatch = useDispatch();
   const { token, user } = useSelector((state) => state.auth);

   const [isEditing, setIsEditing] = useState(false);
   const [tempUsername, setTempUsername] = useState(user?.userName || "");

   const handleSave = async () => {
      try {
         const response = await axios.put(
            "http://localhost:3001/api/v1/user/profile",
            { userName: tempUsername },
            { headers: { Authorization: `Bearer ${token}` } }
         );

         dispatch(updateUsername({ userName: response.data.body.userName }));
         setIsEditing(false);
      } catch (error) {
         console.error("Error updating username:", error.message);
      }
   };

   return (
      <div className="header bg-white">
         {isEditing ? (
            <form
               onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
               }}
            >
               <div className="input-wrapper">
                  <label htmlFor="firstName">First name:</label>
                  <input
                     type="text"
                     id="firstName"
                     value={user?.firstName || ""}
                     disabled
                  />
               </div>
               <div className="input-wrapper">
                  <label htmlFor="lastName">Last name:</label>
                  <input
                     type="text"
                     id="lastName"
                     value={user?.lastName || ""}
                     disabled
                  />
               </div>
               <div className="input-wrapper">
                  <label htmlFor="username">User name:</label>
                  <input
                     type="text"
                     id="username"
                     value={tempUsername}
                     onChange={(e) => setTempUsername(e.target.value)}
                  />
               </div>
               <button type="submit" className="edit-button">
                  Save
               </button>
               <button
                  type="button"
                  className="edit-button"
                  onClick={() => setIsEditing(false)}
               >
                  Cancel
               </button>
            </form>
         ) : (
            <>
               <h1>
                  Welcome back
                  <br />
                  {user?.firstName} {user?.lastName}!
               </h1>
               <button
                  className="edit-button"
                  onClick={() => setIsEditing(true)}
               >
                  Edit Name
               </button>
            </>
         )}
      </div>
   );
};

export default UserInfos;
