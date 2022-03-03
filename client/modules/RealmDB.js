import Realm from "realm";

const ObjectSchema = {
  name: "Object",
  properties: {
    _id: "string",
    name: "string",
    sprite: "string",
    palace: "string",
    desc: "string?"
  },
  primaryKey: "_id",
};
export default new Realm({path: 'myrealm', schema: [ObjectSchema]});
