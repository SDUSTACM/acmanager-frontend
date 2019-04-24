import SiderBarLayout from './SiderBarLayout';
export default function(props) {
    const training_id = props.location.pathname.split('/')[3];
    const pathname = `/admin/trainings/${training_id}`;
    console.log(props);
    const menu_config = [
        {
            "title": "返回上一级",
            "target": "/admin/trainings",
            "icon": "user",
            "key": "return"
        }, 
        {
            "title": "比赛管理",
            "target": `${pathname}/contests`,
            "icon": "user",
            "key": "training-contest-manager"
        },
        {
            "title": "轮次管理",
            "target": `${pathname}/rounds`,
            "icon": "user",
            "key": "training-turn-manager"
        },
        {
            "title": "阶段管理",
            "target": `${pathname}/stages`,
            "icon": "user",
            "key": "training-stage-manager",
            "children": [
                {
                    "title": "参数管理",
                    "target": `${pathname}/stages/params`,
                    "icon": "user",
                    "key": "training-stage-param-manager",
                },
                {
                    "title": "队员|队伍管理",
                    "target": `${pathname}/stages/members`,
                    "icon": "user",
                    "key": "training-stage-team-manager",
                },
            ]
        },
    ];
    return (
        <SiderBarLayout menu_config={menu_config} {...props} />
    );
}