define( function (require, exports, module) {
   "use strict";
    
    var cmdMgr = brackets.getModule("command/CommandManager");
    var editorMgr = brackets.getModule("editor/EditorManager");
    var menus = brackets.getModule("command/Menus");
    var dialogs = brackets.getModule("widgets/Dialogs");
    var keyMgr = brackets.getModule("command/KeyBindingManager");
    
    function handleMenuAction() {
        var editor = editorMgr.getFocusedEditor();
        if( editor ) {
            if( editor.hasSelection() === true ) {
                var selection = editor.getSelection();
                
                var text = editor.document.getRange( selection.start, selection.end );
                
                var dlg = dialogs.showModalDialog( "", 
                                                    "Replace In Selection", 
                                                    "Replace <input id='old' type='text' value='" + text.charAt(0) + "'> With <input id='new' type='text'>",
                                                    [ { className: dialogs.DIALOG_BTN_CLASS_NORMAL, id: dialogs.DIALOG_BTN_OK, text: "OK" },
                                                        {className: dialogs.DIALOG_BTN_CLASS_NORMAL, id: dialogs.DIALOG_BTN_CANCELED, text: "Cancel"} ],
                                                   false );
                          
                
                dlg.getElement().one( "buttonClick", function( event, btnId ) {
                   
                    if( btnId.toLowerCase() === "ok" ) {
                        var regex = new RegExp( $("#old").val(), "g" );
                        text = text.replace( regex, $("#new").val() );
                        editor.document.replaceRange( text, selection.start, selection.end );
                    }
                    
                    dlg.close(); 
                    editor.focus();
                });
            }
        }
    }
    
    var CMD_ID = "replaceInSelection.Replace";
    cmdMgr.register( "Replace In Selection", CMD_ID, handleMenuAction);
    
    var menu = menus.getMenu(menus.AppMenuBar.FIND_MENU);
    menu.addMenuItem(CMD_ID);
    
    keyMgr.addBinding(CMD_ID, { key: "Ctrl-R", display: "Ctrl-R" } );
    
});