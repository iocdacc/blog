## 方法一（暂时生效）

直接运行命令export PATH=$PATH:/usr/local/MATLAB/R2013a/bin ，使用这种方法，只会对当前会话生效。

## 方法二（只对当前登陆用户生效，永久生效）

执行 vim ~/.bash_profile 修改文件中 PATH 一行，PATH=$PATH:$HOME/bin之后添加 （注意以冒号分隔），保存文件并退出，执行 source ~/.bash_profile 使其生效，这种方法只对当前登陆用户生效。

## 方法三（对所有系统用户生效，永久生效）

修改 /etc/profile 文件，在文件末尾加上如下两行代码 
PATH=$PATH:/usr/local/MATLAB/R2013a/bin 
export PATH

## 最后执行命令 source /etc/profile 或执行点命令 ./profile 使其修改生效。

补充：/etc/profile和/etc/profile.d 的区别
1. 两个都是设置环境变量的
2. /etc/profile.d/比/etc/profile好维护，不想要什么变量直接删除/etc/profile.d/下对应的shell脚本即可，不用像/etc/profile需要改动此文件

### 下面以jdk的安装为例
```shell
vi /etc/profile.d/java.sh在新的java.sh中输入以下内容：

#set java environment
 
JAVA_HOME=/var/mysoft/jdk1.7.0_80
PATH=$JAVA_HOME/bin:$PATH
export JAVA_HOME PATH
```
保存退出，然后给java.sh分配权限：chmod 755 /etc/profile.d/java.sh
```shell
echo $JAVA_HOME
```