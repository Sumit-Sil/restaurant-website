import React from "react";
import "semantic-ui-css/semantic.min.css";

export default function Loader() {
  return (
    <>
      <div className="ui active inverted dimmer" >
        <div className="ui mini text loader" style={{fontSize:"50px"}}>Loading</div>
      </div>
    </>
  );
}