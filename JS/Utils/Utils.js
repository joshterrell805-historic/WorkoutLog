var Utils = {};
Utils.returnMember = function(arrayOrObject, memberKey, defaultValue) {
   return typeof arrayOrObject[memberKey] === 'undefined' ? defaultValue :
    arrayOrObject[memberKey];
};
