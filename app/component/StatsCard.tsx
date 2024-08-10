import React from "react";
import { StatsCardType } from "../types/type";


const StatsCardComponent = ({ title, value }: StatsCardType) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
      <h2 className="text-lg font-semibold">{title}</h2>
      {title === "percentage" ? ( <div className="text-3xl font-bold">{value}%</div>) :  <div className="text-3xl font-bold">{value}</div>}
   
    </div>
  );
};

export default StatsCardComponent;
