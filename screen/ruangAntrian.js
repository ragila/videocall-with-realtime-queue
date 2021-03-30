import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import {useSocket} from '../SocketProvider';

const RuangAntrian = (props) => {
    const {navigation, route} = props;
    // console.log(route.params.role, 'inittttitititiititti')
    // console.log(route.params.user_id)
    const socket = useSocket();
    const [dataUser, setDataUser] = useState({}) 
    const [queue, setQueue] = useState()
    const [x, setX] = useState(0)
    // console.log(route.user_id, 'routeeeeee')
    useEffect(() => {
        socket.on('res-join-loby', (res) => {
            console.log(res , 'resjoin lobii')
            const data = res.filter((item) => route.params.user_id === item.user_id)
            setDataUser(data[0])
        })
        // socket.emit('interviewer-join', {room: '01'})
        socket.on('res-interviewer-join', (res) => {
            console.log(res, 'res-interveiwe-join')
        })
        if (dataUser && dataUser.queue === 1){
            // console.log('bisaaaaaa jingggggg')
            // navigation.navigate('Interview')
            getMoviesFromApi()
        } else {
            socket.on('res-leave-loby', (res) => {
                console.log(res)
                const data = res.filter((item) => route.params.user_id === item.user_id)
                console.log(data)
                setDataUser(data[0])
            })
        }
        return() => {
            // socket.off('res-join-loby')
            // socket.off('res-interviewer-join')
            // socket.on('res-leave-loby', (res) => {
            //     console.log(res)
            //     const data = res.filter((item) => route.params.user_id === item.user_id)
            //     console.log(data)
            //     setDataUser(data[0])
            // })
        }
    }, [dataUser])

    const getMoviesFromApi = () => {
        return fetch(`http://147.139.181.217:1996/api/v1/AccessToken/${route.params.room}`, {
            headers: {
                Authorization: route.params.token
              },
        })
          .then((response) => response.json())
          .then((json) => {
            if(json.status === 200){
                navigation.navigate('Interview', {
                    token: json.token, 
                    role: route.params.role, 
                    interview_id: dataUser.interview_id,
                    user_id: dataUser.user_id,
                    room: route.params.room
                })
                // console.log(json.token)
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };

    const leave = async () => {
        socket.emit('leave-loby', {user_id: dataUser.user_id, interview_id: dataUser.interview_id, room: route.params.room})
        navigation.pop()
    }
    // console.log(dataUser, 'clggggggg')
    return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text>Antrian Kamu : {dataUser && dataUser.queue}</Text>
            
            <Button title="Leave" 
            onPress={() => {leave()}}
            />
        </View>
    )
}

export default RuangAntrian

const styles = StyleSheet.create({})
