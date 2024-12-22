
import { formatDateTime } from "@helper/date";
import React from "react";

const LogsCards = ({log}) => {
  return (
    // <Link href={`/project/${log.name}`}>
      <div className="flex flex-col hover:bg-gray-200/50 border-b border-slate-300 p-5 text-center">
        <h2 className="">{log.task_id}</h2>
        <p className="text-md"><b className=" text-primary-orange">{log.old_status}</b> to <b className=" text-primary-orange">{log.new_status}</b></p>
        <p className="text-xs text-gray-500">{formatDateTime(log.created_at) }</p>
        <label className=" text-sm">Remarks:</label>
        <p className="text-xs  text-gray-500 ">{log.remark}</p>
      </div>
    // </Link>
  );
};

export default LogsCards;
