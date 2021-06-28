/**
 * Utility Module to save and restore scroll position.
 */
var apexScrollUtil = ( function ( $, storage, debug ) {
  var _pubMethods = {},
    _storagePrefix = "apexSaveScrollPos",
    _itemPrefix = "scroll_",
    _myStorage = storage.getScopedSessionStorage( {
      prefix: _storagePrefix,
      useAppId: true,
    } );

  function _get( myPageId ) {
    debug.trace( `Get stored value for ${myPageId}` );
    return _myStorage.getItem( _itemPrefix + myPageId );
  }

  _pubMethods.save = function ( myPageId ) {
    debug.trace( `Storing scroll position for page ${myPageId}` );
    _myStorage.setItem( _itemPrefix + myPageId, $( window ).scrollTop() );
  };

  _pubMethods.restore = function ( myPageId ) {
    debug.trace( `Scrolling to stored position for page ${myPageId}` );
    $( window ).scrollTop( _get( myPageId ) );
  };

  _pubMethods.clear = function () {
    debug.trace( `Clearing sorage` );
    _myStorage.clear();
  };

  return _pubMethods;
} )( apex.jQuery, apex.storage, apex.debug );
