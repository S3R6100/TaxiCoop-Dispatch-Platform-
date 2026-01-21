import React from "react";

const KpiCard = ({
  title,
  value,
  icon: Icon,
  accent = "bg-taxi-yellow",
  subtitle,
}) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow flex items-center justify-between">
      <div>
        <h4 className="text-sm text-gray-500 font-medium">{title}</h4>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-gray-800">{value}</span>
          {subtitle && (
            <span className="text-sm text-gray-500">{subtitle}</span>
          )}
        </div>
      </div>
      <div className={"p-3 rounded-md shadow-sm " + accent}>
        {Icon ? <Icon className="text-white h-6 w-6" /> : null}
      </div>
    </div>
  );
};

export default KpiCard;
