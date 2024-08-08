const SMTPServer = require("smtp-server").SMTPServer;

const PORT = 25;

const server = new SMTPServer({
  allowInsecureAuth: true,
  authOptional: true,
  onConnect(session, cb) {
    console.log(`onConnect`, session.id);
    cb(); // Accept the connection
  },
  onMailFrom(address, session, cb) {
    console.log(`onMailFrom`, address.address, session.id);
    cb();
  },
  onRcptTo(address, session, cb) {
    console.log(`onRcptTo`, address.address, session.id);
    cb();
  },
  onData(stream, session, cb) {
    stream.on("data", (data) => console.log(`onData ${data.toString()}`)); // Log all data
    stream.on("end", cb); // End the stream
  },
});

server.listen(PORT, () => console.log("Server Running on port 25"));
