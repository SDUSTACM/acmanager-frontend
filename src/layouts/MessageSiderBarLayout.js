import SiderBarLayout from './SiderBarLayout';
export default function(props) {
    const user_menu_config = [
        {
            "title": "申请通知",
            "target": "/message/application",
            "icon": "user"
        },/* {
            "title": "站内信",
            "target": "/message/mail",
            "icon": "user",
        },{
            "title": "系统通知",
            "target": "/message/announcement",
            "icon": "user",
        }*/
    ];
    const admin_menu_config = [
        {
            "title": "审核通知",
            "target": "/message/audit",
            "icon": "user"
        }
    ];
    let menu_config;
    if (!props.is_admin) {
        menu_config = admin_menu_config;
    } else {
        menu_config = user_menu_config;
    }
    return (
        <SiderBarLayout menu_config={menu_config} {...props} />
    );
}