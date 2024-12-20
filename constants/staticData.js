
const tasksData = [
    {
        project_id: 1,
        name: "API Integration",
        status: "Todo",
        contents: "user (get, post, delete)"
      },
      {
        project_id: 1,
        name: "UI Implementation",
        status: "InProgress",
        contents: "Home Module"
      },
      {
          project_id: 1,
          name: "Sample",
          status: "InProgress",
          contents: "Home Module"
        }
];

const projectData = [
  {
    user_id: "Juan",
    name: "Tivoli Money Exchange",
    description: "CRM Web Application for Exchanging of Currencies",
  },
  {
    user_id: "Juan",
    name: "Exacto Express",
    description: "E-Commerce Web Application",
  },
  {
    user_id: "Juan",
    name: "BlackFe",
    description: "CRM Web Application for Buying NFT Tiers",
  },
];

const logsData = [
  {
    task_id: 1,
    old_status: "Todo",
    new_status: "InProgress",
    remark: "N/A",
  },
  {
    task_id: 2,
    old_status: "InProgress",
    new_status: "Done",
    remark: "N/A",
  },
];

export {
    tasksData,
    projectData,
    logsData
}