import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CardItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));