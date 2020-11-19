# 0635聊吧 node后端
## Version 1.0
## Author silin.wang


> login_moudle
+ 判断账号是否存在（参数：userName，state）
+ SELECT * FROM `login_information` WHERE userName = 'userName';

+ 将注册信息写入数据库（参数：userName，password，nickName，avatarUrl，gender）
+ INSERT INTO `login_information` (`id`, `userName`, `password`, `nickName`, `avatarUrl`, `gender`) VALUES (NULL, ?, ?, ?, ?, ?)';

+ 修改密码（参数：newPassword，id）
+ UPDATE `login_information` SET `password` = 'newPassword' WHERE `login_information`.`id` = id;

+ 判断账号密码是否正确（参数：userName，password）
+ SELECT * FROM `login_information` WHERE `userName` = 'userName';

> mine_moudle
+ 获取个人信息（参数：id）
+ SELECT * FROM `login_information` WHERE `id` = id;

+ 修改保存个人信息（参数：userPhone，age，birthday，gender，constellation，address，personalSignature）
+ UPDATE `login_information` SET `userPhone` = 'userPhone', `age` = 'age', `birthday` = 'birthday', `gender` = 'gender', `constellation` = 'constellation', `address` = 'address', `personalSignature` = 'personalSignature' WHERE `login_information`.`id` = id;



> SQL
SELECT * FROM `login_information` WHERE `id` IN (100001, 100061)