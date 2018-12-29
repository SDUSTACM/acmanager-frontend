import SiderBarLayout from './SiderBarLayout';
export default function(props) {
    const menu_config = [
        {
            "title": "用户管理",
            "target": "/admin/users",
            "icon": "user"
        }, /*{
            "title": "集训管理",
            "target": "/admin/training",
            "icon": "user"
        }, {
            "title": "申请管理",
            "target": "/admin/application",
            "icon": "user"
        }*/
    ];
    return (
        <SiderBarLayout menu_config={menu_config} {...props} />
    );
}