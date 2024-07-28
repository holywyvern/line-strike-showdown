import { useLoaderData } from "react-router-dom";

import { Dialog } from "../../design/Dialog";

import { List } from "../../design/List";
import { CenterView } from "../../design/CenterView";
import { useDatabase } from "../../contexts/DatabaseContext";
import { Table } from "../../design/Table";
import { Fragment } from "react";

const CONTENTS_STYLE = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "var(--padding-md)",
  overflow: "auto",
};

const LAYOUT_STYLE = {
  display: "flex",
  flexWrap: "wrap",
  gap: "var(--gap-md)",
  alignItems: "stretch",
  justifyContent: "stretch",
};

const WRAPPER_STYLE = {
  flex: "1 0 auto",
  display: "flex",
  alignItems: "stretch",
  justifyContent: "stretch",
};

const DIALOG_STYLE = {
  width: "100%",
};

export function AccountPage() {
  const { formats } = useDatabase();
  const account = useLoaderData();
  if (!account) {
    return (
      <CenterView>
        <Dialog>
          <Dialog.Header>OOPS!</Dialog.Header>
          <Dialog.Body>
            The Account you are looking for does not exists.
          </Dialog.Body>
        </Dialog>
      </CenterView>
    );
  }
  const byFormat = Object.groupBy(account.rates, ({ formatID }) => formatID);
  const byType = Object.groupBy(account.rates, ({ type }) => type);
  for (const type of Object.keys(byType)) {
    const rates = byType[type].reduce(
      ({ type, rate, wins }, result) => ({
        type,
        rate: (Number(rate) + Number(result.rate)) / 2,
        wins: Number(result.wins) + Number(wins),
      }),
      {
        type,
        rate: 0,
        wins: 0,
      }
    );
    byType[type] = rates;
  }

  const totals = Object.values(byType);

  const total = totals.reduce(
    ({ rate, wins }, result) => ({
      type: "TOTAL",
      rate: (Number(rate) + Number(result.rate)) / 2,
      wins: Number(result.wins) + Number(wins),
    }),
    {
      rate: 0,
      wins: 0,
    }
  );
  totals.push(total);
  return (
    <div style={CONTENTS_STYLE}>
      <div style={LAYOUT_STYLE}>
        <div style={WRAPPER_STYLE}>
          <Dialog style={DIALOG_STYLE}>
            <Dialog.Header>
              <h3>Known Names</h3>
            </Dialog.Header>
            <Dialog.Body>
              <List>
                {account.names.map((value, index) => (
                  <List.Item key={index}>{value}</List.Item>
                ))}
              </List>
            </Dialog.Body>
          </Dialog>
        </div>
        <div style={WRAPPER_STYLE}>
          <Dialog style={DIALOG_STYLE}>
            <Dialog.Header>
              <h3>ELO Rating</h3>
            </Dialog.Header>
            <Dialog.Body>
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.Header>FORMAT</Table.Header>
                    <Table.Header>ELO</Table.Header>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {account.elo.map(({ formatID, value }, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>
                        {formats[formatID]?.name || "---"}
                      </Table.Cell>
                      <Table.Cell>{value}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Dialog.Body>
          </Dialog>
        </div>
        <div style={WRAPPER_STYLE}>
          <Dialog style={DIALOG_STYLE}>
            <Dialog.Header>
              <h3>Player Stats</h3>
            </Dialog.Header>
            <Dialog.Body>
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.Header>TYPE</Table.Header>
                    <Table.Header>WINS</Table.Header>
                    <Table.Header>WIN RATE</Table.Header>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {Object.entries(byFormat).map(([formatID, rankings]) => (
                    <Fragment key={formatID}>
                      <Table.Row>
                        <Table.Header colSpan={3}>
                          {formats[formatID]?.name || "---"}
                        </Table.Header>
                      </Table.Row>
                      {rankings.map(({ type, wins, rate }, index) => (
                        <Table.Row key={`rankings-${index}`}>
                          <Table.Cell>{type}</Table.Cell>
                          <Table.Cell>{wins}</Table.Cell>
                          <Table.Cell>{rate}%</Table.Cell>
                        </Table.Row>
                      ))}
                    </Fragment>
                  ))}
                  <Table.Row>
                    <Table.Header colSpan={3}>TOTALS</Table.Header>
                  </Table.Row>
                  {totals.map(({ type, wins, rate }, index) => (
                    <Table.Row key={`type-${index}`}>
                      <Table.Cell>
                        <strong>{type}</strong>
                      </Table.Cell>
                      <Table.Cell>{wins}</Table.Cell>
                      <Table.Cell>{Math.round(rate * 100) / 100}%</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Dialog.Body>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
