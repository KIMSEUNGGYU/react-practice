import React, { Component } from "react";

import ColorContext from "../context/color";

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

class SelectColors extends Component {
  static contextType = ColorContext;

  handleSetColor = (color) => {
    this.context.actions.setColor(color);
  };
  handleSetSubColor = (color) => {
    this.context.actions.setSubColor(color);
  };

  render() {
    return (
      <div style={{ display: "flex" }}>
        {colors.map((color) => (
          <div
            key={color}
            style={{
              background: color,
              width: "24px",
              height: "24px",
              cursor: "pointer",
            }}
            onClick={() => this.handleSetColor(color)}
            onContextMenu={(event) => {
              event.preventDefault();
              this.handleSetSubColor(color);
            }}
          />
        ))}
      </div>
    );
  }
}

// 함수형
// const SelectColors = () => {
//   return (
//     <div>
//       <h2>색상을 선택하세요.</h2>
//       <ColorConsumer>
//         {({ actions }) => (
//           <div style={{ display: "flex" }}>
//             {colors.map((color) => (
//               <div
//                 key={color}
//                 style={{
//                   background: color,
//                   width: "24px",
//                   height: "24px",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => actions.setColor(color)}
//                 onContextMenu={(event) => {
//                   event.preventDefault();
//                   actions.setSubColor(color);
//                 }}
//               />
//             ))}
//           </div>
//         )}
//       </ColorConsumer>
//       <hr />
//     </div>
//   );
// };

export default SelectColors;
