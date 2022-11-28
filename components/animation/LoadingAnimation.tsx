import React from 'react';

export default function LoadingAnimation(props: any) {
  return (
    <div className="wrapper">
      <div className="circle" style={{ backgroundColor: props.color }}></div>
      <div className="circle" style={{ backgroundColor: props.color }}></div>
      <div className="circle" style={{ backgroundColor: props.color }}></div>
      <div className="shadow" style={{ backgroundColor: props.color }}></div>
      <div className="shadow" style={{ backgroundColor: props.color }}></div>
      <div className="shadow" style={{ backgroundColor: props.color }}></div>
    </div>
  );
}
