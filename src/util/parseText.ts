export function parseText<T>(rawData: string): T[] {
  const rows = rawData.split("\n");
  const header = rows[0].substring(1).split("|");
  const data = rows.slice(1).map((row) => {
    const values = row.split("|");
    let rowData: T;

    header.forEach((key, index) => {
      rowData = { ...rowData, [key.toLowerCase()]: values[index] };
    });
    return rowData;
  });
  return data;
}
