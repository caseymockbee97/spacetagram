import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import ContentComponent from "../components/ContentComponent";
import { useStore } from "../store/store";
import LoadingComponent from "../components/LoadingComponent";
import LoadMoreComponent from "../components/LoadMoreComponent";
import useOnScreen from "../hooks/useOnScreenHook";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "25px",
  },
  card: {
    maxWidth: "600px",
    margin: "0 auto",
  },
}));

export default function ContentView() {
  const classes = useStyles();

  const isLoading = useStore((state) => state.isLoading);
  const APODs = useStore((state) => state.APODs);
  const fetchAPODs = useStore((state) => state.fetchAPODs);
  const fetchMoreAPODs = useStore((state) => state.fetchMoreAPODs);
  const isLoadingMore = useStore((state) => state.isLoadingMore);

  const [setRef, isVisible] = useOnScreen({ rootMargin: "300px" });

  useEffect(() => {
    fetchAPODs();
  }, [fetchAPODs]);

  return (
    <Container className={classes.container}>
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid item sm={12}>
          <Typography variant="body2" align="center">
            🚀 Images from Nasa's APOD API. 🚀
          </Typography>
        </Grid>
        {isLoading && <LoadingComponent />}

        {APODs &&
          APODs.map((post, i) => (
            <ContentComponent key={post.url} post={post} />
          ))}
        {isLoadingMore && <LoadingComponent />}
        {isVisible && <LoadMoreComponent fetchMoreAPODs={fetchMoreAPODs} />}
        {/* infinite scroll trigger, protects from loading more while loading */}
        {!isLoading && <div aria-hidden="true" ref={setRef}></div>}
      </Grid>
    </Container>
  );
}
