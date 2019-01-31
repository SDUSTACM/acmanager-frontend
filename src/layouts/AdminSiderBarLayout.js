import SiderBarLayout from './SiderBarLayout';
export default function(props) {
    const menu_config = [
        {
            "title": "用户管理",
            "target": "/admin/users",
            "icon": "user",
            "key": "user-manager"
        }, {
            "title": "集训管理",
            "target": "/admin/training",
            "icon": "user",
            "key": "training-manager",
            "children": [
                {
                    "title": "比赛管理",
                    "target": "/admin/users",
                    "icon": "user",
                    "key": "training-contest-manager"
                },
                {
                    "title": "轮次管理",
                    "target": "/admin/users",
                    "icon": "user",
                    "key": "training-turn-manager"
                },
                {
                    "title": "阶段管理",
                    "target": "/admin/users",
                    "icon": "user",
                    "key": "training-stage-manager",
                    "children": [
                        {
                            "title": "参数管理",
                            "target": "/admin/users",
                            "icon": "user",
                            "key": "training-stage-param-manager",
                        },
                        {
                            "title": "队员|队伍管理",
                            "target": "/admin/users",
                            "icon": "user",
                            "key": "training-stage-team-manager",
                        },
                    ]
                },
        ]
        }/*, {
            "title": "申请管理",
            "target": "/admin/application",
            "icon": "user"
        }*/
    ];
    return (
        <SiderBarLayout menu_config={menu_config} {...props} />
    );
}