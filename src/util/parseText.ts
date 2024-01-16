import { Station } from "../services/stations";

export function parseText(rawData: string): Station[] {
  const rows = rawData.split("\n");
  const header = rows[0].substring(1).split("|");

  // Process the data rows
  const data = rows.slice(1).map((row) => {
    const values = row.split("|");
    let rowData: Station = {
      network: "",
      station: "",
      elevation: "",
      siteName: "",
      startTime: "",
      endTime: "",
      latitude: "",
      longitude: "",
    };

    header.forEach((key, index) => {
      rowData = { ...rowData, [key.toLowerCase()]: values[index] };
    });
    return rowData;
  });
  return data;
}
