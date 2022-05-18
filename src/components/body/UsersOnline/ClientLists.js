import React, { useState, useEffect } from "react";
import moment from "moment";
import { CLIENT_LIST_API } from "../../../jsonAPI/jsonAPI";
import axios from "axios";
import { Typography, Box, Container } from "@mui/material";
import styles from "./style.module.css";
import { DevicesOther, Link } from "@mui/icons-material";
function ClientLists() {
  const [date, setDate] = useState(0);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(CLIENT_LIST_API)
      .then((resposne) => resposne.data.firstrouter)
      .then((result) => {
        // get the last array from response
        const lastArray = result.at(-1);
        // Format date using momentJS
        const date = moment(
          new Date(lastArray.date * 1000).toISOString()
        ).fromNow();
        // save all users from lastArray
        const users = lastArray.users;
        setDate(date);
        setUsers(users);
      });
    // const userList = users.map((user) => user);
  }, []);

  const userList = users.map((user, index) => {
    return (
      <Box
        className={styles.box_container}
        sx={{ animationDelay: 50 * index + "ms" }}
        key={index}
      >
        <Typography
          variant="h6"
          color="text-primary"
          sx={{ fontFamily: "'Sen',arial", fontWeight: "600" }}
        >
          {user.user}
        </Typography>
        <Box className={styles.ipMac}>
          <Typography className={styles.center}>
            <DevicesOther
              sx={{ marginRight: "5px", color: "rgb(242, 75, 114)" }}
            />
            {user.macAddress.toUpperCase()}
          </Typography>
          <Typography className={styles.center}>
            <Link sx={{ marginRight: "5px", color: "rgb(31, 119, 179)" }} />
            {user.ipAddress}
          </Typography>
        </Box>
      </Box>
    );
  });
  return (
    <Container className={styles.wrapper}>
      <hr />
      <div className={styles.lastUpdate}>Last Update: {date}</div>
      <div className={styles.container}>{userList}</div>
      <hr />
    </Container>
  );
}

export default ClientLists;
