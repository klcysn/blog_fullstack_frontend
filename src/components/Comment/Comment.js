import { FetchData } from "../../helper/FetchData";
import { useEffect, useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "./Comment.style";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Pagination from '@material-ui/lab/Pagination';
import {AuthContext} from "../../App"
import axios from "axios"
import {CommentItem} from "./CommentItem"

export const Comment = ({ slug, postId }) => {
  const classes = useStyles();
  const {Authorization, currentUser, force, setForce} = useContext(AuthContext)
  const [comment, setComment] = useState([]);
  const [text, setText] = useState([]);
  const [page, setPage] = useState(1)
  
  useEffect(() => {
    FetchData(`https://blog-fullstack-backend.herokuapp.com/comment/${slug}/?page=${page}`)
      .then(( results ) => setComment(results))
  }, [page, force, slug]);

  const handleSubmit = () =>{
    axios.post(`https://blog-fullstack-backend.herokuapp.com/comment/${slug}/`,{
      user: currentUser,
      comment: text,
      post: postId

    },
    {
      headers:{
        "Authorization": `Token ${Authorization}`
      }
    }).then(()=>setForce(s=>!s))
    setText("")
  }

  return (
    <div className={classes.root}>
        {Authorization
        ?
        <div className={classes.container}>
          <form className={classes.formContainer} >
            <TextField className={classes.inputs} rows={5} id="outlined-textarea" label="Comment"
            onChange={(e)=>setText(e.target.value)} placeholder="Comment" multiline variant="outlined"/>
            <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.inputs} endIcon={<Icon>send</Icon>}>Send</Button>
          </form>
        </div>
        :
        null}
      {comment.length ? (
        <div>
          <h4 className={classes.commentHeader}>{comment?.length} Comments:</h4>
        </div>
      ) : null}
      <Grid container justify="center" spacing={3}>
        {comment.results?.map((item, i) => {
          return <CommentItem key={i} item={item} slug={slug} />
        })}
        <Grid item xs={12} className={classes.pagination} justify="center">
            <Pagination count={Math.ceil(comment?.count/5)} variant="outlined" onChange={(event, value)=>setPage(value)} size="large" color="secondary" />
        </Grid>
      </Grid>
    </div>
  );
};
