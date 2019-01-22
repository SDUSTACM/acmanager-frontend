[1mdiff --git a/src/layouts/MainLayout/data.source.js b/src/layouts/MainLayout/data.source.js[m
[1mindex 785b558..74be3f3 100644[m
[1m--- a/src/layouts/MainLayout/data.source.js[m
[1m+++ b/src/layouts/MainLayout/data.source.js[m
[36m@@ -21,7 +21,8 @@[m [mexport const Nav10DataSource = {[m
   help: { className: 'help', children: '' },[m
   user: {},[m
 };[m
[31m-export const Banner00DataSource = {[m
[32m+[m
[32m+[m[32m/* export const Banner00DataSource = {[m
   wrapper: { className: 'banner0' },[m
   textWrapper: { className: 'banner0-text-wrapper' },[m
   title: {[m
[36m@@ -34,6 +35,7 @@[m [mexport const Banner00DataSource = {[m
   },[m
   button: { className: 'banner0-button', children: 'Learn More' },[m
 };[m
[32m+[m
 export const Content00DataSource = {[m
   wrapper: { className: 'home-page-wrapper content0-wrapper' },[m
   page: { className: 'home-page content0' },[m
[36m@@ -95,8 +97,10 @@[m [mexport const Content00DataSource = {[m
       },[m
     ],[m
   },[m
[31m-};[m
[31m-export const Content10DataSource = {[m
[32m+[m[32m}; */[m
[32m+[m
[32m+[m
[32m+[m[32m/* export const Content10DataSource = {[m
   wrapper: { className: 'home-page-wrapper content1-wrapper' },[m
   OverPack: { className: 'home-page content1', playScale: 0.3 },[m
   imgWrapper: { className: 'content1-img', md: 10, xs: 24 },[m
[36m@@ -110,8 +114,10 @@[m [mexport const Content10DataSource = {[m
     children:[m
       '云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。',[m
   },[m
[31m-};[m
[31m-export const Content30DataSource = {[m
[32m+[m[32m}; */[m
[32m+[m
[32m+[m
[32m+[m[32m/* export const Content30DataSource = {[m
   wrapper: { className: 'home-page-wrapper content3-wrapper' },[m
   page: { className: 'home-page content3' },[m
   OverPack: { playScale: 0.3 },[m
[36m@@ -256,6 +262,8 @@[m [mexport const Content30DataSource = {[m
     ],[m
   },[m
 };[m
[32m+[m[32m */[m
[32m+[m
 export const Footer10DataSource = {[m
   wrapper: { className: 'home-page-wrapper footer1-wrapper' },[m
   OverPack: { className: 'footer1', playScale: 0.2 },[m
[1mdiff --git a/src/pages/register/Register.js b/src/pages/register/Register.js[m
[1mindex ccdf772..d0e5b4a 100644[m
[1m--- a/src/pages/register/Register.js[m
[1m+++ b/src/pages/register/Register.js[m
[36m@@ -9,6 +9,7 @@[m [mconst AutoCompleteOption = AutoComplete.Option;[m
 [m
 [m
 class RegistrationForm extends React.Component {[m
[32m+[m
   state = {[m
     confirmDirty: false,[m
     autoCompleteResult: [],[m
[36m@@ -50,11 +51,12 @@[m [mclass RegistrationForm extends React.Component {[m
     callback();[m
   }[m
 [m
[31m-[m
[32m+[m[32m//渲染[m
   render() {[m
     const { getFieldDecorator } = this.props.form;[m
     const { autoCompleteResult } = this.state;[m
 [m
[32m+[m[32m    //formItem css[m[41m [m
     const formItemLayout = {[m
       labelCol: {[m
         xs: { span: 24 },[m
[36m@@ -62,9 +64,10 @@[m [mclass RegistrationForm extends React.Component {[m
       },[m
       wrapperCol: {[m
         xs: { span: 24 },[m
[31m-        sm: { span: 16 },[m
[32m+[m[32m        sm: { span: 10},[m
       },[m
     };[m
[32m+[m[32m    //保存按钮 css[m
     const tailFormItemLayout = {[m
       wrapperCol: {[m
         xs: {[m
[36m@@ -77,13 +80,16 @@[m [mclass RegistrationForm extends React.Component {[m
         },[m
       },[m
     };[m
[31m-[m
[32m+[m[32m//xs : extra small 最小屏[m
[32m+[m[32m//sm : small 小屏[m
[32m+[m[32m//md : middle 中屏 lg : large 大屏[m
     return ([m
[31m-      <Form onSubmit={this.handleSubmit}>[m
[32m+[m[32m      <Form onSubmit={this.handleSubmit} >[m
         <FormItem[m
           {...formItemLayout}[m
[31m-          label="用户名"[m
[32m+[m[32m          label="用户名"[m[41m [m
         >[m
[32m+[m
           {getFieldDecorator('username', {[m
             rules: [{[m
               required: true, message: '请输入用户名',[m
[36m@@ -91,6 +97,7 @@[m [mclass RegistrationForm extends React.Component {[m
           })([m
             <Input />[m
           )}[m
[32m+[m
         </FormItem>[m
         <FormItem[m
           {...formItemLayout}[m
[1mdiff --git a/src/pages/setting/auth/profile.js b/src/pages/setting/auth/profile.js[m
[1mindex a260d51..4b0cdc7 100644[m
[1m--- a/src/pages/setting/auth/profile.js[m
[1m+++ b/src/pages/setting/auth/profile.js[m
[36m@@ -5,7 +5,7 @@[m [mimport { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Butto[m
 const FormItem = Form.Item;[m
 const Option = Select.Option;[m
 const AutoCompleteOption = AutoComplete.Option;[m
[31m-[m
[32m+[m[32m//我猜这是ant 上面的一个模板组件。。。应该没大用[m
 const residences = [{[m
   value: 'zhejiang',[m
   label: 'Zhejiang',[m
[1mdiff --git a/src/pages/setting/crawl/crawl.js b/src/pages/setting/crawl/crawl.js[m
[1mindex ff36548..7dfbfba 100644[m
[1m--- a/src/pages/setting/crawl/crawl.js[m
[1m+++ b/src/pages/setting/crawl/crawl.js[m
[36m@@ -6,8 +6,9 @@[m [mimport { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Butto[m
 const FormItem = Form.Item;[m
 const Option = Select.Option;[m
 const AutoCompleteOption = AutoComplete.Option;[m
[31m-[m
[31m-const residences = [{[m
[32m+[m[32m//抓题管理 账号绑定 uva vj[m
[32m+[m[32m//crawl 爬虫[m
[32m+[m[32m/* const residences = [{[m
   value: 'zhejiang',[m
   label: 'Zhejiang',[m
   children: [{[m
[36m@@ -29,7 +30,7 @@[m [mconst residences = [{[m
       label: 'Zhong Hua Men',[m
     }],[m
   }],[m
[31m-}];[m
[32m+[m[32m}]; */[m
 [m
 class RegistrationForm extends React.Component {[m
   state = {[m
[36m@@ -65,29 +66,29 @@[m [mclass RegistrationForm extends React.Component {[m
     });[m
   }[m
 [m
[31m-  handleConfirmBlur = (e) => {[m
[32m+[m[32m  /* handleConfirmBlur = (e) => {[m
     const value = e.target.value;[m
     this.setState({ confirmDirty: this.state.confirmDirty || !!value });[m
[31m-  }[m
[32m+[m[32m  } */[m
 [m
[31m-  compareToFirstPassword = (rule, value, callback) => {[m
[32m+[m[32m /*  compareToFirstPassword = (rule, value, callback) => {[m
     const form = this.props.form;[m
     if (value && value !== form.getFieldValue('password')) {[m
       callback('Two passwords that you enter is inconsistent!');[m
     } else {[m
       callback();[m
     }[m
[31m-  }[m
[32m+[m[32m  } */[m
 [m
[31m-  validateToNextPassword = (rule, value, callback) => {[m
[32m+[m[32m /*  validateToNextPassword = (rule, value, callback) => {[m
     const form = this.props.form;[m
     if (value && this.state.confirmDirty) {[m
       form.validateFields(['confirm'], { force: true });[m
     }[m
     callback();[m
[31m-  }[m
[32m+[m[32m  } */[m
 [m
[31m-  handleWebsiteChange = (value) => {[m
[32m+[m[32m  /* handleWebsiteChange = (value) => {[m
     let autoCompleteResult;[m
     if (!value) {[m
       autoCompleteResult = [];[m
[36m@@ -95,7 +96,7 @@[m [mclass RegistrationForm extends React.Component {[m
       autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);[m
     }[m
     this.setState({ autoCompleteResult });[m
[31m-  }[m
[32m+[m[32m  } */[m
 [m
   render() {[m
     const { getFieldDecorator } = this.props.form;[m
[36m@@ -131,7 +132,7 @@[m [mclass RegistrationForm extends React.Component {[m
           label={([m
             <span>[m
               UVA账号&nbsp;[m
[31m-              <Tooltip title="请输出UVA ID">[m
[32m+[m[32m              <Tooltip title="请输入UVA ID">[m
                 <Icon type="question-circle-o" />[m
               </Tooltip>[m
             </span>[m
[36m@@ -148,7 +149,7 @@[m [mclass RegistrationForm extends React.Component {[m
           label={([m
             <span>[m
               UVA密码&nbsp;[m
[31m-              <Tooltip title="请输出UVA 密码">[m
[32m+[m[32m              <Tooltip title="请输入UVA 密码">[m
                 <Icon type="question-circle-o" />[m
               </Tooltip>[m
             </span>[m
[36m@@ -164,8 +165,8 @@[m [mclass RegistrationForm extends React.Component {[m
           {...formItemLayout}[m
           label={([m
             <span>[m
[31m-              Vjudge账号[m
[31m-              <Tooltip title="请输出Vjudge账号">[m
[32m+[m[32m              Vjudge账号&nbsp;[m
[32m+[m[32m              <Tooltip title="请输入Vjudge账号">[m
                 <Icon type="question-circle-o" />[m
               </Tooltip>[m
             </span>[m
[36m@@ -181,8 +182,8 @@[m [mclass RegistrationForm extends React.Component {[m
           {...formItemLayout}[m
           label={([m
             <span>[m
[31m-              Vjudge密码[m
[31m-              <Tooltip title="请输出Vjudge密码">[m
[32m+[m[32m              Vjudge密码&nbsp;[m
[32m+[m[32m              <Tooltip title="请输入Vjudge密码">[m
                 <Icon type="question-circle-o" />[m
               </Tooltip>[m
             </span>[m
[36m@@ -202,6 +203,8 @@[m [mclass RegistrationForm extends React.Component {[m
   }[m
 }[m
 [m
[32m+[m
[32m+[m
 const WrappedRegistrationForm = Form.create({[m
   mapPropsToFields(props) {[m
     console.log(props);[m
[1mdiff --git a/src/pages/setting/profile/profile.js b/src/pages/setting/profile/profile.js[m
[1mindex d158024..db971cd 100644[m
[1m--- a/src/pages/setting/profile/profile.js[m
[1m+++ b/src/pages/setting/profile/profile.js[m
[36m@@ -7,17 +7,18 @@[m [mconst FormItem = Form.Item;[m
 const Option = Select.Option;[m
 const AutoCompleteOption = AutoComplete.Option;[m
 [m
[31m-[m
[32m+[m[32m//个人信息[m
[32m+[m[32m// 用户名 状态 姓名 班级[m
 class ConfirmInput extends React.Component {[m
[31m-  // static getDerivedStateFromProps(nextProps) {[m
[31m-  //   // Should be a controlled component.[m
[31m-  //   if ('value' in nextProps) {[m
[31m-  //     return {[m
[31m-  //       ...(nextProps.value || {}),[m
[31m-  //     };[m
[31m-  //   }[m
[31m-  //   return null;[m
[31m-  // }[m
[32m+[m[32m /*  static getDerivedStateFromProps(nextProps) {[m
[32m+[m[32m    // Should be a controlled component.[m
[32m+[m[32m    if ('value' in nextProps) {[m
[32m+[m[32m      return {[m
[32m+[m[32m        ...(nextProps.value || {}),[m
[32m+[m[32m      };[m
[32m+[m[32m    }[m
[32m+[m[32m    return null;[m
[32m+[m[32m  } */[m
 [m
   constructor(props) {[m
     super(props);[m
[36m@@ -138,7 +139,14 @@[m [mclass RegistrationForm extends React.Component {[m
       <Form onSubmit={this.handleSubmit}>[m
         <FormItem[m
           {...formItemLayout}[m
[31m-          label="用户名"[m
[32m+[m[32m          label={([m
[32m+[m[32m            <span>[m
[32m+[m[32m              用户名&nbsp;[m
[32m+[m[32m              <Tooltip title="Your username.">[m
[32m+[m[32m                <Icon type="question-circle-o" />[m
[32m+[m[32m              </Tooltip>[m
[32m+[m[32m            </span>[m
[32m+[m[32m          )}[m
         >[m
           {getFieldDecorator('username', {[m
             rules: [ {[m
[36m@@ -153,7 +161,7 @@[m [mclass RegistrationForm extends React.Component {[m
           label={([m
             <span>[m
               状态&nbsp;[m
[31m-              <Tooltip title="What do you want others to call you?">[m
[32m+[m[32m              <Tooltip title="Your status.">[m
                 <Icon type="question-circle-o" />[m
               </Tooltip>[m
             </span>[m
[36m@@ -170,7 +178,7 @@[m [mclass RegistrationForm extends React.Component {[m
           label={([m
             <span>[m
               姓名&nbsp;[m
[31m-              <Tooltip title="What do you want others to call you?">[m
[32m+[m[32m              <Tooltip title="Your real name.">[m
                 <Icon type="question-circle-o" />[m
               </Tooltip>[m
             </span>[m
[36m@@ -187,7 +195,7 @@[m [mclass RegistrationForm extends React.Component {[m
           label={([m
             <span>[m
               班级&nbsp;[m
[31m-              <Tooltip title="What do you want others to call you?">[m
[32m+[m[32m              <Tooltip title="Your Professional Class.">[m
                 <Icon type="question-circle-o" />[m
               </Tooltip>[m
             </span>[m
[1mdiff --git a/src/pages/setting/repassword/repassword.jsx b/src/pages/setting/repassword/repassword.jsx[m
[1mindex c17822e..b85053f 100644[m
[1m--- a/src/pages/setting/repassword/repassword.jsx[m
[1m+++ b/src/pages/setting/repassword/repassword.jsx[m
[36m@@ -8,7 +8,7 @@[m [mconst Option = Select.Option;[m
 const AutoCompleteOption = AutoComplete.Option;[m
 [m
 [m
[31m-[m
[32m+[m[32m//reset your password 密码修改[m
 class RepasswordForm extends React.Component {[m
   state = {[m
     confirmDirty: false,[m
[36m@@ -67,6 +67,7 @@[m [mclass RepasswordForm extends React.Component {[m
         md: { span: 8 },[m
       },[m
     };[m
[32m+[m
     const tailFormItemLayout = {[m
       wrapperCol: {[m
         xs: {[m
[36m@@ -95,14 +96,7 @@[m [mclass RepasswordForm extends React.Component {[m
         </FormItem>[m
         <FormItem[m
           {...formItemLayout}[m
[31m-          label={([m
[31m-            <span>[m
[31m-              新密码[m
[31m-              <Tooltip title="What do you want others to call you?">[m
[31m-                <Icon type="question-circle-o" />[m
[31m-              </Tooltip>[m
[31m-            </span>[m
[31m-          )}[m
[32m+[m[32m          label="新密码"[m
         >[m
           {getFieldDecorator('new_password', {[m
             rules: [{[m
[36m@@ -116,14 +110,7 @@[m [mclass RepasswordForm extends React.Component {[m
         </FormItem>[m
         <FormItem[m
           {...formItemLayout}[m
[31m-          label={([m
[31m-            <span>[m
[31m-              确认密码[m
[31m-              <Tooltip title="What do you want others to call you?">[m
[31m-                <Icon type="question-circle-o" />[m
[31m-              </Tooltip>[m
[31m-            </span>[m
[31m-          )}[m
[32m+[m[32m          label="确认密码"[m
         >[m
           {getFieldDecorator('new_password1', {[m
             rules: [{[m
[1mdiff --git a/src/pages/statistic/$username$/components/ProblemDetail.jsx b/src/pages/statistic/$username$/components/ProblemDetail.jsx[m
[1mindex 96cc4b6..c33926b 100644[m
[1m--- a/src/pages/statistic/$username$/components/ProblemDetail.jsx[m
[1m+++ b/src/pages/statistic/$username$/components/ProblemDetail.jsx[m
[36m@@ -47,6 +47,7 @@[m [mclass ProblemDetail extends React.Component {[m
         }[m
       }][m
 [m
[32m+[m[32m      //colmuns[0] colmuns[1]  colmuns[2][m
     render() {[m
         return ([m
              <Card>[m
