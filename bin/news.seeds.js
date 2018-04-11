const mongoose = require('mongoose');
require('../configs/db.config');
const News = require('../models/news.model');

const news = [
    {
        "orderTypeNumber": 4,
        "stored": [],
        "title": "Trump dies",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu erat ante. Suspendisse varius enim arcu, ut rhoncus tortor gravida vel. In convallis ullamcorper mauris, eu mollis dolor tincidunt vel. Maecenas at libero eu urna sodales condimentum eget ut lacus. Aenean nec ipsum sem. Nulla nulla mi, posuere ut velit eu, luctus hendrerit justo. Vestibulum mi ipsum, aliquet sit amet ligula convallis, faucibus cursus sapien. Donec hendrerit velit consectetur, dapibus neque ut, facilisis nisl. Donec quis dictum libero.",
        "deadline": "2018-03-26T22:00:00.000Z",
        "type": "danger",
        "createdAt": "2018-04-04T15:27:30.595Z",
        "updatedAt": "2018-04-04T15:27:30.595Z",
        "id": "5ac4eee21c346bd0f66eac2d"
    },
    {
        "orderTypeNumber": 3,
        "stored": [],
        "title": "Community",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu erat ante. Suspendisse varius enim arcu, ut rhoncus tortor gravida vel. In convallis ullamcorper mauris, eu mollis dolor tincidunt vel. Maecenas at libero eu urna sodales condimentum eget ut lacus. Aenean nec ipsum sem. Nulla nulla mi, posuere ut velit eu, luctus hendrerit justo. Vestibulum mi ipsum, aliquet sit amet ligula convallis, faucibus cursus sapien. Donec hendrerit velit consectetur, dapibus neque ut, facilisis nisl. Donec quis dictum libero.",
        "deadline": "2018-03-26T22:00:00.000Z",
        "type": "alert",
        "createdAt": "2018-04-04T15:27:42.764Z",
        "updatedAt": "2018-04-04T15:27:42.764Z",
        "id": "5ac4eeee1c346bd0f66eac2f"
    },
    {
        "orderTypeNumber": 2,
        "stored": [],
        "title": "Ironhack ",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu erat ante. Suspendisse varius enim arcu, ut rhoncus tortor gravida vel. In convallis ullamcorper mauris, eu mollis dolor tincidunt vel. Maecenas at libero eu urna sodales condimentum eget ut lacus. Aenean nec ipsum sem. Nulla nulla mi, posuere ut velit eu, luctus hendrerit justo. Vestibulum mi ipsum, aliquet sit amet ligula convallis, faucibus cursus sapien. Donec hendrerit velit consectetur, dapibus neque ut, facilisis nisl. Donec quis dictum libero.",
        "deadline": "2018-03-26T22:00:00.000Z",
        "type": "info",
        "createdAt": "2018-04-04T15:27:37.773Z",
        "updatedAt": "2018-04-04T15:27:37.773Z",
        "id": "5ac4eee91c346bd0f66eac2e"
    },
    {
        "orderTypeNumber": 1,
        "stored": [],
        "title": "Fidel Castro still lives",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu erat ante. Suspendisse varius enim arcu, ut rhoncus tortor gravida vel. In convallis ullamcorper mauris, eu mollis dolor tincidunt vel. Maecenas at libero eu urna sodales condimentum eget ut lacus. Aenean nec ipsum sem. Nulla nulla mi, posuere ut velit eu, luctus hendrerit justo. Vestibulum mi ipsum, aliquet sit amet ligula convallis, faucibus cursus sapien. Donec hendrerit velit consectetur, dapibus neque ut, facilisis nisl. Donec quis dictum libero.",
        "deadline": "2018-03-26T22:00:00.000Z",
        "type": "good",
        "createdAt": "2018-04-04T15:27:45.957Z",
        "updatedAt": "2018-04-04T15:27:45.957Z",
        "id": "5ac4eef11c346bd0f66eac30"
    },
    {
        "orderTypeNumber": 1,
        "stored": [],
        "title": "try changed",
        "description": "Because yes",
        "deadline": "2018-03-26T22:00:00.000Z",
        "type": "good",
        "createdAt": "2018-04-07T13:55:42.949Z",
        "updatedAt": "2018-04-07T13:57:30.081Z",
        "id": "5ac8cdde47ad16fa639142db"
    },
    {
        "orderTypeNumber": 0,
        "stored": [],
        "title": "We will destroy everything with a bomb",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu erat ante. Suspendisse varius enim arcu, ut rhoncus tortor gravida vel. In convallis ullamcorper mauris, eu mollis dolor tincidunt vel. Maecenas at libero eu urna sodales condimentum eget ut lacus. Aenean nec ipsum sem. Nulla nulla mi, posuere ut velit eu, luctus hendrerit justo. Vestibulum mi ipsum, aliquet sit amet ligula convallis, faucibus cursus sapien. Donec hendrerit velit consectetur, dapibus neque ut, facilisis nisl. Donec quis dictum libero.",
        "deadline": "2018-03-26T22:00:00.000Z",
        "type": "neutral",
        "createdAt": "2018-04-04T15:27:12.847Z",
        "updatedAt": "2018-04-04T15:27:12.847Z",
        "id": "5ac4eed01c346bd0f66eac2c"
    }
]

News.create(news)
  .then(() => {
    console.info("Seeds success:", news);
    mongoose.connection.close();
  })
  .catch(error => {
    console.error("Seeds error:", news);
    mongoose.connection.close();
  });