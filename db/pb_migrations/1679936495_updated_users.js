migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "users_name",
    "name": "display_name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": 17,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gwofgvgy",
    "name": "house_name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 8,
      "max": 17,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "users_name",
    "name": "display_name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": 17,
      "pattern": "^[a-z\\d\\-_\\s]+$/i"
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gwofgvgy",
    "name": "house_name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 8,
      "max": 17,
      "pattern": "^[a-z\\d\\-_\\s]+$/i"
    }
  }))

  return dao.saveCollection(collection)
})
