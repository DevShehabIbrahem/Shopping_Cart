import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
}));
