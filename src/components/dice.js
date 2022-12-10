import React from 'react';

function Dice(props) {
  const styles = {
          backgroundColor:"darkred",
          color:'white',
          textAlign: "center"
      }
return (
  <div className="dice_box"
    style={styles}
    onClick={props.throwDice}>
    <div style={styles}>
    {props.number}
    </div>
  </div>

)
} export default Dice;

