import React from "react";

function User(props) {
  return (
    <div>fizzgen x {`${props.user.attributes["custom:artistName"]} `}</div>
  );
}

export default User;
