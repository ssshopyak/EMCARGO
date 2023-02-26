import React from 'react'

export const Button = ({ onClick,title, color, backgroundColor, padding, fontSize='16px', border='hidden' }) => {
    const mystyle = {
        padding: padding,  // top, right, bottom, left
        color: color,
        backgroundColor: backgroundColor,
        borderRadius: "4px",
        fontSize: fontSize,
        fontWeight: "600",
        cursor: "pointer",
        outline: "none",
        fontFamily: 'Raleway',
        border: border
      };
    return (
        <button onClick={onClick} style={mystyle}>{title}</button>
    )
}
