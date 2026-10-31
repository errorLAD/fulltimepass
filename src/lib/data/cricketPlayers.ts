export type CricketPlayer = {
  name: string;
  country: string;
  gender: "Male" | "Female";
  status: "Active" | "Retired";
  group: "Indian" | "International";
};

// Editable starter directory supplied for the local team generator. Statuses are
// broad starter labels (international playing/retired), not a live roster feed.
const entries: Array<[string, string, CricketPlayer["gender"], CricketPlayer["status"]]> = [
  ["Sachin Tendulkar", "India", "Male", "Retired"], ["MS Dhoni", "India", "Male", "Retired"],
  ["Virat Kohli", "India", "Male", "Active"], ["Rohit Sharma", "India", "Male", "Active"],
  ["Yuvraj Singh", "India", "Male", "Retired"], ["Sourav Ganguly", "India", "Male", "Retired"],
  ["Rahul Dravid", "India", "Male", "Retired"], ["Kapil Dev", "India", "Male", "Retired"],
  ["Sunil Gavaskar", "India", "Male", "Retired"], ["Virender Sehwag", "India", "Male", "Retired"],
  ["Suresh Raina", "India", "Male", "Retired"], ["Gautam Gambhir", "India", "Male", "Retired"],
  ["Harbhajan Singh", "India", "Male", "Retired"], ["Anil Kumble", "India", "Male", "Retired"],
  ["Ravindra Jadeja", "India", "Male", "Active"], ["Hardik Pandya", "India", "Male", "Active"],
  ["Jasprit Bumrah", "India", "Male", "Active"], ["Shubman Gill", "India", "Male", "Active"],
  ["Rishabh Pant", "India", "Male", "Active"], ["KL Rahul", "India", "Male", "Active"],
  ["Shikhar Dhawan", "India", "Male", "Retired"], ["Zaheer Khan", "India", "Male", "Retired"],
  ["Ashish Nehra", "India", "Male", "Retired"], ["Suryakumar Yadav", "India", "Male", "Active"],
  ["Sanju Samson", "India", "Male", "Active"], ["Smriti Mandhana", "India", "Female", "Active"],
  ["Mithali Raj", "India", "Female", "Retired"], ["Harmanpreet Kaur", "India", "Female", "Active"],
  ["Jhulan Goswami", "India", "Female", "Retired"],

  ["Ricky Ponting", "Australia", "Male", "Retired"], ["Adam Gilchrist", "Australia", "Male", "Retired"],
  ["Steve Smith", "Australia", "Male", "Active"], ["David Warner", "Australia", "Male", "Retired"],
  ["Glenn Maxwell", "Australia", "Male", "Active"], ["Shane Warne", "Australia", "Male", "Retired"],
  ["Brett Lee", "Australia", "Male", "Retired"], ["Pat Cummins", "Australia", "Male", "Active"],
  ["Joe Root", "England", "Male", "Active"], ["Ben Stokes", "England", "Male", "Active"],
  ["Jos Buttler", "England", "Male", "Active"], ["James Anderson", "England", "Male", "Retired"],
  ["Kevin Pietersen", "England", "Male", "Retired"], ["Andrew Flintoff", "England", "Male", "Retired"],
  ["Wasim Akram", "Pakistan", "Male", "Retired"], ["Waqar Younis", "Pakistan", "Male", "Retired"],
  ["Shahid Afridi", "Pakistan", "Male", "Retired"], ["Babar Azam", "Pakistan", "Male", "Active"],
  ["Shoaib Akhtar", "Pakistan", "Male", "Retired"], ["Inzamam-ul-Haq", "Pakistan", "Male", "Retired"],
  ["AB de Villiers", "South Africa", "Male", "Retired"], ["Jacques Kallis", "South Africa", "Male", "Retired"],
  ["Dale Steyn", "South Africa", "Male", "Retired"], ["Hashim Amla", "South Africa", "Male", "Retired"],
  ["Faf du Plessis", "South Africa", "Male", "Retired"],
  ["Chris Gayle", "West Indies", "Male", "Retired"], ["Brian Lara", "West Indies", "Male", "Retired"],
  ["Viv Richards", "West Indies", "Male", "Retired"], ["Andre Russell", "West Indies", "Male", "Retired"],
  ["Kieron Pollard", "West Indies", "Male", "Retired"],
  ["Kumar Sangakkara", "Sri Lanka", "Male", "Retired"], ["Mahela Jayawardene", "Sri Lanka", "Male", "Retired"],
  ["Sanath Jayasuriya", "Sri Lanka", "Male", "Retired"], ["Muttiah Muralitharan", "Sri Lanka", "Male", "Retired"],
  ["Kane Williamson", "New Zealand", "Male", "Active"], ["Brendon McCullum", "New Zealand", "Male", "Retired"],
  ["Ross Taylor", "New Zealand", "Male", "Retired"], ["Trent Boult", "New Zealand", "Male", "Active"],
  ["Shakib Al Hasan", "Bangladesh", "Male", "Active"], ["Tamim Iqbal", "Bangladesh", "Male", "Retired"],
  ["Mushfiqur Rahim", "Bangladesh", "Male", "Active"],
  ["Rashid Khan", "Afghanistan", "Male", "Active"], ["Mohammad Nabi", "Afghanistan", "Male", "Active"],
  ["Mujeeb Ur Rahman", "Afghanistan", "Male", "Active"],
];

export const CRICKET_PLAYERS: CricketPlayer[] = entries.map(([name, country, gender, status]) => ({
  name,
  country,
  gender,
  status,
  group: country === "India" ? "Indian" : "International",
}));

export const CRICKET_COUNTRIES = Array.from(new Set(CRICKET_PLAYERS.map((player) => player.country))).sort();
