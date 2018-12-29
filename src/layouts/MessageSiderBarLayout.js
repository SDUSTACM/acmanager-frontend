import SiderBarLayout from './SiderBarLayout';
export default function(props) {
    const menu_config = [
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
    return (
        <SiderBarLayout menu_config={menu_config} {...props} />
    );
}