create or replace package body mt_apex_save_scroll
as

  subtype t_max_vc2 is varchar2(32767);

  function render
  (
    p_dynamic_action in apex_plugin.t_dynamic_action
  , p_plugin         in apex_plugin.t_plugin
  )
    return apex_plugin.t_dynamic_action_render_result
  as
    c_action       constant t_max_vc2         := p_dynamic_action.attribute_01;
    c_current_page constant varchar2(10 char) := to_char( nv('APP_PAGE_ID'), 'FM0000000000' );
    l_result apex_plugin.t_dynamic_action_render_result;
  begin
    apex_plugin_util.debug_dynamic_action
    (
      p_plugin         => p_plugin
    , p_dynamic_action => p_dynamic_action
    );
    apex_javascript.add_onload_code
    (
      p_code => 'var mt;'
    , p_key  => 'mt_apex_scroll_util'
    );
    l_result.javascript_function := 'function() { apexScrollUtil.';
    case c_action
      when 'SAVE' then
        l_result.javascript_function := l_result.javascript_function || 'save(' || c_current_page || ')';
      when 'RESTORE' then
        l_result.javascript_function := l_result.javascript_function || 'restore(' || c_current_page || ')';
      when 'CLEAR' then
        l_result.javascript_function := l_result.javascript_function || 'clear()';
      else
        raise_application_error(-20001, 'Requested Action doesn''t exist!');
    end case;
    l_result.javascript_function := l_result.javascript_function || '; }';
    return l_result;
  end render;

end mt_apex_save_scroll;
/
