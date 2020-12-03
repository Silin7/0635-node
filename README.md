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
+ 是否关注此用户
+ 类型: POST
+ 接口: /mine/is_follow_users
+ 参数: followers_id, watched_id
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
+ 是否关注此话题
+ 类型: POST
+ 接口: /conversation/is_follow_conversation
+ 参数: followers_id, conversation_id
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

> scenicspotMoudle（景点模块）
* * *
+ 景点列表
+ 类型: GET
+ 接口: /scenicspot/scenicspot_list
+ 参数: scenicSpot_name, scenicSpot_place
* * *
+ 景点详情
+ 类型: GET
+ 接口: /scenicspot/scenicspot_info
+ 参数: id
* * *
+ 我关注的景点列表
+ 类型: GET
+ 接口: /scenicspot/mine_scenicspot_list
+ 参数: followers_id
* * *
+ 是否关注此景点
+ 类型: POST
+ 接口: /scenicspot/is_follow_scenicspot
+ 参数: followers_id, scenicSpot_id
* * *
+ 关注此景点
+ 类型: POST
+ 接口: /scenicspot/follow_scenicspot
+ 参数: followers_id, scenicSpot_id, scenicSpot_name, scenicSpot_img
* * *
+ 取消关注此景点
+ 类型: POST
+ 接口: /scenicspot/cancel_scenicspot
+ 参数: followers_id, scenicSpot_id

* * *

> recipe_moudle（菜单模块）
* * *
+ 菜肴分类
+ 类型: GET
+ 接口: /recipe/recipe_catalogs
+ 参数: 无
* * *
+ 菜肴列表
+ 类型: GET
+ 接口: /recipe/recipe_list
+ 参数: keyword
* * *
+ 菜肴详情
+ 类型: GET
+ 接口: /recipe/recipe_detail
+ 参数: id

* * *

> messageModules（消息模块）
* * *
+ 私信消息列表
+ 类型: GET
+ 接口: /message/permessage_list
+ 参数: receiver_id
* * *
+ 私信消息详情
+ 类型: GET
+ 接口: /message/permessage_details
+ 参数: id
* * *
+ 系统消息列表
+ 类型: GET
+ 接口: /message/sysmessage_list
+ 参数: receiver_id
* * *
+ 系统消息详情
+ 类型: GET
+ 接口: /message/sysmessage_details
+ 参数: id

* * *

> dynamicModules（动态模块）
* * *
+ 动态列表
+ 类型: GET
+ 接口: /dynamic/dynamic_list
+ 参数: 无
* * *
+ 动态详情
+ 类型: GET
+ 接口: /dynamic/dynamic_details
+ 参数: id

* * *

> other_modules（其他模块）
* * *
+ 历史上的今天
+ 类型: GET
+ 接口: /other/history_today
+ 参数: type
* * *
+ 获取特定城市今日天气信息
+ 类型: GET
+ 接口: /other/weather_current
+ 参数: position
* * *
+ 获取特定城市今天及未来天气信息
+ 类型: GET
+ 接口: /other/weather_forecast
+ 参数: position
* * *
+ 获取所有新闻类型列表
+ 类型: GET
+ 接口: /other/news_types
+ 参数: 无
* * *
+ 根据新闻类型获取新闻列表
+ 类型: GET
+ 接口: /other/news_list
+ 参数: typeId, page
* * *
+ 根据新闻id获取新闻详情
+ 类型: GET
+ 接口: /other/news_details
+ 参数: newsId
* * *
+ 文本多语种翻译
+ 类型: GET
+ 接口: /other/translate
+ 参数: content, from, to
