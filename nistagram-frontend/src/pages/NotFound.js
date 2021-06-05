import { Box, Container, Typography } from "@material-ui/core";
import not_found from "../assets/images/not_found.svg";

const NotFound = () => (
  <>
    <Box
      sx={{
        backgroundColor: "background.default",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
      }}
      style={{ marginTop: "100px" }}
    >
      <Container maxWidth="md">
        <Typography align="center" color="textPrimary" variant="h4">
          404: The page you are looking for isn’t here
        </Typography>
        <Typography align="center" color="textSecondary" variant="subtitle2">
          You either tried some shady route or you came here by mistake.
          Whichever it is, try using the navigation
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <img
            alt="Under development"
            src={not_found}
            style={{
              marginTop: 50,
              marginLeft: 160,
              display: "inline-block",
              maxWidth: "100%",
              width: 560,
            }}
          />
        </Box>
      </Container>
    </Box>
  </>
);

export default NotFound;
