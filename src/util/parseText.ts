export function parseText(rawData: string) {
    const rows = rawData.split("\n");
    const header = rows[0].substring(1).split("|");

    // Process the data rows
    const data = rows.slice(1).map((row) => {
      const values = row.split("|");
      let rowData = {};

      header.forEach((key, index) => {
        rowData = { ...rowData, [key]: values[index] };
      });
      return rowData;
    });
    return data;
  }

