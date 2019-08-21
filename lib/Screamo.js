const axios = require('axios');
const env = require('./../.env');

class Screamo 
{
  static checkMessage(message)
  {
      const regex = /@all/;
      if (message!=null && regex.test(message.text))
        return true;
      return false;
  }

  static screamIt()
  {
    const url = `${process.env.BASE_URL}/v3/groups/${process.env.GROUP_ID}?token=${process.env.ACCESS_TOKEN}`
    var userIds = [];
    axios.get(url)
    .then((response) => 
      {
        // groupName = response.data.response["name"];
        var members = response.data.response["members"];
        members.forEach(m => {
          userIds.push(m["user_id"]);
        });
  
        postMessage(userIds);
      })
    .catch((error)=> console.error("Error:" + error));
  }
}


function postMessage(userIds) {
  const botMessage = '🗣"Hey everybody!"';
  const url = `${process.env.BASE_URL}/v3/bots/post`;

  const data = {
    "bot_id" : process.env.BOT_ID,
    "text" : botMessage,
    "attachments" : [{
      "type" : "mentions",
      "user_ids" : userIds
    }]
  };

  console.log('sending ' + botMessage + ' to ' + process.env.BOT_ID);
  axios.post(url, data)
    .then(response => {
      console.log("I screamed it!")
    })
    .catch(error => console.error("Error" + error));
}
module.exports = Screamo;