import { useState } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import { useLoaderData, useParams } from "react-router-dom";

import { Dialog } from "../../design/Dialog";
import { Box } from "../../design/Box";
import { Row } from "../../design/Row";
import { Button } from "../../design/Button";

import { AccountService } from "../../services/AccountServices";
import { Column } from "../../design/Column";
import { useDatabase } from "../../contexts/DatabaseContext";

function Match({ data }) {
  const { formats } = useDatabase();
  return (
    <Box>
      <Row spaceItems centerVertically>
        <Column flex>
          <Row spaceItems>
            <span>
              <span>Vs.</span>
              &nbsp;
              <strong>{data.vs}</strong>
            </span>
            <span>{data.type}</span>
          </Row>
          <Row spaceItems>
            <span>{formats[data.formatID]?.name || "---"}</span>
            <span>{data.result}</span>
          </Row>
          <span>{new Date(data.createdAt).toLocaleString()}</span>
        </Column>
        <Column>
          <Button disabled>Watch from their perspective</Button>
          <Button disabled>Watch from your perspective</Button>
        </Column>
      </Row>
    </Box>
  );
}

Match.propTypes = {
  data: PropTypes.any,
};

function useMatches() {
  const { accountID } = useParams();
  const { matches } = useLoaderData();
  const [list, setList] = useState(matches);
  const [nextPage, setNextPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  return {
    matches: list,
    hasMore,
    nextPage,
    async loadMore() {
      return new Promise((resolve, reject) => {
        AccountService.matches(accountID, nextPage).then(({ matches }) => {
          if (matches.length < 1) {
            setHasMore(false);
          } else {
            setList((list) => [...list, matches]);
          }
          setNextPage(nextPage + 1);
          resolve();
        }, reject);
      });
    },
  };
}

export function AccountMatchesPage() {
  const { matches, hasMore, loadMore } = useMatches();
  return (
    <Dialog>
      <Dialog.Header>
        <h3>Match History</h3>
      </Dialog.Header>
      <Dialog.Body>
        <InfiniteScroll
          loadMore={loadMore}
          loader={<p key="loading...">Loading...</p>}
          hasMore={hasMore}
        >
          {matches.map((data, index) => (
            <Match key={index} data={data} />
          ))}
        </InfiniteScroll>
      </Dialog.Body>
    </Dialog>
  );
}
