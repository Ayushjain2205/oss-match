import { Client } from "@cockroachdb/cockroachdb";

const client = new Client({
  user: "root",
  host: "my.cockroachdb.cluster",
  database: "mydatabase",
  port: 26257,
  ssl: {
    ca: "",
  },
});

async function queryTable() {
  try {
    await client.connect();
    const result = await client.query("SELECT * FROM repositories");
    console.log(result.rows);
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

queryTable();
