# <ros_web_teleop>基于Web的键盘遥控
A ROS Web  Keyboard control. Based with robotwebtools.As ROSWeb is a tool for ROS, it depends on a machine running the roscore process. It is a web application and it depends on websockets provided by rosbridge server. Until now, it is being developed and tested using Google Chrome browser.

### Install RosbridgeSuite package and WebVideoServer

```
$ sudo apt-get update
$ sudo apt-get install ros-kinetic-rosbridge-suite
$ sudo apt-get install ros-kinetic-web-video-server
```

### Install dependencies

```
$ rosdep update
# Do NOT run rosdep update with sudo. It is not required and will result in permission errors later on. 
$ rosdep install rosbridge_server
$ rosdep install web_video_server
or $ rosdep install --from-paths src --ignore-src -r -y
# installs all the packages that the packages in your catkin workspace depend upon
```

### Install latest development version of rosbrige_server 

```
$ cd catkin_ws/src/
$ git clone -b develop https://github.com/RobotWebTools/rosbridge_suite.git
$ git clone https://github.com/sun-coke/ros_web_teleop.git
$ cd.. && catkin_make
```

### Run

```
$ roslaunch turtlebot3_gazebo turtlebot3_empty_world.launch 
$ roslaunch rosbridge_server rosbridge_websocket.launch
$ rosrun web_video_server web_video_server
$ cd catkin_ws/src/ros_web_teleop 
# open the keyboardteleop.html using Google Chrome browser.and using W、A、S、D to control the robot.
```


# <ros_web_view>基于Web的视频监控
![image](https://github.com/sun-coke/web_video/blob/master/Scr.png)

### A、安装

#### 1. 安装rosbridge-suite，web_video_server

```
$ sudo apt-get install ros-kinetic-rosbridge-suite
$ sudo apt-get install ros-kinetic-web-video-server
```

### B、配置

#### 1. 因为IP的地址要配置很多个地方，所以，写到/etc/hosts里面

```shell
# 查看ip地址和用户名
$ ifconfig #得到IP地址
$ hostname # 得到主机名
$ vim /etc/hosts # 在里面添加 IP[tab]Hostname
```
### C、运行

#### 1.由于视频传输地址默认端口号为8080，这里监控原始图像信息/camera/rgb/image_raw
```
$ roslaunch turtlebot3_gazebo turtlebot3_world.launch 
$ roslaunch rosbridge_server rosbridge_websocket.launch
$ rosrun web_video_server web_video_server
```
#### 2.网页端输入如下网址：
http://localhost:8080/stream?topic=/camera/rgb/image_raw



