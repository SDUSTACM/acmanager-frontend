export default {
    // 支持自定义函数，API 参考 express@4
    // 'POST /api/login/': (req, res) => { 
    //     const { username, password } = req.body;
    //     if (username == "admin" && password == "admin") {
    //         res.status(200).type('json').send({
    //             username: "admin",
    //             role: "unconfirm-user",
    //             message: "登录成功"
    //         }); 
    //     } else if (username == "admin" || password == "admin"){
    //         res.status(403).type('json').send({
    //             username: "admin",
    //             message: "用户名或密码错误"
    //         }); 
    //     }
    // },
    'POST /api/register': (req, res) => {
        // const { username, password,  }
    }, 
    // 'GET /api/session': (req, res) => {
    //     res.status(200).send({
    //         // "username": "admin",
    //         "nick": "wzh",
    //         "role": "root"
    //     });
    // },
    'GET /tmpapi/xxxx': (req, res) => {
        res.status(200).send({"message": "Helloworld"});
    }
  };