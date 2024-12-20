
import React from "react";

const LogsCards = ({log}) => {
  return (
    // <Link href={`/project/${log.name}`}>
      <div className="flex flex-col hover:bg-gray-200/50 border-b border-slate-300 p-5 text-center">
        <h2 className="">{log.task_id}</h2>
        <p className="text-sm"><b>{log.old_status}</b> to <b>{log.new_status}</b></p>
        <label className="">Remarks:</label>
        <p className="text-xs  text-gray-500 ">{log.remark}</p>
      </div>
    // </Link>
  );
};

export default LogsCards;
