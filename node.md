# 0635聊吧 node后端
## Version 1.0
## Author silin.wang

* * *

> login_moudle（登录模块）
* * *
+ 判断账号是否存在
+ 类型: GET
+ 接口: /login/is_register
+ 参数: userName, state
* * *
+ 将注册信息写入数据库
+ 类型: POST
+ 接口: /login/register_inster
+ 参数: userName, password, nickName, avatarUrl, gender
* * *
+ 修改密码
+ 类型: POST
+ 接口: /login/change_password
+ 参数: newPassword, id
* * *
+ 判断账号密码是否正确
+ 类型: POST
+ 接口: /login/sign_in
+ 参数: userName, password

* * *

> mine_moudle（个人中心模块）
* * *
+ 获取个人信息
+ 类型: GET
+ 接口: /mine/mine_info
+ 参数: id
* * *
+ 修改保存个人信息
+ 类型: POST
+ 接口: /mine/update_mineInfo
+ 参数: userPhone, age, birthday, constellation, address, personalSignature
* * *
+ 我关注的人列表
+ 类型: GET
+ 接口: /mine/concerns_list
+ 参数: followers_id
* * *
+ 关注此用户
+ 类型: POST
+ 接口: /mine/follow_users
+ 参数: followers_id, watched_id, watched_nickName, watched_avatarUrl, watched_signature
* * *
+ 取消关注此用户
+ 类型: POST
+ 接口: /mine/cancel_users
+ 参数: followers_id, watched_id

* * *

> conversation_moudle（话题模块）
* * *
+ 话题列表
+ 类型: GET
+ 接口: /conversation/conversation_list
+ 参数: conversation_type, conversation_date, conversation_title
* * *
+ 话题详情
+ 类型: GET
+ 接口: /conversation/conversation_info
+ 参数: id
* * *
+ 我关注的话题列表
+ 类型: GET
+ 接口: /conversation/mine_conversation_list
+ 参数: followers_id
* * *
+ 关注此话题
+ 类型: POST
+ 接口: /conversation/follow_conversation
+ 参数: followers_id, conversation_id, conversation_type, conversation_title, conversation_avatarUrl, conversation_date
* * *
+ 取消关注此话题
+ 类型: POST
+ 接口: /conversation/cancel_conversation
+ 参数: followers_id, conversation_id
* * *