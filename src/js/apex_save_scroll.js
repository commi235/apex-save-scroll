/**
 * Utility Module to save and restore scroll position.
 */
var apexScrollUtil = (
  function( $, storage ) {
    var _pubMethods    = {},
        _storagePrefix = 'apexSaveScrollPos',
        _itemPrefix    = 'scroll_',
        _myStorage     = storage.getScopedSessionStorage
                         ({
                            prefix: _storagePrefix,
                            useAppId: true
                         });
    
    function _get(myPageId)
    {
      return _myStorage.getItem( _itemPrefix + myPageId );
    }

    _pubMethods.save = function(myPageId)
    {
      _myStorage.setItem( _itemPrefix + myPageId, $(window).scrollTop() );
    }

    _pubMethods.restore = function(myPageId)
    {
      $(window).scrollTop(_get(myPageId));  
    }

    _pubMethods.clear = function()
    {
      _myStorage.clear();
    }
  
    return _pubMethods;
  } ( apex.jQuery, apex.storage ) );
