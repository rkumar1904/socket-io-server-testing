const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server); // < Interesting!

let interval;
io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 10000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

const getApiAndEmit = async socket => {
  try {
    //update the bellow code for get weather forcast
    const res = await axios.get(
      "https://api.darksky.net/forecast/<your key>/<log/Lat>"
    ); // Getting the data from DarkSky
    const values = [
      {
        id: '000000001',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: 'Today is the notice day',
        // datetime: '2020-08-09',
        type: 'Notice',
      },
      {
        id: '000000002',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        title: 'offer is going to live coming two days',
        datetime: '2020-08-08',
        type: 'News',
      },
      {
        id: '000000003',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
        title: '20% offer new arrival',
        datetime: '2020-08-07',
        read: true,
        type: 'Upcoming',
      },
      {
        id: '000000004',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: 'ads are going to publish today end of the day.',
        datetime: '2020-08-07',
        type: 'Upcoming',
      },
      {
        id: '000000005',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: 'offer is going to expire today',
        datetime: '2020-08-07',
        type: 'Notice',
      },
      {
        id: '000000006',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'monday is close',
        description: 'the comming monday is gonging to be closed ⏳',
        datetime: '2020-08-07',
        type: 'Notice',
      },
      {
        id: '000000007',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '朱偏右 回复了你',
        description: 'kindly update upcoming event pic',
        datetime: '2020-08-07',
        type: 'Upcoming',
      },
      {
        id: '000000008',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '20$ offer on ice-creem',
        description: '20$ offer on new arrivale icecreems',
        datetime: '2020-08-07',
        type: 'news',
      },
      {
        id: '000000009',
        title: '#billeasy tag',
        description: '#billeasy tag is in trending on instagram kindly update more tag with pics',
        extra: '#billeasy',
        status: 'todo',
        type: 'Notice',
      },
    ];
    socket.emit("FromAPI", values); // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
};
