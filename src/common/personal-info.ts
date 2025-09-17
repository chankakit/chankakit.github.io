interface EduItem {
  degree: string
  school: string
}

interface WorkExpItem {
  startTime: string
  endTime: string
  company: string
  title: string
}

interface personalInfo {
  education: EduItem[],
  workExp: WorkExpItem[],
  wechat: string,
  mail: string
}
const personalInfo:personalInfo = {
  education: [
    {
      degree: "本科",
      school: "广东工业大学 - 光信息科学",
    },
  ],
  workExp: [
    {
      startTime: "2024.06",
      endTime: "       ",
      company: "佛山荣星印刷",
      title: "印前文件制作"
    },
    {
      startTime: "2018.02",
      endTime: "2022.09",
      company: "腾讯 - CSIG 安全线",
      title: "视觉设计"
    },
    {
      startTime: "2013.01",
      endTime: "2017.11",
      company: "BestApp 工作室",
      title: "UI 设计"
    },
  ],
  wechat: "a2l0MjcxODI4",
  mail: "Y2hhbmtha2l0QG91dGxvb2suY29t"
}
export default personalInfo