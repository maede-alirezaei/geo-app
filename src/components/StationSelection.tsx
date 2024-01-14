import {  Card, Select } from "@chakra-ui/react";

function StationSelection() {
  return (
    <Card style={{ width: "50%" }} p={"32px"}>
      <Select placeholder="Select network">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    </Card>
  );
}

export default StationSelection;
