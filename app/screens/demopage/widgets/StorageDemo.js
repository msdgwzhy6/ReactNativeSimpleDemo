/**
 * Description:测试Storage
 *
 * 涉及知识点：
 *
 * AsyncStorage
 * 根据文档：推荐使用react-native-storage，它在AsyncStorage基础上做了进一步封装
 * 增删改查
 *
 * Author: zoe
 * Time: 2018/3/15 0015
 */
import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Platform,
    TouchableOpacity,
    Text,
    View,
    TextInput,
    Dimensions
} from 'react-native'

import '../../../utils/StorageUtil'

export default class StorageDemo extends PureComponent {

    static navigationOptions = ({navigation}) => ({
        headerTitle: "StorageDemo",
        headerStyle: {backgroundColor: '#fff', height: Platform.OS == "ios" ? 64 : 48},
    });

    _add(){
        storage.save({
            key: 'loginState',
            data: {
                userid: '111 userid',
            },
            //expires为有效时间
            expires: 1000 * 3600
        })
    }

    _get(){
        // 读取
        storage.load({
            key: 'loginState',

            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,

            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true,

            // 你还可以给sync方法传递额外的参数
            syncParams: {
                extraFetchOptions: {
                    // 各种参数
                },
                someFlag: true,
            },
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
            // 你只能在then这个方法内继续处理ret数据
            // 而不能在then以外处理
            // 也没有办法“变成”同步返回
            // 你也可以使用“看似”同步的async/await语法

            // console.log(ret.userid);
            alert(ret.userid)
            this.setState({ user: ret });
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            alert(err.message)
            // console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    break;
                case 'ExpiredError':
                    break;
            }
        })
    }

    _del(){

    }

    _change(){

    }

    _search(){

    }

    render() {
        return (
           <View style={styles.container}>
                <Text onPress={()=>this._add()}>
                    存
                </Text>

               <Text onPress={()=>this._get()}>
                   取
               </Text>
           </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white'
    }
});