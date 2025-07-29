rs = {
  _id: "rs0",
  members: [{ _id: 0, host: "localhost:27017" }]
};

function tryInit() {
  try {
    const status = rs.status();
    if (status.ok === 1) {
      print("Replica set already initialized");
      return;
    }
  } catch (e) {
    print("Replica set not initialized, initiating...");
    rs.initiate(rs);
  }
}
tryInit();
