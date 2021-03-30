import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import {useSocket} from '../SocketProvider';

const dataUser = [
    {
        userId: 'e45fbc91-0452-4eba-994c-a34b014c5255',
        nama: 'hendra ramadhan',
        role: 'majikan',
        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZkNjlhODVjLTQyZmItNDk2Zi04NzMyLWU5ODkyODQ0MGE1NiIsIm5hbWUiOiJoZW5kcmEgcmFtYWRoYW4iLCJlbWFpbCI6ImhlaGVAam9ic21haWQuY29tIiwicm9sZSI6ImVtcGxveWVyIiwiaXNQaW4iOmZhbHNlLCJpYXQiOjE2MTY3NzU4NTAsImV4cCI6MjYxNjc3NTg0OX0.mZwGDtpXg9vu2fE6BbItufyzPMG325_GHMaC3vDJO0A'
    },
    {
        userId: 'de8b7f1e-c2e3-40c5-b66e-3cbe67815aa5',
        nama: 'fadli worker',
        role: 'pekerja',
        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNmNDJmYWFmLTk4OWMtNDkxYi04NjNiLTY5ZmQ0MTM1ZDM3OCIsIm5hbWUiOiJmYWRsaSB3b3JrZXIiLCJlbWFpbCI6ImZhZGxpd29ya2VyQGdtYWlsLmNvbSIsInJvbGUiOiJ3b3JrZXIiLCJpc1BpbiI6ZmFsc2UsImlhdCI6MTYxNjc3NjAxNiwiZXhwIjoyNjE2Nzc2MDE1fQ.hMwoOjhrUlEWjDy82g237l3-7LzqwZhKnjgz1v380KQ'
    },
    {
        userId: 'd6aa7888-d154-4b87-827f-aa97ae4b92bb',
        nama: 'mba aya kopo',
        role: 'pekerja',
        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZmNGMzZTY3LWQ1ZGItNDkwMy1iOTU3LThiZmU2OTdiZTk3MiIsIm5hbWUiOiJtYmEgYXlhIGtvcG8iLCJlbWFpbCI6ImF5YUBnbWFpbC5jb20iLCJyb2xlIjoid29ya2VyIiwiaXNQaW4iOmZhbHNlLCJpYXQiOjE2MTY3NzYxNjgsImV4cCI6MjYxNjc3NjE2N30.Ky_TZe_pRdhBrtjB8JKbb0ejXtccgPObhCNd2eO9L64'
    },
    {
        userId: '0cfaa688-5658-45fd-9a89-7123e850ec6e',
        nama: 'fadli worker2',
        role: 'pekerja',
        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJkNDk3YTg5LTJhMWEtNGQxMi04MmU4LTMyMzk5YTY4M2UyYSIsIm5hbWUiOiJmYWRsaSB3b3JrZXIyIiwiZW1haWwiOiJmYWRsaXdvcmtlcjJAZ21haWwuY29tIiwicm9sZSI6IndvcmtlciIsImlzUGluIjpmYWxzZSwiaWF0IjoxNjE2Nzc3MDY4LCJleHAiOjI2MTY3NzcwNjd9.UUI2ZhyLx3cDdd6dPQJT9myn0RxDq29vRoDNcVngUqo'
    },
]

const Loby = (props) => {
    const socket = useSocket();
    const [userId, setUserId] = useState()
    const [nama, setNama] = useState()
    const [role, setRole] = useState()
    const [token, setToken] = useState()
    useEffect(() => {
    }, [])
    const data = {
        room: "22",
        user_id: userId,
        nama: nama,
        role: role,
        interview_id: "e93906ae-61f8-4fe7-90ec-2a81ec6c67ca",
    }

    const Join =() => {
        if(role === 'majikan'){
            getMoviesFromApi(data.room)
        } else {
            socket.emit(
                'join', {room : data.room}
              );
            socket.emit('join-loby', data)
            
            props.navigation.navigate('Ruang Antrian', {
                user_id: userId, 
                token: token, 
                room : data.room,
                role: data.role,
                interview_id: data.interview_id
            })
        }
        
    }
    // console.log(`http://147.139.181.217:1996/api/v1/AccessToken/${data.room}`)
    const getMoviesFromApi = (room) => {
        return fetch(`http://147.139.181.217:1996/api/v1/AccessToken/${room}`, {
            headers: {
                Authorization: token
              },
        })
          .then((response) => response.json())
          .then((json) => {
            if(json.status === 200){
                props.navigation.navigate('Interview', {
                    token: json.token, 
                    role: data.role, 
                    room: data.room, 
                    interview_id: data.interview_id})
                // console.log(json.token)
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };

    const generateUserDummy = (index) => {
        setUserId(dataUser[index].userId)
        setNama(dataUser[index].nama)
        setRole(dataUser[index].role)
        setToken(dataUser[index].token)
    }
    return (
        <View style={{ justifyContent: 'center'}}>
            <View style={{alignSelf: 'center'}}>
                <Text>User id</Text>
                <TextInput onChangeText={setUserId} value={userId} style={{width: 200, height: 40, borderWidth: 1,  paddingHorizontal: 15}} placeholder={'User Id'}/>
                <Text>Nama</Text>
                <TextInput onChangeText={setNama} value={nama} style={{width: 200, height: 40, borderWidth: 1, paddingHorizontal: 15}} placeholder={'Nama'}/>
                <Text>Role isi: (majikan/pekerja)</Text>
                <TextInput onChangeText={setRole} value={role} style={{width: 200, height: 40, borderWidth: 1, paddingHorizontal: 15}} placeholder={'Role'}/>
                <Text>Bearer token login</Text>
                <TextInput onChangeText={setToken} value={token} style={{width: 200, height: 40, borderWidth: 1, paddingHorizontal: 15}} placeholder={'Token jwt login'}/>
                <Button title="Join" onPress={() => Join()}/>
            </View>
            <View style={{marginTop: 50}}>
                <Button title="Data Majikan 1" onPress={() => generateUserDummy(0)} />
                <Button title="Data User 2" onPress={() => generateUserDummy(1)} />
                <Button title="Data User 3" onPress={() => generateUserDummy(2)}/>
                <Button title="Data User 4" onPress={() => generateUserDummy(3)}/>
            </View>
        </View>
    )
}

export default Loby

const styles = StyleSheet.create({})
