import SiderBarLayout from './SiderBarLayout';
export default function(props) {
    const menu_config = [
        {
            "title": "个人信息",
            "target": "/setting/profile",
            "icon": "user"
        }, {
            "title": "抓题管理",
            "target": "/setting/crawl",
            "icon": "user",
        },{
            "title": "密码修改",
            "target": "/setting/repassword",
            "icon": "user",
        }
    ];
    return (
        <SiderBarLayout menu_config={menu_config} {...props} />
    );
}