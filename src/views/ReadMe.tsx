import { ArrowRight } from "@mui/icons-material";
import {
  Avatar,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const techs: { title: string; desc: string }[] = [
  { title: "Axios", desc: "for handle http requests" },
  { title: "React-query", desc: "Query caching and revalidation" },
  {
    title: "Material ui - css modules",
    desc: "Components library + built-in styling",
  },
  { title: "react-hook-form", desc: "Very nice form state library" },
];

const notes: string[] = [
  "I've not added redux since react-query has an internal state and it might be an over-engineering using redux in case both are present. In that case i do prefer to work with redux toolkit library",
  "I choose css modules to avoid installing extra libraries",
  "Typescript always present in my projects :)",
  "I would have liked to have time to configure and add some e2e testing using Cypress or Playwright",
  "I hope I have shown something of what I can give with this small example, hopefully we can get to know each other and talk more in depth. Thank you for reading.",
];

export default function ReadMe() {
  return (
    <Container sx={{ marginTop: "2rem" }}>
      <Typography>Tech:</Typography>
      <List>
        {techs.map((item) => (
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ArrowRight />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.title} secondary={item.desc} />
          </ListItem>
        ))}
      </List>
      <Typography>Notes:</Typography>
      <ul>
        {notes.map((note) => (
          <li>{note}</li>
        ))}
      </ul>
    </Container>
  );
}
