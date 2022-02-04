import React, { useContext } from "react";
import { View, FlatList, Alert } from 'react-native'
import { ListItem, Avatar, Button, Icon } from "react-native-elements";
import UsersContext from "../context/UsersContext";

export default props => {

    const { state, dispatch } = useContext(UsersContext)

    const confirmUserDeletion = (user) => {
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?',
            [
                {text: 'Sim',
                onPress(){
                    dispatch({
                      type: 'deleteUser',
                      payload: user,
                    })
                }},
                {text: 'Não'}
            ]
        )
    }

    const getUserItem = ({item: user}) => {
        return (
          <ListItem
            bottomDivider
            onPress={() => props.navigation.navigate('UserForm', user)}>
            <Avatar rounded source={{uri: user.avatarUrl}} />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
            </ListItem.Content>
            <Button
              onPress={() => {
                props.navigation.navigate('UserForm', user);
              }}
              type="clear"
              icon={<Icon name="edit" size={25} color="orange" />}
            />
            <Button
              onPress={() => {
                confirmUserDeletion(user);
              }}
              type="clear"
              icon={<Icon name="delete" size={25} color="red" />}
            />
          </ListItem>
        );

    }

    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}


    // function getUserItem({item: user}) {
    //   return (
    //     <ListItem.Swipeable
    //       key={user.id}
    //       bottomDivider
    //       rightContent={getActions(user)}
    //       rightStyle={style.buttonContainer}
    //       onPress={() => props.navigation.navigate('UserForm', user)}>
    //       <Avatar rounded source={{uri: user.avatarUrl}} />
    //       <ListItem.Content>
    //         <ListItem.Title>{user.name}</ListItem.Title>
    //         <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
    //       </ListItem.Content>
    //     </ListItem.Swipeable>
    //   );
    // }

    //    function getActions(user) {
    //      return (
    //        <>
    //          <Button
    //            onPress={() => props.navigation.navigate('UserForm', user)}
    //            icon={<Icon name="edit" size={25} color="orange" />}
    //            buttonStyle={{
    //              minHeight: '100%',
    //              minWidth: '50%',
    //              backgroundColor: 'light-gray',
    //            }}
    //          />
    //          <Button
    //            onPress={() => confirmUserDeletion(user)}
    //            icon={<Icon name="delete" size={25} color="red" />}
    //            buttonStyle={{
    //              minHeight: '100%',
    //              minWidth: '50%',
    //              backgroundColor: 'gray',
    //            }}
    //          />
    //        </>
    //      );
    //    }