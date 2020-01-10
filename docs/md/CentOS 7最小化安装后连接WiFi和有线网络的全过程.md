> CentOS 7 最小安装到老笔记本上，结果并不会自动联网，虽然安装的时候连了wifi。

查看系统相关配置和状态
```
ifconfig   # 没用了
netstat    # 没用了
```
这两个命令此时无效。

## 查看所有网卡信息
```
ip a
``` 	
## 网上说能看到是否装了驱动，结果啥都看不到，Firmware 倒是能看到一点BIOS警告		
```									
dmesg|grep firmware  
``` 			
## 激活无线网卡，但是不知道咋看当前的激活状态啊，wlp9s0是无线网卡名		
``` 
ip link set wlp9s0 up
``` 				
## 扫描附近的wifi，注意大小写。但是没用，显示找不到iw命令	
``` 		
iw wlp2s0 scan | grep SSID    			
# 因为是自家wifi,所以放弃扫描了，尝试直接连wifi。
```

## 连接wifi(密码含有空格就加引号) router是wifi名称。结果显示 No Wi-Fi device found
```	
nmcli dev wifi connect router password 12345678    
# 查看网卡状态，显示wlp9s0的状态是 unmanaged
nmcli dev status  									
# unmanaged 状态是连不上wifi的原因，解决方法需要联网，所以要先有线方式联网了。
```	

## 有线方式联网配置
```
#这个目录下边都是网络配置文件
cd /etc/sysconfig/network-scripts

#添加IP、掩码、网关等,文件名后缀是你的有线网卡名
vi ifcfg-enp8s0

# IPADDR=192.168.*.*		# ip地址
# NETMASK=255.255.255.0		# 子网掩码
# GATEWAY=192.168.*.*		# 网关
# BOOTPROTO=static          # 设为dhcp则为动态获取ip
# ONBOOT=yes                # 开机启用

# 添加DNS服务器
vi /etc/resolv.conf

# nameserver 114.114.114.114
# 这两个文件我都没改，用的默认配置。
```
## 启动/停止/重启网络服务，两种方法等同，我选择了第一种重启
```
/etc/init.d/network stop/start/restart
service network stop/start/restart
```
## 然后就连上网了，接下来关键步骤
```
yum -y install NetworkManager-wifi
# 装完后reboot重启就能连上wifi了，再装两个常用工具
```

## 安装之后就有ifconfig 和 netstat 命令了
```
yum -y install net-tools 
```
## 抓包工具
```
yum -y install tcpdump
```