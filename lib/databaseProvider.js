'use strict';

/**
 * Manages the database of LDAP users.
 *
 * @class databaseProvider
 * @static
 */

const database = process.require('lib/database.js');

/**
 * Fetches user from database.
 *
 * User attribute containing the login is defined by the userLoginAttribute property of the server configuration.
 *
 * @method getUser
 * @static
 * @params {String} login User login
 * @return {Object} The user as is
 */
module.exports.getUser = (searchDictionary) => {
  const users = database.users;
  let fetchedUser;
  let user = {attributes: {}};

  for (let user in users) {
    let found = Object.keys(searchDictionary).every(attribute => users[user][attribute] == searchDictionary[attribute]);
    if (found) {
      fetchedUser = users[user];
      break;
    }
  }

  if (!fetchedUser) return null;

  user.dn = fetchedUser.dn;
  for (let propertyName in fetchedUser) {
    if (propertyName !== 'dn')
      user.attributes[propertyName] = fetchedUser[propertyName];
  }

  return user;
};
