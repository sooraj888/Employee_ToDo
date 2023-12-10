import React, { useEffect, useRef } from "react";
import Styles from "./AddEmployeeModel.module.css";
import useOutsideClick from "../hooks/useOutsideClick";
import axios from "axios";
import { SingleEmployeeType } from "../App";
export default function AddEmployeeModel({
  visible,
  setVisible,
  callAddEmployeeApi,
  addSingleEmployee,
  setSingleEmployee,
}: // callAddEmployeeApi,
{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  callAddEmployeeApi: () => void;
  addSingleEmployee: SingleEmployeeType;
  setSingleEmployee: React.Dispatch<React.SetStateAction<any>>;
}) {
  // const addEmployee = () => {};

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callAddEmployeeApi();
    setVisible(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSingleEmployee((prev: SingleEmployeeType) => {
      let updateData: any = { ...prev };
      updateData[e.target.id] = e.target.value;
      return updateData;
    });
  };
  return (
    <div className={Styles.container}>
      <div
        onClick={() => {
          setVisible(false);
        }}
      ></div>
      <form style={{ zIndex: 2 }} onSubmit={handleOnSubmit}>
        <h2>Add New Employee</h2>
        <input
          autoFocus={true}
          type="text"
          required
          placeholder="Name"
          id="name"
          value={addSingleEmployee.name}
          onChange={onChange}
        ></input>
        <input
          type="text"
          required
          placeholder="Last Name"
          id="last_name"
          value={addSingleEmployee.last_name}
          onChange={onChange}
        ></input>
        <input
          type="text"
          required
          placeholder="City"
          id="city"
          value={addSingleEmployee.city}
          onChange={onChange}
        ></input>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
