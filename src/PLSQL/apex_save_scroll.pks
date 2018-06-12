create or replace package mt_apex_save_scroll
  authid current_user
as

  function render
  (
    p_dynamic_action in apex_plugin.t_dynamic_action
  , p_plugin         in apex_plugin.t_plugin
  )
    return apex_plugin.t_dynamic_action_render_result
  ;

end mt_apex_save_scroll;
/
