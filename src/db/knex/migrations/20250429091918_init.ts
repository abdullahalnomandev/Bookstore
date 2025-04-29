import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('author', function (table) {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.string('bio', 255).nullable();
      table.date('birthdate').notNullable();
      table.timestamps(true, true)
    })
    .createTable('book', function (table) {
      table.increments('id').primary();
      table.string('title', 255).notNullable();
      table.string('description', 255).nullable();
      table.string('publish_date', 255).notNullable();
      table.integer('author_id').unsigned().references('id').inTable('author').notNullable();
      table.timestamps(true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('books').dropTable('author');
}

