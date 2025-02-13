import { getPool } from "../db/db";

export class Newsletter {
  static async findAll() {
    const result = await getPool().query("SELECT * FROM newsletter");
    return result.rows;
  }

  static async find(id: string) {
    const values = [id];
    const result = await getPool().query(
      "SELECT * FROM newsletter WHERE id = $1",
      values
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }

  static async update(
    id: string,
    data: { author: string; category: string; content: string }
  ) {
    const { author, category, content } = data;
    const now = new Date().toISOString();
    const values = [author, category, content, now, id];
    const result = await getPool().query(
      `UPDATE newsletter
      SET author = $1, category = $2, content = $3, updated_at = $4
      WHERE id = $5
      RETURNING *`,
      values
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }

  static async create(data: {
    author: string;
    category: string;
    content: string;
  }) {
    const { author, category, content } = data;
    const now = new Date().toISOString();
    const values = [author, category, content, now];

    const result = await getPool().query(
      `INSERT INTO newsletter (author, category, content, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $4)
      RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: string) {
    const values = [id];
    const result = await getPool().query(
      `DELETE FROM newsletter
      WHERE id = $1
      RETURNING *`,
      values
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  }
}
