const chatBotSteps = [
  {
    id: "1",
    message: "What is your name?",
    trigger: "2",
  },
  {
    id: "2",
    user: true,
    trigger: "3",
  },
  {
    id: "3",
    message: "Hi {previousValue}, nice to meet you!",
    trigger: "4",
  },
  {
    id: "4",
    message: "What do you want to know?",
    trigger: "5",
  },
  {
    id: "5",
    options: [
      { value: 1, label: "CoreDecor Contact No.", trigger: "6" },
      { value: 2, label: "CoreDecor Location", trigger: "7" },
    ],
  },

  {
    id: "6",
    message: "036615759521",
    trigger: "8",
  },
  {
    id: "7",
    message: "Saddar, Rawalpindi",
    trigger: "8",
  },
  {
    id: "8",
    message: "Do you want to know anything else?",
    trigger: "9",
  },
  {
    id: "9",
    options: [
      {value: 1, label: "Yes", trigger: "4" },
      {value: 2, label: "No", trigger: "10" },
    ],
  },
  {
    id: "10",
    message: "Nice to having a chat with you",
    end: true,
  },
];

export default chatBotSteps;
