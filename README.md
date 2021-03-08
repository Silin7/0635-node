# 0635聊吧 node后端
## Version 1.0
## Author silin.wang
### CreatTime 2020-11-20

* * *

> classification_module（类别模块）
* * *
+ 新闻类型列表
+ 类型: GET
+ 接口: /classification/classification_news
+ 参数: 无
* * *
+ 县市类型列表
+ 类型: GET
+ 接口: /classification/classification_city
+ 参数: 无

* * *

> marry_module（相亲模块）
* * *
+ 相亲列表
+ 类型: GET
+ 接口: /marry/marry_list
+ 参数: page, limit, gender, marry, friends, is_top
* * *
+ 相亲详情
+ 类型: GET
+ 接口: /marry/marry_details
+ 参数: user_id
* * *
+ 是否报名参加相亲
+ 类型: GET
+ 接口: /marry/marry_issign
+ 参数: register_id, followers_id
* * *
+ 报名参加相亲
+ 类型: GET
+ 接口: /marry/marry_sign
+ 参数: register_id, followers_id


* * *

> login_module（登录模块）
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

> mine_module（个人中心模块）
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
+ 我关注的人数量
+ 类型: GET
+ 接口: /mine/concerns_count
+ 参数: followers_id
* * *
+ 我关注的人列表
+ 类型: GET
+ 接口: /mine/concerns_list
+ 参数: followers_id
* * *
+ 关注此用户
+ 类型: POST
+ 接口: /mine/follow_users
+ 参数: followers_id, watched_id, nick_name, photo, introduce
+ 返回值：关注成功返回：0，已关注返回：1
* * *
+ 取消关注此用户
+ 类型: GET
+ 接口: /mine/cancel_users
+ 参数: followers_id, watched_id
* * *
+ 我的收藏数量
+ 类型: GET
+ 接口: /mine/collection_count
+ 参数: followers_id
* * *
+ 我的收藏列表
+ 类型: GET
+ 接口: /mine/collection_list
+ 参数: followers_id
* * *
+ 收藏本菜谱
+ 类型: POST
+ 接口: /mine/follow_collection
+ 参数: followers_id, menu_id, menu_name, menu_info, menu_image
+ 返回值：收藏成功返回：0，已收藏返回：1
* * *
+ 取消收藏菜谱
+ 类型: GET
+ 接口: /mine/cancel_collection
+ 参数: followers_id, menu_id

* * *

> journalism_module（新闻模块）
* * *
+ 新闻列表
+ 类型: GET
+ 接口: /journalism/journalism_list
+ 参数: page, limit, type, area, class
* * *
+ 新闻详情
+ 类型: GET
+ 接口: /journalism/journalism_details
+ 参数: id

* * *

> record_module（记录模块）
* * *
+ 日记列表
+ 类型: GET
+ 接口: /record/record_diary
+ 参数: user_id
* * *
+ 日记详情
+ 类型: GET
+ 接口: /record/diary_details
+ 参数: id
* * *
+ 写日记
+ 类型: POST
+ 接口: /record/keep_diary
+ 参数: diary_date, diary_weather, diary_content
* * *
+ 删除日记
+ 类型: GET
+ 接口: /record/delete_diary
+ 参数: id

* * *

> specialtyModule（特产模块）
* * *
+ 特产列表
+ 类型: GET
+ 接口: /specialty/specialty_list
+ 参数: 无
+ * * *
+ 特产详情
+ 类型: GET
+ 接口: /specialty/specialty_details
+ 参数: id

* * *

> scenicspotModule（景点模块）
* * *
+ 景点列表
+ 类型: GET
+ 接口: /scenicspot/scenicspot_list
+ 参数: page, limit, scenicspot_name, scenicspot_place
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
+ 参数: followers_id, scenicspot_id
* * *
+ 关注此景点
+ 类型: POST
+ 接口: /scenicspot/follow_scenicspot
+ 参数: followers_id, scenicspot_id, scenicspot_name, scenicspot_img
* * *
+ 取消关注此景点
+ 类型: POST
+ 接口: /scenicspot/cancel_scenicspot
+ 参数: followers_id, scenicspot_id

* * *

> scenicspotModule（历史模块）
* * *
+ 县市历史详情
+ 类型: GET
+ 接口: /history/local_historical
+ 参数: city_id

* * *

> recipe_module（菜单模块）
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
* + 发送私信消息
+ 类型: POST
+ 接口: /message/permessage_send
+ 参数: receiver_id, sender_id, sender_name, sender_img, message_title, message_content, message_type
* * *
* + 发送活动私信消息
+ 类型: POST
+ 接口: /message/permessage_active
+ 参数: receiver_id, sender_id, sender_name, sender_img, message_title, message_content, message_type
* * *
+ 删除私信消息
+ 类型: GET
+ 接口: /message/permessage_delete
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
+ 参数: page, limit, is_pass
* * *
+ 动态详情
+ 类型: GET
+ 接口: /dynamic/dynamic_details
+ 参数: id

* * *

> other_modules（其他模块）
* * *
+ app_id: rtqbawfrwfapaxrq
+ app_secret: R1JRaDBFYnZHR3Q5TmhidTV5OTlsZz09
* * *
+ 历史上的今天
+ 类型: GET
+ 接口: /other/history_today
+ 参数: type (0: 简 / 1: 详)
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
+ 随机获取笑话段子列表
+ 类型: GET
+ 接口: /other/jokes_random
+ 参数: 无
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
+ 随机获取美女福利图片
+ 类型: GET
+ 接口: /other/girl_random
+ 参数: 无
* * *
+ 文本多语种翻译
+ 类型: GET
+ 接口: /other/translate
+ 参数: content, from, to
* * *
+ 垃圾分类查询
+ 类型: GET
+ 接口: /other/rubbish
+ 参数: name

* * *

> pictureModule（图片模块）

* * *
+ 头像系列
+ 类型: GET
+ 接口: /picture/wallportrait_series
+ 参数: type_id, page, limit
* * *
+ 头像列表
+ 类型: GET
+ 接口: /picture/wallportrait_list
+ 参数: series_id, page, limit
* * *
+ 壁纸系列
+ 类型: GET
+ 接口: /picture/wallpaper_series
+ 参数: type_id, page, limit
* * *
+ 壁纸列表
+ 类型: GET
+ 接口: /picture/wallpaper_list
+ 参数: series_id, page, limit
* * *
+ 文案系列
+ 类型: GET
+ 接口: /picture/wallwriting_series
+ 参数: type_id, page, limit
* * *
+ 文案列表
+ 类型: GET
+ 接口: /picture/wallwriting_list
+ 参数: series_id, page, limit

* * *

> happyModule（拯救不开心模块）
* * *
+ 头像系列
+ 类型: GET
+ 接口: /happy/story_list
+ 参数: type_id

* * *

> appointmentModule（线下活动模块）
* * *
+ 线下活动列表
+ 类型: GET
+ 接口: /appointment/appointment_list
+ 参数: page, limit, sponsor_gender, appointment_type, area_type
* * *
+ 线下活动详情
+ 类型: GET
+ 接口: /appointment/appointment_details
+ 参数: id
* * *
+ 是否报名参加活动
+ 类型: GET
+ 接口: /appointment/appointment_issign
+ 参数: active_id, followers_id
* * *
+ 报名参加活动
+ 类型: GET
+ 接口: /appointment/appointment_sign
+ 参数: active_id, followers_id
