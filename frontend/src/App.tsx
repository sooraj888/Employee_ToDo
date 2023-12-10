import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Input } from "@mui/material";
import AddEmployeeModel from "./Components/AddEmployeeModel";
import DeleteICon from "./Icons/DeleteICon";
import { DownloadXLSX } from "./Components/DownloadXLSX";
import { useAlert } from "react-alert";

let CancelToken = axios.CancelToken;
let source = CancelToken.source();

type titleType = "id" | "name" | "last_name" | "city";

export type EmployeeType = {
  id: number;
  name: string;
  last_name: string;
  city: string;
};

export type SingleEmployeeType = {
  name: string;
  last_name: string;
  city: string;
};

const tableColorStyle = {
  backgroundColor: "#191970",
  color: "white",
  fontWeight: "bold",
  borderRight: "1px solid white",
};

function App() {
  const [employees, setEmployees] = useState<Array<EmployeeType>>([]);

  const [addSingleEmployee, setSingleEmployee] = useState<SingleEmployeeType>({
    name: "",
    city: "",
    last_name: "",
  });
  const [selectedSort, setSelectedSort] = useState<{
    title: titleType;
    ascending: boolean;
  }>({
    title: "id",
    ascending: true,
  });
  const [searchText, setSearchText] = useState("");
  const [isModelVisible, setIsModelVisible] = useState(false);

  let [isEdited, setIsEdited] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const customAlert = useAlert();

  //Apis
  const getAllEmployee = async () => {
    console.log("api called");
    setIsLoading(true);
    try {
      const { data }: any = await axios.get("/allEmployees");
      if (data) {
        setEmployees(data.data);
      }
    } catch (e) {}
    setIsLoading(false);
  };

  const getAllSearchEmployee = async () => {
    console.log("search api called");
    source.cancel("Operation canceled by the user.");
    source = CancelToken.source();
    setIsLoading(true);
    try {
      const { data }: any = await axios.get(
        "/searchEmployees/" + searchText.trim(),
        {
          cancelToken: source.token,
        }
      );
      if (data) {
        console.log("search Data", data.data);
        setEmployees([...data.data]);
      }
    } catch (e) {
      // console.log(e);
    }
    setIsLoading(false);
  };

  const callAddEmployeeApi = async () => {
    setIsLoading(true);
    try {
      const { data }: any = await axios.post("/employee", {
        name: addSingleEmployee.name,
        lastName: addSingleEmployee.last_name,
        city: addSingleEmployee.city,
      });
      console.log(data?.data);
      if (data?.data) {
        customAlert.success(`${data?.data.name} Is Added`);
        setEmployees((prev: Array<EmployeeType>) => {
          const updateData = [...prev];
          updateData?.push(data?.data);
          return updateData;
        });
      }
    } catch (e) {}
    setIsLoading(false);
  };

  const handleOnDelete = async (id: number) => {
    setIsLoading(true);
    try {
      const { data }: any = await axios.delete("/employee/" + id);
      if (data?.success) {
        customAlert.success(`${data?.data.name} Is Deleted`);
        setEmployees((prev: Array<EmployeeType>) => {
          let updateData = [...prev];
          updateData = updateData.filter((emp) => {
            return emp.id !== id;
          });
          return updateData;
        });
      }
    } catch (e) {}
    setIsLoading(false);
  };

  const callEditApi = async (id: number, obj: any) => {
    setIsLoading(true);
    try {
      const { data }: any = await axios.patch("/employee/" + id, {
        ...obj,
      });
      if (data?.data) {
        customAlert.success(`Updated`);
      }
    } catch (e) {}
    setIsLoading(false);
  };

  const handleOnTitleClick = (title: titleType) => {
    setSelectedSort((prev) => {
      const updatePrev = { ...prev };
      if (prev.title === title) {
        updatePrev.ascending = !prev.ascending;
      } else {
        updatePrev.ascending = true;
        updatePrev.title = title;
      }
      return updatePrev;
    });
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    setIsEdited(true);
    setEmployees((prev: any[]) => {
      let updatedData = [...prev];
      const index = updatedData.findIndex((item: any) => {
        return item.id === id;
      });
      // console.log(updatedData[index], e.target.id);
      updatedData[index][e.target.id] = e.target.value;
      return updatedData;
    });
  };

  useEffect(() => {
    setEmployees((prev) => {
      let sortedData = [...prev];
      if (selectedSort.title === "id") {
        sortedData = sortedData.sort((a: EmployeeType, b: EmployeeType) => {
          return selectedSort.ascending ? a.id - b.id : b.id - a.id;
        });
      } else {
        sortedData = sortedData.sort((a: EmployeeType, b: EmployeeType) => {
          let fa = String(a[selectedSort.title]).toLowerCase(),
            fb = String(b[selectedSort.title]).toLowerCase();
          if (selectedSort.ascending) {
            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          } else {
            if (fa > fb) {
              return -1;
            }
            if (fa < fb) {
              return 1;
            }
            return 0;
          }
        });
      }
      return sortedData;
    });
  }, [selectedSort]);

  let debounceTimeInterval: NodeJS.Timeout = setTimeout(() => {}, 1000);
  let debounce = () => {
    getAllSearchEmployee();
  };

  useEffect(() => {
    if (!searchText) {
      debounceTimeInterval = setTimeout(() => {
        getAllEmployee();
      }, 400);
    } else {
      debounceTimeInterval = setTimeout(() => {
        debounce();
      }, 400);
    }
    return () => {
      clearTimeout(debounceTimeInterval);
    };
  }, [searchText]);

  return (
    <div className="App">
      <h1>Employee Table </h1>
      {isModelVisible ? (
        <AddEmployeeModel
          addSingleEmployee={addSingleEmployee}
          setSingleEmployee={setSingleEmployee}
          visible={isModelVisible}
          setVisible={setIsModelVisible}
          callAddEmployeeApi={callAddEmployeeApi}
        />
      ) : (
        <></>
      )}
      <div
        style={{
          width: "90vw",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            marginBottom: "1vmax",
            width: "100%",
          }}
        >
          <input
            placeholder="Search"
            className="searchInp"
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            style={{
              border: "none",
              margin: "0px 5px",
              backgroundColor: "transparent",
              translate: "-40px",
              fontWeight: "bolder",
              fontFamily: "cursive",
            }}
            onClick={() => {
              setSearchText("");
            }}
          >
            X
          </button>

          <div
            className="loader"
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingRight: "1vmax",
              visibility: isLoading ? "visible" : "hidden",
            }}
          >
            <div></div>
          </div>
        </div>

        <TableContainer
          component={Paper}
          className="myTable"
          style={{ height: "60vh", zIndex: 1, border: "1px solid gray" }}
        >
          <Table
            stickyHeader={true}
            sx={{ minWidth: 650 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    ...tableColorStyle,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleOnTitleClick("id");
                  }}
                  align="center"
                >
                  ID
                </TableCell>
                <TableCell
                  style={{ ...tableColorStyle, cursor: "pointer" }}
                  align="left"
                  onClick={() => {
                    handleOnTitleClick("name");
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  style={{ ...tableColorStyle, cursor: "pointer" }}
                  onClick={() => {
                    handleOnTitleClick("last_name");
                  }}
                  align="left"
                >
                  Last Name
                </TableCell>
                <TableCell
                  style={{ ...tableColorStyle, cursor: "pointer" }}
                  onClick={() => {
                    handleOnTitleClick("city");
                  }}
                  align="left"
                >
                  City
                </TableCell>
                <TableCell style={tableColorStyle} align="left">
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees &&
                employees.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      align="center"
                      component="th"
                      scope="row"
                      style={{ borderBottomColor: "gray" }}
                    >
                      <div style={{ minWidth: "100px" }}>{row.id}</div>
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ borderBottomColor: "gray" }}
                    >
                      <input
                        type={"text"}
                        value={row.name}
                        id="name"
                        style={{
                          width: "100%",
                          height: "100%",
                          padding: "1vmax 5px",
                          border: "none",
                        }}
                        onBlur={() => {
                          if (isEdited) {
                            //call edit api
                            callEditApi(row.id, { name: row.name });
                          }
                          setIsEdited(false);
                        }}
                        onChange={(e) => {
                          handleOnChange(e, row?.id);
                        }}
                      ></input>
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ borderBottomColor: "gray" }}
                    >
                      <input
                        type={"text"}
                        value={row.last_name}
                        id="last_name"
                        style={{
                          width: "100%",
                          height: "100%",
                          padding: "1vmax 5px",
                          border: "none",
                        }}
                        onBlur={() => {
                          if (isEdited) {
                            //call edit api
                            callEditApi(row.id, { last_name: row.last_name });
                          }
                          setIsEdited(false);
                        }}
                        onChange={(e) => {
                          handleOnChange(e, row?.id);
                        }}
                      ></input>
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ borderBottomColor: "gray" }}
                    >
                      <input
                        type={"text"}
                        value={row.city}
                        id="city"
                        style={{
                          width: "100%",
                          height: "100%",
                          padding: "1vmax 5px",
                          border: "none",
                        }}
                        onBlur={() => {
                          if (isEdited) {
                            //call edit api
                            callEditApi(row.id, { city: row.city });
                          }
                          setIsEdited(false);
                        }}
                        onChange={(e) => {
                          handleOnChange(e, row?.id);
                        }}
                      ></input>
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ borderBottomColor: "gray" }}
                    >
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          if (window.confirm("Delete This Employee")) {
                            handleOnDelete(row?.id);
                          }
                        }}
                      >
                        <DeleteICon />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          className="tableFooter"
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            padding: "1vmax",
          }}
        >
          <DownloadXLSX data={employees} />
          <button
            style={{
              maxWidth: "200px",
              // alignSelf: "flex-end",
              padding: "0.5vmax 2vmax",
              marginRight: "1vmax",
            }}
            onClick={() => {
              setSingleEmployee({ name: "", city: "", last_name: "" });
              setIsModelVisible(true);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
