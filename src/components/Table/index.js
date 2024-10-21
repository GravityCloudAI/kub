import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Table as MuiTable, TablePagination } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import GuiAvatar from "components/GuiAvatar";
import GuiBox from "components/GuiBox";
import GuiButton from "components/GuiButton";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Table({ columns, rows, itemsPerPage, hidePagination = false }) {
  const { grey } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(itemsPerPage ? itemsPerPage : 10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const renderColumns = columns.map(({ name, align, width }, key) => {
    let pl;
    let pr;

    if (key === 0) {
      pl = 3;
      pr = 3;
    } else if (key === columns.length - 1) {
      pl = 3;
      pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }

    return (
      <GuiBox
        key={name}
        component="th"
        width={width || "auto"}
        pt={1.5}
        pb={1.25}
        pl={align === "left" ? pl : 3}
        pr={align === "right" ? pr : 3}
        textAlign={align}
        fontSize={size.xxs}
        fontWeight={fontWeightBold}
        color="text"
        opacity={0.7}
        borderBottom={`${borderWidth[0.5]} solid #26282d`}
      >
        {name.toUpperCase()}
      </GuiBox>
    );
  });

  const renderRows = useMemo(() => {
    const displayedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return displayedRows.map((row, key) => {
      const rowKey = `row-${key}`;

      const tableRow = columns.map(({ name, align }) => {
        let template;

        if (Array.isArray(row[name])) {
          template = (
            <GuiBox
              key={uuidv4()}
              component="td"
              p={1}
              borderBottom={row.hasBorder ? `${borderWidth[0.5]} solid #26282d` : null}
            >
              <GuiBox display="flex" alignItems="center" py={0.5} px={1}>
                <GuiBox mr={2}>
                  <GuiAvatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
                </GuiBox>
                <GuiBox
                  color="white"
                  variant="button"
                  fontWeight="medium"
                  sx={{ width: "max-content" }}
                >
                  {row[name][1]}
                </GuiBox>
              </GuiBox>
            </GuiBox>
          );
        } else {
          template = (
            <GuiBox
              key={uuidv4()}
              component="td"
              p={1}
              textAlign={align}
              borderBottom={row.hasBorder ? `${borderWidth[0.5]} solid #26282d` : null}
            >
              <GuiBox
                sx={{ display: "inline-block", width: "fit-content" }}
              >
                {row[name]}
              </GuiBox>
            </GuiBox>
          );
        }

        return template;
      });

      return <TableRow key={rowKey}>{tableRow}</TableRow>;
    });
  }, [columns, rows, page, rowsPerPage]);

  const CustomPaginationActions = (props) => {
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    return (
      <GuiBox sx={{ flexShrink: 0, ml: 1, mr: 2 }}>
        <GuiButton
          sx={{ ml: "12px", p: "0", borderRadius: "0.75rem", border: "1px solid #26282d", background: "#20212E" }}
          onClick={handleBackButtonClick}
          disabled={page === 0}
          color="dark"
          iconOnly={true}
        >
          {
            <ArrowBackIosNew size="18px" color="white" />
          }
        </GuiButton>

        <GuiButton
          sx={{ ml: "12px", p: "0", borderRadius: "0.75rem", border: "1px solid #26282d", background: "#20212E" }}
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          color="dark"
          iconOnly={true}
        >
          {
            <ArrowForwardIos size="18px" color="white" />
          }
        </GuiButton>
      </GuiBox>
    );
  };

  return (
    <TableContainer sx={{ boxShadow: "none" }}>
      <MuiTable>
        <GuiBox component="thead">
          <TableRow>{renderColumns}</TableRow>
        </GuiBox>
        <TableBody>{renderRows}</TableBody>
      </MuiTable>
      {
        hidePagination === true ? null
          :
          <TablePagination
            rowsPerPageOptions={[itemsPerPage ? itemsPerPage : 10]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            ActionsComponent={CustomPaginationActions}
            sx={{
              color: 'white !important',
              '.MuiTablePagination-select': {
                color: 'white !important',
              },
              '.MuiTablePagination-selectIcon': {
                color: 'white !important',
              },
              '.MuiTablePagination-displayedRows': {
                color: 'white !important',
              },
            }}
          />
      }

    </TableContainer>
  );
}

Table.defaultProps = {
  columns: [],
  rows: [{}],
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default Table;