'use strict';

/**
 * Provides default route action to deal with LDAP protocol.
 *
 * @class controller
 * @static
 */

const databaseProvider = process.require('lib/databaseProvider.js');

/**
 * Authenticates a user.
 *
 * This is a mock, no verification is performed. User is authenticated.
 *
 * @method bindAction
 * @static
 * @async
 * @param {BindRequest} request LDAP request
 * @param {BindResponse} response LDAP response
 */
module.exports.bindAction = (request, response) => {
  response.end();
};

/**
 * Searches for a particular user.
 *
 * This is a mock, no verification is performed. User login is retrieved from searchFilter parameter using
 * the searchFilter from server configuration.
 *
 * @method searchAction
 * @static
 * @async
 * @param {SearchRequest} request LDAP request
 * @param {Object} request.filter LDAP filters
 * @param {SearchResponse} response LDAP response
 */
module.exports.searchAction = (request, response) => {
  let searchDictionary = {};
  request.filter.forEach((filter) => {
    if (filter.type !== 'equal') return;
    searchDictionary[filter.attribute.toLowerCase()] = filter.value.toLowerCase();
  });

  const user = databaseProvider.getUser(searchDictionary);

  if (user)
    response.send(user);

  response.end();
};
