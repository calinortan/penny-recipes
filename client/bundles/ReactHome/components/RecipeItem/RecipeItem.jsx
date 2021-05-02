import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListIcon from "@material-ui/icons/List";
import PeopleIcon from "@material-ui/icons/People";
import Popover from "@material-ui/core/Popover";
import Tooltip from "@material-ui/core/Tooltip";
import { Chip, Grid } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    margin: 16,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeItem({ recipe = {} }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {
    name,
    image,
    ingredients,
    people_quantity,
    tags,
    rate,
    author,
  } = recipe;

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Card className={classes.root}>
      <CardHeader
        style={{ height: "70px" }}
        avatar={<Avatar className={classes.avatar}>{author.charAt(0)}</Avatar>}
        title={name}
        subheader={
          <Tooltip title={rate}>
            <Rating readOnly value={Number(rate)} precision={0.1} />
          </Tooltip>
        }
      />
      <CardMedia
        className={classes.media}
        image={
          image ||
          "https://www.flaticon.com/svg/static/icons/svg/1377/1377194.svg"
        }
        style={{ backgroundSize: image ? "cover" : "contain" }}
        title={name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>

      <CardContent>
        <Grid container>
          <Grid item>
            <Tooltip title={"Ingredients"}>
              <IconButton onClick={handlePopoverOpen}>
                <ListIcon />
              </IconButton>
            </Tooltip>
            <Popover
              id="mouse-over-popover"
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Typography variant="h5">Ingredients</Typography>
              <List dense={true}>
                {ingredients.map((ingr) => (
                  <ListItem key={ingr}>
                    <ListItemText primary={ingr} />
                  </ListItem>
                ))}
              </List>
            </Popover>
            <Tooltip title={`Best served by ${people_quantity} people`}>
              <div style={{ display: "inline-box" }}>
                <IconButton>
                  <PeopleIcon />
                  <Typography style={{ marginLeft: "16px" }}>
                    {people_quantity}
                  </Typography>
                </IconButton>
              </div>
            </Tooltip>
          </Grid>

          <Grid container item style={{ flex: 1, paddingTop: "12px" }}>
            {(tags || []).map((tag) => {
              return (
                <Chip
                  key={tag}
                  label={tag}
                  color="primary"
                  style={{ marginRight: "6px" }}
                />
              );
            })}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
