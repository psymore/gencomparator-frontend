import { List, ListItem } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CodyBotList = () => {
  const [botList, setBotList] = useState([]);

  const CODY_API_KEY = "7aGdkkOd0UVcc2HReQ0JrUJyOm8RhfLCvhcVZmhd84433a86";

  console.log(botList);

  useEffect(() => {
    const fetchBotList = async () => {
      try {
        const apiUrl = "https://getcody.ai/api/v1/bots";
        const headers = {
          Authorization: `Bearer ${CODY_API_KEY}`,
        };

        const response = await axios.get(apiUrl, { headers });

        if (response.status === 200) {
          setBotList(response.data.data);
        } else {
          console.error("Failed to fetch bot list");
        }
      } catch (error) {
        console.error("Error fetching bot list:", error);
      }
    };

    fetchBotList();
  }, []);

  return (
    <div>
      {botList.map((bot, ix) => (
        <List key={ix}>
          <ListItem>{bot.id}</ListItem>
          <ListItem>{bot.name}</ListItem>
          <ListItem>{bot.model}</ListItem>
        </List>
      ))}
    </div>
  );
};

export default CodyBotList;
